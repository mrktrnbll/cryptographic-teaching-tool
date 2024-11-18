import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

loader.load( '', function ( gltf ) {

    scene.add( gltf.scene );

}, undefined, function ( error ) {

    console.error( error );

} );