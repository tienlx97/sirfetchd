const isMac =
  typeof window !== "undefined" && window.navigator != null
    ? /^Mac/.test(window.navigator.platform)
    : false;
const hasPointerEvents =
  typeof window !== "undefined" && window.PointerEvent != null;

function isRelatedTargetWithin(a, b) {
  return b == null
    ? false
    : typeof a.containsNode === "function"
    ? a.containsNode(b)
    : a.contains(b);
}

const ReactEventHelpers = {
  isMac,
  hasPointerEvents,
  isRelatedTargetWithin,
};

export default ReactEventHelpers;
