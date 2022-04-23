import React from "react";
import stylex from "@ladifire-opensource/stylex";
import FocusWithinHandlerReact from "./FocusWithinHandler.react";
const i = stylex.create({
  focused: {
    outline: "2px solid Highlight",
    "@media (-webkit-min-device-pixel-ratio: 0)": {
      outline: "5px auto -webkit-focus-ring-color",
    },
  },
  newFocused: {
    boxShadow: "0 0 0 2px var(--always-white), 0 0 0 4px var(--base-blue)",
    outline: "none",
  },
  newFocusedInset: {
    boxShadow: "inset 0 0 0 2px var(--base-blue), inset 0 0 0 4px var(--always-white)",
    outline: "none",
  },
  newFocusedLink: {
    outline: "var(--base-blue) auto 2px",
  },
  unfocused: {
    outline: "none",
  },
});

const j = {
  default: i.newFocused,
  inset: i.newFocusedInset,
};

const k = true;

const baseFocusRingReact = (a) => {
  const { children, testOnly, suppressFocusRing, focusRingPosition } = a;
  const d = focusRingPosition === void 0 ? "default" : focusRingPosition;
  const isSuppressFocusRing = suppressFocusRing === void 0 ? !1 : suppressFocusRing;
  const g = k ? j[d] : i.focused;

  return (
    <FocusWithinHandlerReact
      testOnly={testOnly}
      children={(a, c) => {
        return children(!isSuppressFocusRing && a && c ? g : i.unfocused);
      }}
    />
  )
};


baseFocusRingReact.displayName =
  baseFocusRingReact.name + " [from BaseFocusRing.react]";
baseFocusRingReact.focusRingXStyle = k ? i.newFocused : i.focused;
baseFocusRingReact.focusRingInsetXStyle = k ? i.newFocusedInset : i.focused;
baseFocusRingReact.linkFocusRingXStyle = k ? i.newFocusedLink : i.focused;

export default baseFocusRingReact;
