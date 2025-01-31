'use client'

import React, {useEffect, useRef, useState} from "react";
import * as THREE from 'three';
import {Mesh, Object3D, Object3DEventMap} from 'three';

// @ts-expect-error - no types for this package
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// @ts-expect-error - no types for this package
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";


export default function EnigmaModel({camera, controls, renderer}: {camera: THREE.PerspectiveCamera, controls: OrbitControls, renderer: THREE.WebGLRenderer}) {
    const [loadingProgress, setLoadingProgress] = useState(true);
    const [arrows, setArrows] = useState();
    const [rotorPlanes, setRotorPlanes] = useState();
    const [rotorValues, setRotorValues] = useState([1,1,1]);
    let lamps: { [s: string]: Mesh; };
    let rotors: { [s: string]: Mesh; };
    let plugs: Mesh;
    let plugWires: Mesh;

    const ROTOR_HEIGHT = 0.003

    const background = 0xE5E1DA
    const whiteBackground = 0xFFFFFF

    const containerRef = useRef();

    function lightUpLamp(mesh:Mesh, color = 0xffff00, duration = 500) {
        if (!mesh) return;

        if (!mesh.material.isCloned) {
            mesh.material = mesh.material.clone();
            mesh.material.isCloned = true;
        }

        mesh.material.emissive.setHex(color);

        setTimeout(() => {
            mesh.material.emissive.setHex(0x000000);
        }, duration);
    }

    function getLamps(gltf: unknown) {
        const lamps = {};
        const letters = "abcdefghijklmnopqrstuvwxyz".split("");

        letters.forEach(letter => {
            const lampName = `lamp_${letter}`;
            const lampObject: Mesh = gltf.scene.getObjectByName(lampName);
            if (lampObject) {
                lamps[letter.toUpperCase()] = lampObject;
            }
        });

        return lamps;
    }

    function getRotors(gltf: unknown) {
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

    function getPlugBoard(gltf) {
        plugWires = gltf.scene.getObjectByName("plug_wires");
        plugs = gltf.scene.getObjectByName("plugs");
        return [plugs, plugWires];
    }

    function animatePlugboard() {
        if (!plugs.material.isCloned) {
            plugs.material = plugs.material.clone();
            plugs.material.isCloned = true;
        }

        if (!plugWires.material.isCloned) {
            plugs.material = plugs.material.clone();
            plugs.material.isCloned = true;
        }

        plugWires.material.emissive.setHex(0xff1616);
        plugs.material.emissive.setHex(0xe1984f);

        setTimeout(() => {
            plugs.material.emissive.setHex(0x000000);
            plugWires.material.emissive.setHex(0x000000);
        }, 2000);

        // TODO: got to add this function as a call when "walkthrough"
        // wants to see it.
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

    function updateTextOnPlane(plane: unknown, newRotorValue: number) {
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

        // dev mode - remove if needed
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);
        camera.position.set(-6, 6, 4);

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;

        addFourLightSources(scene);

        const loader = new GLTFLoader();
        loader.load('lamp_changed/lamp_ammended.gltf',
            (gltf: unknown) => {
                scene.add(gltf.scene);
                gltf.scene.position.set(0,-1,0);
                gltf.scene.scale.set(0.3, 0.3, 0.3);

                lamps = getLamps(gltf);
                rotors = getRotors(gltf);
                [plugs, plugWires] = getPlugBoard(gltf);

                if (lamps) {

                }

                if (rotors) {
                    const newRotorPlanes = createDefaultRotorValuePlanes();
                    setRotorPlanes(newRotorPlanes);
                }

                if (plugs && plugWires) {
                    animatePlugboard();
                }
                const arrowDict = addAllRotorArrows(scene);
                setArrows(arrowDict)

                setLoadingProgress(false);
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
        addEventListener("keydown", (event) => {
            if (lamps && lamps[event.key.toUpperCase()]) {
                lightUpLamp(lamps[event.key.toUpperCase()]);
            }
        });
        return () => window.removeEventListener("keydown", () => {});
    }, [lamps]);


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
    }

    function handleArrowClick(clickedObject: Object3D<Object3DEventMap>) {
        let rv: [number, number, number];
        let minusAdd: number;
        if (!arrows || !rotorPlanes) {
            return;
        }
        if (clickedObject === arrows.rotor1Down) {
            minusAdd = minusAddRotorValue(rotorValues[0], -1);
            rv = [minusAdd, rotorValues[0], rotorValues[2]]
            updateTextOnPlane(rotorPlanes.rotor1, minusAdd);
            setRotorValues(rv)
        } else if (clickedObject === arrows.rotor2Down) {
            minusAdd = minusAddRotorValue(rotorValues[1], -1)
            rv = [rotorValues[0], minusAdd, rotorValues[2]]
            updateTextOnPlane(rotorPlanes.rotor2,minusAdd);
            setRotorValues(rv)
        } else if (clickedObject === arrows.rotor3Down) {
            minusAdd = minusAddRotorValue(rotorValues[2], -1)
            rv = [rotorValues[0], rotorValues[1], minusAdd]
            updateTextOnPlane(rotorPlanes.rotor3, minusAdd);
            setRotorValues(rv)
        } else if (clickedObject === arrows.rotor1Up) {
            minusAdd = minusAddRotorValue(rotorValues[0], 1)
            rv = [minusAdd, rotorValues[1], rotorValues[2]]
            updateTextOnPlane(rotorPlanes.rotor1, minusAdd);
            setRotorValues(rv)
        } else if (clickedObject === arrows.rotor2Up) {
            minusAdd = minusAddRotorValue(rotorValues[1], 1)
            rv = [rotorValues[0], minusAdd, rotorValues[2]]
            updateTextOnPlane(rotorPlanes.rotor2, minusAdd);
            setRotorValues(rv)
        } else if (clickedObject === arrows.rotor3Up) {
            minusAdd = minusAddRotorValue(rotorValues[2], 1)
            rv = [rotorValues[0], rotorValues[1], minusAdd]
            updateTextOnPlane(rotorPlanes.rotor3, minusAdd);
            setRotorValues(rv)
        } else {
            console.log("Unknown arrow clicked!");
        }
    }

    return (
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
    )
}
