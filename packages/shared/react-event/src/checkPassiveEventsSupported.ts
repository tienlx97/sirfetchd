const canUseDOM = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
);

// Check if browser support events with passive listeners
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support

let checkPassiveEventsSupported = false;
let options: any;
// const _1703328 = true;

if (canUseDOM /*&& !_1703328*/) {
  try {
    options = {};
    // $FlowFixMe: Ignore Flow complaining about needing a value
    Object.defineProperty(options, "passive", {
      get: function () {
        checkPassiveEventsSupported = true;
      },
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    checkPassiveEventsSupported = false;
  }
}

export default checkPassiveEventsSupported;
