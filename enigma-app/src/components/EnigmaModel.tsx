'use client'

import React, {useEffect, useRef, useState} from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



function EnigmaModel() {
    const [loadingProgress, setLoadingProgress] = useState(true);

    const background = 0xE5E1DA
    const whiteBackground = 0xFFFFFF

    const containerRef = useRef();

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(background);

        //dev mode
        const axesHelper = new THREE.AxesHelper( 5 );
        scene.add( axesHelper );

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(-3, 1, 2);
        camera.rotation.set(0, -1, 0);

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
        controls.rotateSpeed = 0.5;
        controls.zoomSpeed = 0.5;

        const light = new THREE.DirectionalLight(whiteBackground, 1);
        light.position.set(-3, 2, 2);
        scene.add(light);

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

        const loader = new GLTFLoader();
        loader.load('lamp_changed/lamp_ammended.gltf',
            gltf => {
                scene.add(gltf.scene);
                gltf.scene.position.set(0,-1,0)
                gltf.scene.scale.set(7, 7, 7);

                const lampR = gltf.scene.getObjectByName('lamp_r');

                if (lampR) {
                    console.log(lampR.material);
                    lampR.material.emissive = new THREE.Color(0x000000);
                    lampR.material.emissiveIntensity = 1.0;
                }

                setTimeout(() => {
                    console.log("trying to light up");
                    if (lampR) {
                        console.log("lighting up lamp got the lamp_a");
                        lightUpLamp(lampR, 0xffff00, 1000);
                    }
                }, 6000);

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
    }, []);


    return (
        <div ref={containerRef}
             style={{width: '100vw', height: '100vh'}}>
            {loadingProgress && <h3 style={{
                position: "absolute",
                width: '10vw',
                height: '10vw',
                top: "50dvh",
                left: "46dvw",
                color: "black",
                zIndex: 1
            }}>Loading! Hang tight :)</h3>}
        </div>
    )
}

export default EnigmaModel;
