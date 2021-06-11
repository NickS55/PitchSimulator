import * as THREE from 'three';
import { multiplier, scene } from "./init";

export function create_strikezone(): void {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-.708 * multiplier, 0, 21/12 * multiplier),
        new THREE.Vector3(.708 * multiplier, 0, 21/12 * multiplier),
        new THREE.Vector3(-.708 * multiplier, 0, 41/12 * multiplier),
        new THREE.Vector3(.708 * multiplier, 0, 41/12 * multiplier),
    );

    geometry.faces.push(
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(1, 2, 3)
    );

    const material = new THREE.MeshBasicMaterial({ 
        color: 0xFF3300,
        side: THREE.DoubleSide,
        opacity: .3,
        transparent: true
         });
    const strikezone = new THREE.Mesh(geometry, material);
    scene.add(strikezone);
}
