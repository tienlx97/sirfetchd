const canUse = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
);

let b = false;
let d: any;
const _1703328 = true;

if (canUse && !_1703328) {
  try {
    d = {};
    Object.defineProperty(d, "passive", {
      get: function () {
        b = true;
      },
    });
    window.addEventListener("test", d, d);
    window.removeEventListener("test", d, d);
  } catch (a) {
    b = false;
  }
}

export default b;
