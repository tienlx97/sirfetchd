import { unrecoverableViolation } from "./unrecoverableViolation";

function keyMirror(a: any) {
  const b = {};
  if (!(a instanceof Object && !Array.isArray(a)))
    throw unrecoverableViolation(
      "keyMirror(...): Argument must be an object.",
      "comet_infra"
    );
  for (const d in a) {
    if (!Object.prototype.hasOwnProperty.call(a, d)) continue;
    b[d] = d;
  }
  return b;
}
export default keyMirror;
export { keyMirror };
