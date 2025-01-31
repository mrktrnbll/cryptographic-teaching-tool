'use client'

import React, {useEffect, useRef, useState} from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';



export default function EnigmaModel({camera, controls, renderer}) {
    const [loadingProgress, setLoadingProgress] = useState(true);
    let lamps = null;
    let rotors = null;
    let plugs = null;
    let plugWires = null;
    let rotorPlanes = {}

    const ROTOR_HEIGHT = 0.003

    const background = 0xE5E1DA
    const whiteBackground = 0xFFFFFF

    const containerRef = useRef();

    function lightUpLamp(mesh, color = 0xffff00, duration = 500) {
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

    function getLamps(gltf) {
        const lamps = {};
        const letters = "abcdefghijklmnopqrstuvwxyz".split("");

        letters.forEach(letter => {
            const lampName = `lamp_${letter}`;
            const lampObject = gltf.scene.getObjectByName(lampName);
            if (lampObject) {
                lamps[letter.toUpperCase()] = lampObject;
            }
        });

        return lamps;
    }

    function getRotors(gltf) {
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

    function createTextPlane(textValue) {
        const size = 512;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, size, size);

        ctx.fillStyle = '#939393';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '300px sans-serif';
        ctx.fillText(textValue, size / 2, size / 2);

        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
        });

        const planeGeo = new THREE.PlaneGeometry(0.015, 0.015);
        const planeMesh = new THREE.Mesh(planeGeo, material);

        return planeMesh;
    }

    function createDefaultRotorValuePlanes() {
        let rotorPositionSpace = -0.029
        for (const [key, rotor] of Object.entries(rotors)) {
            const labelPlane = createTextPlane("0");
            labelPlane.rotation.z = THREE.MathUtils.degToRad(-90)
            rotor.add(labelPlane);
            labelPlane.position.set(0, rotorPositionSpace, ROTOR_HEIGHT);

            rotorPlanes[key] = labelPlane;
            rotorPositionSpace += 0.029;
        }
    }

    function updateTextOnPlane(plane, newRotorValue) {
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

    function addFourLightSources(scene) {
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
            gltf => {
                scene.add(gltf.scene);
                gltf.scene.position.set(0,-1,0)
                gltf.scene.scale.set(0.3, 0.3, 0.3);

                lamps = getLamps(gltf);
                rotors = getRotors(gltf);
                [plugs, plugWires] = getPlugBoard(gltf);

                if (lamps) {
                    console.log("got lamps", lamps);
                }

                if (rotors) {
                    createDefaultRotorValuePlanes();
                    setTimeout(() => {
                        updateTextOnPlane(rotorPlanes.rotor1, 1);
                        updateTextOnPlane(rotorPlanes.rotor2, 2);
                        updateTextOnPlane(rotorPlanes.rotor3, 3);
                    });
                }

                if (plugs && plugWires) {
                    animatePlugboard();
                }

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

    addEventListener("keydown", (event) => {
        if (lamps && lamps[event.key.toUpperCase()]) {
            lightUpLamp(lamps[event.key.toUpperCase()]);
        }
    });

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
