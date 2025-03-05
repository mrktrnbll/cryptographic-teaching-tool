'use client';

import React, { useState, useEffect, useCallback } from "react";
import EnigmaModel from "../components/EnigmaModel";
import Navigator from "../components/Navigator";
import "../app/globals.css";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function Home() {
    const [camera, setCamera] = useState(null);
    const [renderer, setRenderer] = useState(null);
    const [controls, setControls] = useState(null);
    const [visualiseLetter, setVisualiseLetter] = useState(false);

    useEffect(() => {
        // Only run on the client (after mount)
        const newCamera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        const newRenderer = new THREE.WebGLRenderer();
        const newControls = new OrbitControls(newCamera, newRenderer.domElement);

        setCamera(newCamera);
        setRenderer(newRenderer);
        setControls(newControls);
    }, []);

    const moveToSwitchboard = useCallback(() => {
        if (!controls || !camera) return;
        controls.enabled = false;
        camera.position.set(
            -2.0875537782272278,
            -0.4561543172483984,
            0.09729645744572923
        );
        const lookAtTarget = new THREE.Vector3(100, 0, 0);
        camera.lookAt(lookAtTarget);
        controls.update();
        controls.enabled = true;
    }, [camera, controls]);

   if (!camera || !renderer || !controls) {
        return null;
    }

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <div style={{ position: "absolute", width: "100%", height: "100%" }}>
                <EnigmaModel camera={camera} controls={controls} renderer={renderer} visualiseLetter={visualiseLetter}/>
            </div>
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 100 }}>
                <Navigator setVisualiseLetter={() => setVisualiseLetter()}/>
            </div>
        </div>
    );
}

