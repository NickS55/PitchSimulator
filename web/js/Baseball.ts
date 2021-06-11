import * as THREE from 'three';
import { create_line } from './create_line';

export class Baseball {
    axisRad: number;
    x: number;
    y: number;
    z: number;
    velX: number;
    velY: number;
    velZ: number;
    accX: number;
    accY: number;
    accZ: number;
    rpm: number;
    vector3Axis: any;
    constructor(
        axisRad: number, rpm: number,
        x: number, y: number, z: number,
        velX: number, velY: number, velZ: number, 
        accX: number, accY: number, accZ: number
    ) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.axisRad = axisRad;
        this.rpm = rpm;
        this.velX = velX;
        this.velY = velY;
        this.velZ = velZ;
        this.accX = accX;
        this.accY = accY;
        this.accZ = accZ;
        

        var axis = new THREE.Vector3(Math.cos(this.axisRad), 0, Math.sin(this.axisRad));
        this.vector3Axis = axis.normalize();
    }

    create_tracer() {
        create_line(this.x, this.y, this.z, this.velX, this.velY, this.velZ, this.accX, this.accY, this.accZ);
    }

    set_axis() {
        var axis = new THREE.Vector3(Math.cos(this.axisRad), Math.sin(this.axisRad), 0);
        this.vector3Axis = axis.normalize();
    }
}
