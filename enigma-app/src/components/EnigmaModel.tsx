'use client'

import React, {useEffect, useRef, useState} from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import {eventListeners} from "@popperjs/core";



export default function EnigmaModel({camera, controls, renderer}) {
    const [loadingProgress, setLoadingProgress] = useState(true);
    let lamps = null

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


    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(background);

        //dev mode
        const env = process.env.NODE_ENV
        if (env != "development") {
            const axesHelper = new THREE.AxesHelper(5);
            scene.add(axesHelper);
        }

        camera.position.set(-3, 1, 2);

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;

        const light = new THREE.DirectionalLight(whiteBackground, 1);
        light.position.set(-3, 2, 2);
        scene.add(light);

        const loader = new GLTFLoader();
        loader.load('lamp_changed/lamp_ammended.gltf',
            gltf => {
                scene.add(gltf.scene);
                gltf.scene.position.set(0,-1,0)
                gltf.scene.scale.set(7, 7, 7);

                lamps = getLamps(gltf);

                if (lamps) {
                    console.log("got lamps", lamps);
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
        console.log(event.key);
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
