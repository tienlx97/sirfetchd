function hasEventHookPropagationStopped(event, eventName) {
  const _stopEventHookPropagation = event._stopEventHookPropagation;
  return (
    _stopEventHookPropagation !== undefined &&
    _stopEventHookPropagation[eventName]
  );
}
function stopEventHookPropagation(event, eventName) {
  let _stopEventHookPropagation = event._stopEventHookPropagation;
  _stopEventHookPropagation ||
    (_stopEventHookPropagation = event._stopEventHookPropagation = {});
  _stopEventHookPropagation[eventName] = true;
}

const ReactEventHookPropagation = {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
};

export default ReactEventHookPropagation;
