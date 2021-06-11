import { Vector3 } from 'three';
import { camera, multiplier, renderer, scene } from './init';

export function get_views() {
    document.getElementById("RHB_View")!.addEventListener("click", RHB_View);
    document.getElementById("LHB_View")!.addEventListener("click", LHB_View);
    document.getElementById("Pitcher_View")!.addEventListener("click", Pitcher_View);
    document.getElementById("Catcher_View")!.addEventListener("click", Catcher_View);
}

function RHB_View() {
    camera.position.set(-2 * multiplier, -.3 * multiplier, 6 * multiplier);
    camera.lookAt(new Vector3(0, 60.5 * multiplier, 6 * multiplier));
    camera.rotateZ(-Math.PI / 2);
    renderer.render(scene, camera);
}
function LHB_View() {
    camera.position.set(2 * multiplier, -.3 * multiplier, 6 * multiplier);
    camera.lookAt(new Vector3(0, 60.5 * multiplier, 6 * multiplier));
    camera.rotateZ(Math.PI / 2);
    renderer.render(scene, camera);
}
function Pitcher_View() {
    camera.position.set(0, 60.5 * multiplier, 6 * multiplier);
    camera.lookAt(new Vector3(0, 0, 3 * multiplier));
    camera.rotateZ(Math.PI);
    renderer.render(scene, camera);
}
function Catcher_View() {
    camera.position.set(0, -2 * multiplier, 2.3 * multiplier);
    camera.lookAt(new Vector3(0, 60.5 * multiplier, 6 * multiplier));
    camera.rotateZ(Math.PI);
    renderer.render(scene, camera);
}
