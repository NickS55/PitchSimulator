import * as THREE from 'three';
import { multiplier, scene } from "./init";

export function create_plate(): void {
    const geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-.708 * multiplier, 0, .5),
        new THREE.Vector3(.708 * multiplier, 0, .5),
        new THREE.Vector3(-.708 * multiplier, .708 * multiplier, .5),
        new THREE.Vector3(.708 * multiplier, .708 * multiplier, .5),
        new THREE.Vector3(0, 1.416 * multiplier, .5)
    );

    geometry.faces.push(
        // front
        new THREE.Face3(0, 1, 2),
        new THREE.Face3(2, 3, 4),
        new THREE.Face3(2, 1, 3)
    );

    const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const plate = new THREE.Mesh(geometry, material);
    scene.add(plate);

    plate.rotateZ(Math.PI);
}
