
import { add_baseball, baseballs_GLTF } from './baseball_loader';
import { Baseball } from './Baseball';
import { camera, renderer, scene } from './init';
import {get_views} from './view_angles'


/*
add eslint to project
*/



const fastball = new Baseball(1, 2062, -0.893,  50.00, 6.917, 0.005, -125.074, -7.671, -7.709, 26.704, -2.752 );

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



