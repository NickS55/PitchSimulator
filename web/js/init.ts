import * as THREE from 'three';
import { create_grass } from './create_grass';
import { create_plate } from './create_plate';
import { create_strikezone } from './create_strikezone';


export var
    camera: THREE.Camera,
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x87ceeb);
camera.position.set(0, 150, 400);

export var multiplier: number;
multiplier = 10;
create_grass();
create_plate(); //set plate at 0,0

create_strikezone();
var light = new THREE.AmbientLight(0xFFFFFF, .95);
scene.add(light);
renderer.render(scene, camera);
