import * as THREE from 'three';
import { multiplier, scene } from "./init";
import { LineBasicMaterial } from 'three';
import *  as spin from "./spin_dir";

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

  function create_line2(spin_dir: number, rpms: number, efficiency: number, x: number , y: number , z: number ,
     velX: number , velY: number, velZ: number) {

    //change to thick lines in future?
    const material = new LineBasicMaterial ( { 
      color: 0xa83266,
      linewidth: 1, //this does not work
      linecap: 'round',
     } );

     const points = [];
     
     var accDragY: number, accDragX: number, accDragZ: number;
     var KConst: number
     var airDensity: number, radius: number;
     var dragCoefficient:number, mass:number;
     var totalV: number;
     var gravity: number;
     var accX: number, accY: number, accZ: number;


     var deltaTime: number;
     deltaTime = 1000;

      radius = 1.43/12; //feet
      dragCoefficient = .3; 
      //using .3 as Drag Coefficient, see https://www.grc.nasa.gov/www/k-12/airplane/balldrag.html
      //real range between .2 and .5 because of drag crisis

      mass = 5/16; //5oz or 5/16 of a pound
      airDensity = .0740; // pounds per feet^3 this is of at Tropicana Field at 70 F 50% Humidity (later add ability to change weather, evevation, etc..., but for now keep at this)
      KConst = .5 * airDensity * Math.PI * Math.pow(radius, 2) / mass;
      var LiftCoefficient= 3.4;
      gravity = -32.174; // feet per second

      totalV = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2) + Math.pow(velZ, 2));

      accDragY = -1 * KConst * dragCoefficient * totalV * (velY);
      accDragX = -1 * KConst * dragCoefficient * totalV * (velX);
      accDragZ = -1 * KConst * dragCoefficient * totalV * (velZ);

      // var accMagnusX = accX - accDragX ;
      // var accMagnusY = accY - accDragY ;
      // var accMagnusZ = accZ - accDragZ - gravity;

      var spin_direction_radians = spin.angular_momentum_direction(spin_dir)

      var A = .336
      var B = 6.041

      LiftCoefficient = A * (1 - Math.exp(-B * (radius * rpms * efficiency / totalV)))

      var accMagnus = KConst * LiftCoefficient * totalV ** 2;
      var accMagnusX = spin.angular_momentum_x(spin_direction_radians) * accMagnus * efficiency
      var accMagnusZ = spin.angular_momentum_z(spin_direction_radians) * accMagnus * efficiency
      var accMagnusY = 0;

      var accMagnusXhelper = accMagnusX / Math.pow(totalV, 2);
      var accMagnusYhelper = accMagnusY / Math.pow(totalV, 2);
      var accMagnusZhelper = accMagnusZ / Math.pow(totalV, 2);

     while(y > 0) {
        
        points.push( new THREE.Vector3(x * multiplier, y * multiplier, z * multiplier) );

        totalV = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2) + Math.pow(velZ, 2));
        
        accDragY = -1 * KConst * dragCoefficient * totalV * (velY);
        accDragX = -1 * KConst * dragCoefficient * totalV * (velX);
        accDragZ = -1 * KConst * dragCoefficient * totalV * (velZ);

        accMagnusX = accMagnusXhelper * Math.pow(totalV, 2);
        accMagnusY = accMagnusYhelper * Math.pow(totalV, 2);
        accMagnusZ = accMagnusZhelper * Math.pow(totalV, 2);
        

        accX = accDragX + accMagnusX;
        accY = accDragY + accMagnusY;
        accZ = accDragZ + accMagnusZ + gravity;

        velX += accX / deltaTime;
        velY += accY / deltaTime;
        velZ += accZ / deltaTime;

        x += velX / deltaTime ;
        y += velY / deltaTime ;
        z += velZ / deltaTime ;

        accMagnusXhelper = accMagnusX / Math.pow(totalV, 2);
        accMagnusYhelper = accMagnusY / Math.pow(totalV, 2);
        accMagnusZhelper = accMagnusZ / Math.pow(totalV, 2);

        totalV = Math.sqrt(Math.pow(velX, 2) + Math.pow(velY, 2) + Math.pow(velZ, 2));

    }
    console.log("coordinates: " + x + ", " + y + ", " + z)

    points.push( new THREE.Vector3(x * multiplier, y * multiplier, z * multiplier) );
    
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const line = new THREE.Line( geometry, material );
    scene.add(line);
    }
    export {create_line2};






