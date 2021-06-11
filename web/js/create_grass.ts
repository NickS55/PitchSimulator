import * as THREE from 'three';
import { multiplier, scene } from "./init";

export function create_grass() {
    var plate_mound_distance = 60.5 * multiplier;

    const grass_geometry = new THREE.PlaneGeometry(100, plate_mound_distance * 1.2);
    const grass_material = new THREE.MeshBasicMaterial({ color: 0x567d46, side: THREE.DoubleSide });
    const grass = new THREE.Mesh(grass_geometry, grass_material);
    scene.add(grass);
    grass.position.set(0, plate_mound_distance / 2, 0);
}
