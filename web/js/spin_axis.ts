/* Spin Axis or Spin Direction in two dimentions (x , z)
note: spin axis points in the opposite direction of its angular momentum
https://www.drivelinebaseball.com/2019/09/mastering-the-axis-of-rotation-a-thorough-review-of-spin-axis-in-three-dimensions/
    0 degrees is a top spinning ball (true 12-6 curve ball
    "A ball thrown with a spin axis of 90 is spinning squarely toward the left, from the pitcher’s perspective (and would create a break to the left)"
    https://trackman.zendesk.com/hc/en-us/articles/115002776647-Radar-Measurement-Glossary-of-Terms
*/

export function angular_momentum_direction(radians: number ){
    return radians - (Math.PI / 2)
}