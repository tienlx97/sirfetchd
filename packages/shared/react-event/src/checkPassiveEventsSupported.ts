const canUse = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
);

let checkPassiveEventsSupported = false;
let d: any;
const _1703328 = true;

if (canUse && !_1703328) {
  try {
    d = {};
    Object.defineProperty(d, "passive", {
      get: function () {
        checkPassiveEventsSupported = true;
      },
    });
    window.addEventListener("test", d, d);
    window.removeEventListener("test", d, d);
  } catch (a) {
    checkPassiveEventsSupported = false;
  }
}

export default checkPassiveEventsSupported;
