__d(
  "ExecutionEnvironment",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    b = !!(a !== void 0 && a.document && a.document.createElement);
    c = typeof WorkerGlobalScope === "function";
    d = {
      canUseDOM: b,
      canUseWorkers: typeof Worker !== "undefined",
      canUseEventListeners: b && !!(a.addEventListener || a.attachEvent),
      canUseViewport: b && !!window.screen,
      isInWorker: c,
      isInBrowser: b || c,
    };
    e.exports = d;
  },
  null
);
