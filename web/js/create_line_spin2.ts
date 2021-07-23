import * as THREE from 'three';
import { multiplier, scene } from "./init";
import { LineBasicMaterial } from 'three';
import *  as spin from "./spin_axis";

/*
* A simultion of a pitch based on the data given from trakman 
*
* Units:
* time: seconds
* angles: radians
* speed: feet per second
* mass: lbs
*
* direction: 
* - homeplate to second base : y-axis
* - ground to sky: z-axis
* - 3rd base to 1st base: x-axis
*
* Assumtions that are not true: 
* - The magnus force is constant (this is not true, but is an assumtion that I am using as of right now.)
* - the ball is thrown at Tropicana Field
* - assuming drag coeffient is constant (.3, this is not true)
* - assuming the spin of the baseball does not effect drag ( it does )
*
* to do:
* - add thick lines as an option?
*/

function create_line3(spin_axis: number, rpms: number, efficiency: number, x: number , y: number , z: number ,
    velX: number , velY: number, velZ: number) {

        
    var gravity = -32.174; // feet/second

    var totalVelocity = Math.sqrt(velX ** 2 + velY ** 2 + velZ ** 2)

    var radius = 1.45/12 //feet
    var ballWeight = .3125 //lbs
    var crossSection = Math.PI * radius * radius //feet ^ 2
    var airDensity =  .0767 // lbs/foot^3

    var K = .5 * (airDensity * crossSection) / ballWeight

    var dragCoefficient = .3 //using .3 as Drag Coefficient, see https://www.grc.nasa.gov/www/k-12/airplane/balldrag.html
    //real range between .2 and .5 because of drag crisis
    var drag = K * dragCoefficient

    var S = .119 * efficiency * rpms / totalVelocity
    var liftCoefficient = .336 * (1-Math.pow(Math.E, -6.041 * S))
    var magnusAccHelper = K * liftCoefficient

   const material = new LineBasicMaterial ( { 
     color: 0x19BEDF,
     linewidth: 1, //this does not work
     linecap: 'round',
    } );

    const points = [];

    var deltaTime = 1000

    while(y > 0) {
        points.push( new THREE.Vector3(x * multiplier, y * multiplier, z * multiplier) );

        var xAcc = Math.cos(spin.angular_momentum_direction(spin_axis)) * magnusAccHelper * totalVelocity ** 2
        var yAcc = + drag * totalVelocity ** 2
        var zAcc = Math.sin(spin.angular_momentum_direction(spin_axis)) * magnusAccHelper * totalVelocity ** 2 + gravity

        velX += xAcc / deltaTime
        velY += yAcc / deltaTime
        velZ += zAcc / deltaTime

        x += velX / deltaTime
        y += velY / deltaTime 
        z += velZ / deltaTime 

        totalVelocity = Math.sqrt(velX ** 2 + velY ** 2 + velZ ** 2 )

    }

    console.log("x: " + x + "y: " + y + "z: " + z)
    points.push( new THREE.Vector3(x * multiplier, y * multiplier, z * multiplier) );
    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add(line);
    }
    export {create_line3};