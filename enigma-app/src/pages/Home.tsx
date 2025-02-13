'use client'

import EnigmaModel from '../components/EnigmaModel'
import Navigator from '../components/Navigator'
import '../app/globals.css'
import {useState, useCallback} from "react";
import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

export default function Home() {
  const [camera, setCamera] = useState(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000));
  const renderer = new THREE.WebGLRenderer();
  const controls = new OrbitControls( camera, renderer.domElement );

  const moveToSwitchboard = useCallback(() => {
      controls.enabled = false;
      camera.position.set(-2.0875537782272278,-0.4561543172483984,0.09729645744572923)
      const lookAtTarget = new THREE.Vector3(100, 0, 0);
      camera.lookAt(lookAtTarget);
      controls.update()
      controls.enabled = true;
  }, [camera, controls]);

  return (
      <div style={{position: 'relative', width: '100vw', height: '100vh'}}>
          <div style={{position: 'absolute', width: '100%', height: '100%'}}>
              <EnigmaModel camera={camera} controls={controls} renderer={renderer}/>
          </div>
          <div style={{position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none'}}>
              <Navigator moveToSwitchboard={moveToSwitchboard}/>
          </div>
      </div>
  );
}
