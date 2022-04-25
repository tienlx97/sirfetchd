// /// <reference lib="webworker" />
// export default null;
// declare let self: ServiceWorkerGlobalScope;

const canUseDOM = !!(
  window != undefined &&
  window.document &&
  window.document.createElement
);

// const isInWorker = typeof WorkerGlobalScope === "function";

const executionEnvironment = {
  canUseDOM,
  canUseWorkers: typeof Worker !== "undefined",
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener /* || window.attachEvent*/),
  canUseViewport: canUseDOM && !!window.screen,
  isInWorker: true,
  isInBrowser: canUseDOM || /*isInWorker*/ true,
};

export default executionEnvironment;
export { executionEnvironment };
