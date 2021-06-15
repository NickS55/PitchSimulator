/* Spin Axis or Spin Direction in two dimentions (x , z)
note: spin axis points in the opposite direction of its angular momentum
https://www.drivelinebaseball.com/2019/09/mastering-the-axis-of-rotation-a-thorough-review-of-spin-axis-in-three-dimensions/
    0 degrees is a top spinning ball (true 12-6 curve ball
    90 degrees rotates from 1st to home 
*/

export function angular_momentum_direction(radians: number ){
    return radians + Math.PI
}

export function angular_momentum_x(radians: number) {
    console.log(Math.cos(radians) ** 2)
    return Math.cos(radians) ** 2
}

export function angular_momentum_z(radians: number) {
    return Math.sin(radians) ** 2
}


