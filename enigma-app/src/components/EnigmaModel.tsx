'use client'

import React, {useEffect, useRef, useState} from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';


function EnigmaModel() {
    const [loadingProgress, setLoadingProgress] = useState(true);

    const background = 0x8b95aa
    const whiteBackground = 0xffffff

    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(background);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-3, 1, 2);
        camera.rotation.set(0, -1, 0);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const light = new THREE.DirectionalLight(whiteBackground, 1);
        light.position.set(-3, 2, 2);
        scene.add(light);

        const loader = new GLTFLoader();
        loader.load('enigma-machine/machine.gltf',
            gltf => {
                scene.add(gltf.scene);
                gltf.scene.scale.set(5, 5, 5);
                setLoadingProgress(false);
            });

        const animate = () => {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            renderer.dispose();
        };
    }, []);

    return (
        <div ref={containerRef}
             style={{width: '100vw', height: '100vh'}}>
            {loadingProgress && <p style={{
                position: "absolute",
                width: '10vw',
                height: '10vw',
                top: "50dvh",
                left: "46dvw",
                zIndex: 1
            }}>Loading! Hang tight :)</p>}
        </div>
    )
}

export default EnigmaModel;
