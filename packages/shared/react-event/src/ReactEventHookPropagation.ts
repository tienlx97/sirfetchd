function hasEventHookPropagationStopped(a, b) {
  a = a._stopEventHookPropagation;
  return a !== undefined && a[b];
}
function stopEventHookPropagation(a, b) {
  let c = a._stopEventHookPropagation;
  c || (c = a._stopEventHookPropagation = {});
  c[b] = !0;
}

const ReactEventHookPropagation = {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
};

export default ReactEventHookPropagation;
