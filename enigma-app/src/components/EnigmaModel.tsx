'use client'

import React, {MutableRefObject, useEffect, useRef, useState, useCallback} from "react";
import * as THREE from 'three';
import {Mesh, Object3D, Object3DEventMap} from 'three';

// @ts-expect-error - no types for this package
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// @ts-expect-error - no types for this package
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {EnigmaMachine} from "../../src/components/engima-parts/EnigmaMachine";
import {Rotor} from "../../src/components/engima-parts/Rotors";
import {ALPHABET, PLUGBOARD_SETTINGS} from "../../src/components/engima-parts/Variables";
import {Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

import EnigmaOutputs from "../../src/components/EnigmaOutputs";
import EnigmaSettings from "../../src/components/EnigmaSettings";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {Plugboard} from "../../src/components/engima-parts/Plugboard";


export default function EnigmaModel({camera, controls, renderer}: {camera: THREE.PerspectiveCamera, controls: OrbitControls, renderer: THREE.WebGLRenderer}) {
    const [loadingProgress, setLoadingProgress] = useState(true);
    const [arrows, setArrows] = useState();
    const [rotorPlanes, setRotorPlanes] = useState();
    const [rotorValues, setRotorValues] = useState([1,1,1]);
    const enigmaMachineRef: MutableRefObject<EnigmaMachine|null>  = useRef<EnigmaMachine | null>(null);
    const message = useRef("");

    let lamps: { [s: string]: Mesh; };
    let rotors: { [s: string]: Mesh; };
    const plugsRef = useRef<THREE.Mesh | null>(null);
    const plugWiresRef = useRef<THREE.Mesh | null>(null);

    const lampsRef = useRef();
    const rotorPlanesRef = useRef();

    const ROTOR_HEIGHT = 0.003

    const background = 0xE5E1DA
    const whiteBackground = 0xFFFFFF

    const containerRef = useRef();


    const [open, setOpen] = React.useState(false);
    const [openSettings, setOpenSettings] = React.useState(false);
    const [openNotes, setOpenNotes] = React.useState(false);
    const handleClickToOpen = () => {setOpen(true)};
    const handleToClose = () => {setOpen(false)};

    function createEnigmaModel(): EnigmaMachine {
        // on load rotors are set to 1, 1, 1 - this aligns with the rotors below
        const rotor1: Rotor = new Rotor("1", "A");
        const rotor2: Rotor = new Rotor("2", "A");
        const rotor3: Rotor = new Rotor("3", "A");
        const plugboard = new Plugboard(PLUGBOARD_SETTINGS);

        rotor1.setNextRotor(rotor2);
        rotor2.setNextRotor(rotor3);
        rotor2.setPreviousRotor(rotor1);
        rotor3.setPreviousRotor(rotor2);

        return new EnigmaMachine([rotor1, rotor2, rotor3], plugboard);
    }

    function lightUpLamp(mesh:Mesh, color = 0xffff00, duration = 500) {
        if (!mesh) return;

        if (!(mesh.material as any).isCloned) {
            mesh.material = (mesh.material as any).clone();
            (mesh.material as any).isCloned = true;
        }

        (mesh.material as any).emissive.setHex(color);

        setTimeout(() => {
            (mesh.material as any).emissive.setHex(0x000000);
        }, duration);
    }

    function getLamps(gltf: any) {
        const lamps = {};
        const letters = "abcdefghijklmnopqrstuvwxyz".split("");

        letters.forEach(letter => {
            const lampName = `lamp_${letter}`;
            const lampObject: Mesh = gltf.scene.getObjectByName(lampName);
            if (lampObject) {
                lamps[letter.toUpperCase()] = lampObject;
            }
        });
        (lampsRef as any).current = lamps;
        return lamps;
    }

    function getRotors(gltf: any) {
        const rotors = {};
        const rotorNames = "1 2 3".split(" ");

        rotorNames.forEach(rotorName => {
            const rotorKey = `rotor${rotorName}`;
            const rotorObject = gltf.scene.getObjectByName(rotorKey);
            if (rotorObject) {
                rotors[rotorKey] = rotorObject;
                const rotorBox = new THREE.Box3().setFromObject(rotorObject);
                const size = new THREE.Vector3();
                rotorBox.getSize(size);
            }
        });

        return rotors;
    }

    function getPlugBoard(gltf: any) {
        const plugWires = gltf.scene.getObjectByName("plug_wires");
        const plugs = gltf.scene.getObjectByName("plugs");
        return [plugs, plugWires];
    }

    function animatePlugboard() {
        if (!plugsRef.current || !plugWiresRef.current) {
            console.log("HELLO")
            return
        };

        const plugsMesh = plugsRef.current;
        const plugWiresMesh = plugWiresRef.current;

        if (!(plugsMesh.material as any).isCloned) {
            plugsMesh.material = (plugsMesh.material as any).clone();
            (plugsMesh.material as any).isCloned = true;
        }

        if (!(plugWiresMesh.material as any).isCloned) {
            plugWiresMesh.material = (plugWiresMesh.material as any).clone();
            (plugWiresMesh.material as any).isCloned = true;
        }

        (plugWiresMesh.material as any).emissive.setHex(0xff1616);
        (plugsMesh.material as any).emissive.setHex(0xe1984f);

        setTimeout(() => {
            (plugsMesh.material as any).emissive.setHex(0x000000);
            (plugWiresMesh.material as any).emissive.setHex(0x000000);
        }, 2000);
    }

    function createTextPlane(textValue: number) {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = '#939393';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '300px sans-serif';
        ctx.fillText(String(textValue), size / 2, size / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
        });

        const planeGeo = new THREE.PlaneGeometry(0.015, 0.015);
        return new THREE.Mesh(planeGeo, material);
    }

    function createDefaultRotorValuePlanes() {
        let rotorPositionSpace = -0.029
        const newRotorPlanes = {}
        for (const [key, rotor] of Object.entries(rotors)) {
            const labelPlane = createTextPlane(1);
            if (!labelPlane) return;
            labelPlane.rotation.z = THREE.MathUtils.degToRad(-90);
            rotor.add(labelPlane);
            labelPlane.position.set(0, rotorPositionSpace, ROTOR_HEIGHT);

            newRotorPlanes[key] = labelPlane;
            rotorPositionSpace += 0.029;
        }
        setRotorValues([1,1,1])
        return newRotorPlanes
    }

    function updateTextOnPlane(plane: any, newRotorValue: number) {
        const material = plane.material;
        const texture = material.map;
        const canvas = texture.image;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '300px sans-serif';
        ctx.fillText(String(newRotorValue), canvas.width / 2, canvas.height / 2);

        texture.needsUpdate = true;
    }

    function addFourLightSources(scene: THREE.Scene) {
        const lightTop = new THREE.DirectionalLight(whiteBackground, 1);
        lightTop.position.set(-3, 2, 2);
        scene.add(lightTop);
        const lightBack = new THREE.DirectionalLight(whiteBackground, 1);
        lightBack.position.set(8, -6, 0);
        scene.add(lightBack);
        const lightLeft = new THREE.DirectionalLight(whiteBackground, 1);
        lightLeft.position.set(0, 0, 6);
        scene.add(lightLeft);
        const lightRight = new THREE.DirectionalLight(whiteBackground, 1);
        lightRight.position.set(0, 0, -6);
        scene.add(lightRight);
    }

    function createArrowMesh(color = 0xff2828, width = 0.2, height = 0.2, depth = 0.01) {
        const shape = new THREE.Shape();

        shape.moveTo(0, 0);

        shape.lineTo(0, height);

        shape.lineTo(-width, height / 2);

        shape.lineTo(0, 0);

        const extrudeSettings = {
            depth: depth,
            bevelEnabled: true,
            bevelThickness: 0.01,
            bevelSize: 0.01,
            bevelSegments: 2,
            steps: 1
        };

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geometry.computeBoundingBox();

        const material = new THREE.MeshStandardMaterial({ color });
        return new THREE.Mesh(geometry, material);
    }

    function addAllRotorArrows(scene: THREE.Scene) {
        const arrowDict = {};
        let zPostionDelimeter = -0.06;
        const arrowName = {0: "rotor1Down", 1: "rotor2Down", 2: "rotor3Down", 3: "rotor1Up", 4: "rotor2Up", 5: "rotor3Up"};
        for (let i = 0; i <= 5; i++) {
            let addArrow = createArrowMesh();
            addArrow.rotateX(THREE.MathUtils.degToRad(90));
            if (i < 3) {
                addArrow.position.set(1.18, 1.25, zPostionDelimeter);
            } else if (i == 3) {
                zPostionDelimeter = -0.06;
                addArrow = createArrowMesh(0x669547);
                addArrow.position.set(1.75, 1.25, zPostionDelimeter);
                addArrow.rotateX(THREE.MathUtils.degToRad(90));
                addArrow.rotateY(THREE.MathUtils.degToRad(180));
            }
            else {
                addArrow = createArrowMesh(0x669547);
                addArrow.position.set(1.75, 1.25, zPostionDelimeter);
                addArrow.rotateY(THREE.MathUtils.degToRad(180));
                addArrow.rotateX(THREE.MathUtils.degToRad(-90));
            }
            scene.add(addArrow);
            arrowDict[arrowName[i]] = addArrow;
            zPostionDelimeter += -0.5;
        }
        return arrowDict
    }

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(background);

        camera.position.set(-6, 6, 4);

        renderer.setSize(window.innerWidth, window.innerHeight);
        (containerRef as any).current.appendChild(renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;

        addFourLightSources(scene);

        const loader = new GLTFLoader();
        loader.load('lamp_changed/lamp_ammended.gltf',
            (gltf: any) => {
                scene.add(gltf.scene);
                gltf.scene.position.set(0,-1,0);
                gltf.scene.scale.set(0.3, 0.3, 0.3);

                lamps = getLamps(gltf);
                rotors = getRotors(gltf);
                [plugsRef.current, plugWiresRef.current] = getPlugBoard(gltf);

                if (rotors) {
                    const newRotorPlanes: any = createDefaultRotorValuePlanes();
                    setRotorPlanes(newRotorPlanes);
                }

                if (plugsRef && plugWiresRef) {
                    animatePlugboard();
                }
                const arrowDict: any = addAllRotorArrows(scene);
                setArrows(arrowDict)

                setLoadingProgress(false);

                enigmaMachineRef.current = createEnigmaModel();

            });

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            renderer.dispose();
        };
    }, [camera, controls]);

    useEffect(() => {
        (lampsRef as any).current = lamps;
    }, [lamps]);

    useEffect(() => {
        (rotorPlanesRef as any).current = rotorPlanes;
    }, [rotorPlanes]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const pressedLetter = event.key.toUpperCase();

            if (enigmaMachineRef.current) {
                if (openSettings) {
                    return;
                }
                if (!ALPHABET.includes(pressedLetter)) {
                    if (pressedLetter === " ") {
                        event.preventDefault();
                        message.current += " ";
                    } else {
                        handleClickToOpen();
                    }
                    return;
                }
                const encryptedLetter = enigmaMachineRef.current.runLetterThroughMachine(pressedLetter);

                if (lampsRef.current && lampsRef.current[encryptedLetter]) {
                    lightUpLamp(lampsRef.current[encryptedLetter]);
                }

                const updatedRotors = enigmaMachineRef.current.rotors;

                if (rotorPlanesRef.current) {
                    updateTextOnPlane(
                        (rotorPlanesRef.current as any).rotor1,
                        ALPHABET.indexOf(updatedRotors[0].window) + 1
                    );
                    updateTextOnPlane(
                        (rotorPlanesRef.current as any).rotor2,
                        ALPHABET.indexOf(updatedRotors[1].window) + 1
                    );
                    updateTextOnPlane(
                        (rotorPlanesRef.current as any).rotor3,
                        ALPHABET.indexOf(updatedRotors[2].window) + 1
                    );
                }

                setRotorValues([
                    updatedRotors[0].offset,
                    updatedRotors[1].offset,
                    updatedRotors[2].offset,
                ]);
                message.current += encryptedLetter;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [openSettings, openNotes]);

    useEffect(() => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onPointerDown(event: { clientX: number; clientY: number; }) {

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            if (!arrows) {
                console.log("Arrow not loaded yet!");
                return;
            }

            const intersects = raycaster.intersectObjects(Object.values(arrows), true);

            if (intersects.length > 0) {
                const clickedObject: Object3D<Object3DEventMap> = intersects[0].object;
                if (Object.values(arrows).includes(clickedObject)) {
                    handleArrowClick(clickedObject);
                }
            }
        }

        addEventListener('pointerdown', onPointerDown);
        return () => window.removeEventListener('pointerdown', onPointerDown);
    }, [camera, handleArrowClick, renderer.domElement, arrows, rotorValues]);

    function minusAddRotorValue(rotorValue: number, minusAdd: number) {
        if (rotorValue + minusAdd < 1) {
            return 26;
        } else if (rotorValue + minusAdd > 26) {
            return 1;
        } else {
            return rotorValue + minusAdd;
        }
    } // this is a terrible way to do this lol - % would be better

    function moveToPlugboard() {

        const box = new THREE.Box3().setFromObject(plugWiresRef.current);
        const targetCenter = box.getCenter(new THREE.Vector3());

        camera.position.set(
            targetCenter.x - 3,
            targetCenter.y + 1,
            targetCenter.z
        );

        controls.target.set(
            targetCenter.x,
            targetCenter.y,
            targetCenter.z
        );

        controls.update();
    }

    function handleArrowClick(clickedObject: Object3D<Object3DEventMap>) {
        let addMessageNewLine = true;
        let newRotorValue: number;
        if (!arrows || !rotorPlanes || !enigmaMachineRef.current) {
            return;
        }

        if (clickedObject === (arrows as any).rotor1Down) {
            newRotorValue = minusAddRotorValue(rotorValues[0], -1);
            updateTextOnPlane((rotorPlanes as any).rotor1, newRotorValue);
            setRotorValues([newRotorValue, rotorValues[1], rotorValues[2]]);
            enigmaMachineRef.current.rotors[0].updatePosition(newRotorValue);
            console.log(newRotorValue)
        } else if (clickedObject === (arrows as any).rotor1Up) {
            newRotorValue = minusAddRotorValue(rotorValues[0], 1);
            updateTextOnPlane((rotorPlanes as any).rotor1, newRotorValue);
            setRotorValues([newRotorValue, rotorValues[1], rotorValues[2]]);
            enigmaMachineRef.current.rotors[0].updatePosition(newRotorValue);
            console.log(newRotorValue)
        } else if (clickedObject === (arrows as any).rotor2Down) {
            newRotorValue = minusAddRotorValue(rotorValues[1], -1);
            updateTextOnPlane((rotorPlanes as any).rotor2, newRotorValue);
            setRotorValues([rotorValues[0], newRotorValue, rotorValues[2]]);
            enigmaMachineRef.current.rotors[1].updatePosition(newRotorValue);
            console.log(newRotorValue)
        } else if (clickedObject === (arrows as any).rotor2Up) {
            newRotorValue = minusAddRotorValue(rotorValues[1], 1);
            updateTextOnPlane((rotorPlanes as any).rotor2, newRotorValue);
            setRotorValues([rotorValues[0], newRotorValue, rotorValues[2]]);
            enigmaMachineRef.current.rotors[1].updatePosition(newRotorValue);
            console.log(newRotorValue)
        } else if (clickedObject === (arrows as any).rotor3Down) {
            newRotorValue = minusAddRotorValue(rotorValues[2], -1);
            updateTextOnPlane((rotorPlanes as any).rotor3, newRotorValue);
            setRotorValues([rotorValues[0], rotorValues[1], newRotorValue]);
            enigmaMachineRef.current.rotors[2].updatePosition(newRotorValue);
            console.log(newRotorValue)
        } else if (clickedObject === (arrows as any).rotor3Up) {
            newRotorValue = minusAddRotorValue(rotorValues[2], 1);
            updateTextOnPlane((rotorPlanes as any).rotor3, newRotorValue);
            setRotorValues([rotorValues[0], rotorValues[1], newRotorValue]);
            enigmaMachineRef.current.rotors[2].updatePosition(newRotorValue);
            console.log(newRotorValue)
        } else {
            console.log("Unknown arrow clicked!");
            addMessageNewLine = false;
        }
        console.log(enigmaMachineRef.current)
        if (addMessageNewLine) {
            console.log("Adding new line");
            console.log(message.current.slice(-2))
            if (message.current.slice(-2) !== "++") {
                message.current += "++";
            }
        }
    }

    return (
        <div>
            <div ref={containerRef}
                 style={{width: '100vw', height: '100vh'}}>
                {loadingProgress && <h3 style={{
                    position: "absolute",
                    width: '15vw',
                    height: '10vw',
                    top: "50dvh",
                    left: "46dvw",
                    color: "black",
                    zIndex: 1
                }}>Loading! Hang tight :)</h3>}
            </div>
            <div>
                <Button
                    onClick={() => {setOpenNotes(!openNotes)}}
                    disabled={openSettings}
                    variant="contained"
                    sx={{
                        zIndex: 9999,
                        position: "fixed",
                        bottom: 16,
                        left: "42%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <TextSnippetIcon />
                </Button>
                <Dialog sx={{zIndex: 10000}} open={open} onClose={handleToClose}>
                    <DialogTitle>Invalid Input</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please only use the alphabet keys to interact with the Enigma Machine.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleToClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Button
                    onClick={() => {setOpenSettings(!openSettings)}}
                    disabled={openNotes}
                    variant="contained"
                    sx={{
                        zIndex: 9999,
                        position: "fixed",
                        bottom: 16,
                        left: "58%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <SettingsInputComponentIcon />
                </Button>
            </div>

            <div style={{position: 'absolute', top: 0, left: 0, zIndex: 100}}>
                <EnigmaOutputs message={message} open={openNotes} setOpen={setOpenNotes}/>
            </div>
            <div style={{position: 'absolute', top: 0, left: 0, zIndex: 100}}>
                <EnigmaSettings open={openSettings} setOpen={setOpenSettings} animatePlugboard={() => animatePlugboard()} enigmaMachine={enigmaMachineRef} moveToPlugboard={() => moveToPlugboard()} />
            </div>
        </div>
    )
}
