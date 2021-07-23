import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { multiplier, scene } from "./init";

const loader = new GLTFLoader();
export var baseballs_GLTF: THREE.Group;

function loadModel(url: string) {
    return new Promise((resolve) => {
        loader.load(url, function (object) { resolve(object); },
        
        function ( xhr ) {

            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
        },
        // called when loading has errors
        function ( error ) {
    
            console.error(error);
    
        });
    });
}
export async function add_baseball(x: number, y: number ,z:number) {
    var ball_GLTF: any, ball_mesh: any;

    ball_GLTF = await loadModel('web/styles/baseball/baseball.glb');
    ball_mesh = ball_GLTF.scene;
    scene.add(ball_mesh);

    baseballs_GLTF = ball_mesh;

    //ball_mesh.scale.set(.1 * 3/17, .1 * 3/17, .1 * 3/17); //actual baseball size
    ball_mesh.scale.set(.05, .05, .05);
    ball_mesh.position.set(x * multiplier, y * multiplier, z * multiplier);

}
