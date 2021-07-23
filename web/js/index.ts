
import { add_baseball, baseballs_GLTF } from './baseball_loader';
import { Baseball } from './Baseball';
import { camera, renderer, scene } from './init';
import {get_views} from './view_angles'


/*
add eslint to project
*/



const fastball = new Baseball( 3.83972, 2409, -1,  53.59, 5.35, 6.531, -145.965, -3.129, -12.466, 30.366, -14.453 );

fastball.create_tracer();
fastball.create_tracer3();


add_baseball(fastball.x, fastball.y, fastball.z).catch(error => console.error(error));

get_views()


const animate = function () {
    requestAnimationFrame( animate );

    baseballs_GLTF.rotateOnAxis(fastball.vector3Axis, .1);

    renderer.render( scene, camera );
};

animate();



