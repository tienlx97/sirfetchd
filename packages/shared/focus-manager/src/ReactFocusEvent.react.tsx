import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { checkPassiveEventsSupported, ReactEventHelpers, ReactEventHookPropagation, ReactUseEventReact } from "@farfetchd/react-event"
import { useLayoutEffect_SAFE_FOR_SSR } from "@farfetchd/experimental";

const l = ReactEventHelpers.hasPointerEvents
  ? ["keydown", "pointermove", "pointerdown", "pointerup"]
  : ["keydown", "mousedown", "mousemove", "mouseup", "touchmove", "touchstart", "touchend"]

const m = {
  passive: true
}

let n = true
let o = false;

const _5403 = false


function p() {
  l.forEach(function (a) {
    window.addEventListener(a, s, checkPassiveEventsSupported ? {
      capture: true,
      passive: true
    } : true)
  })
}

function q(a) {
  const b = a.metaKey
    , c = a.altKey;
  a = a.ctrlKey;
  return !(b || !ReactEventHelpers.isMac && c || a)
}
function r(a) {
  let b = a.key;
  a = a.target;
  if (b === "Tab" || b === "Escape")
    return false;
  b = a.isContentEditable;
  a = a.tagName;
  return a === "INPUT" || a === "TEXTAREA" || b
}

function s(a) {
  if (a.type === "keydown")
    q(a) && (n = true);
  else {
    a = a.target.nodeName;
    if (a === "HTML")
      return;
    n = false
  }
}

function t(a, b) {
  if (a.type === "keydown") {
    a = a.nativeEvent;
    q(a) && !r(a) && b(true)
  } else
    n = false,
      b(false)
}
function u(a, b, c) {
  a.forEach(function (a) {
    a.setListener(b, function (a) {
      return t(a, c)
    })
  })
}

function v() {
  const a = ReactUseEventReact("mousedown", m)
    , b = ReactUseEventReact(ReactEventHelpers.hasPointerEvents ? "pointerdown" : "touchstart", m)
    , e = ReactUseEventReact("keydown", m);
  return useMemo(function () {
    return [a, b, e]
  }, [e, a, b])
}
function w() {
  useEffect(function () {
    o || (o = true,
      p())
  }, [])
}

function useFocus(a, b) {
  const e = b.disabled
    , f = b.onBlur
    , g = b.onFocus
    , h = b.onFocusChange
    , j = b.onFocusVisibleChange
    , l = useRef({
      isFocused: false,
      isFocusVisible: false
    })
    , o = ReactUseEventReact("focusin", m)
    , p = ReactUseEventReact("focusout", m)
    , q = v();
  useLayoutEffect_SAFE_FOR_SSR(function () {
    const b = a.current
      , i = l.current;
    if (b !== null && b.nodeType === 1) {
      u(q, b, function (a) {
        i.isFocused && i.isFocusVisible !== a && (i.isFocusVisible = a,
          j && j(a))
      });
      const k = function (a) {
        i.isFocused && (i.isFocused = false,
          f && f(a),
          h && h(false),
          i.isFocusVisible && j && j(false),
          i.isFocusVisible = n)
      };
      o.setListener(b, function (a) {
        if (!_5403 && e === true)
          return;
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(a, "useFocus"))
          return;
        ReactEventHookPropagation.stopEventHookPropagation(a, "useFocus");
        !i.isFocused && b === a.target && (i.isFocused = true,
          i.isFocusVisible = n,
          g && g(a),
          h && h(true),
          i.isFocusVisible && j && j(true))
      });
      p.setListener(b, function (a) {
        if (!_5403 && e === true)
          return;
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(a, "useFocus"))
          return;
        ReactEventHookPropagation.stopEventHookPropagation(a, "useFocus");
        k(a)
      })
    }
  }, [p, e, o, a, q, f, g, h, j]);


  useEffect(function () {
    const b = a.current
      , c = l.current;
    return function () {
      if (a.current === null && c.isFocused) {
        c.isFocused = false;
        const d = new window.FocusEvent("blur");
        Object.defineProperty(d, "target", {
          value: b
        });
        f && f(d);
        h && h(false);
        c.isFocusVisible && j && j(false);
        c.isFocusVisible = n
      }
    }
  });
  w()
}

function useFocusWithin(a, b) {
  const e = b.disabled
    , f = b.onAfterBlurWithin
    , g = b.onBeforeBlurWithin
    , i = b.onBlurWithin
    , j = b.onFocusWithin
    , l = b.onFocusWithinChange
    , o = b.onFocusWithinVisibleChange
    , p = useRef({
      isFocused: false,
      isFocusVisible: false
    })
    , q = ReactUseEventReact("focusin", m)
    , r = ReactUseEventReact("focusout", m)
    , s = ReactUseEventReact("afterblur", m)
    , t = ReactUseEventReact("beforeblur", m)
    , x = v();
  b = useCallback(function (b) {
    typeof a === "function" ? a(b) : a.current = b;
    const h = p.current;
    b !== null && h !== null && (u(x, b, function (a) {
      h.isFocused && h.isFocusVisible !== a && (h.isFocusVisible = a,
        o && o(a))
    }),
      q.setListener(b, function (a) {
        if (!_5403 && e === true)
          return;
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(a, "useFocusWithin"))
          return;
        h.isFocused || (h.isFocused = true,
          h.isFocusVisible = n,
          l && l(true),
          h.isFocusVisible && o && o(true));
        !h.isFocusVisible && n && (h.isFocusVisible = n,
          o && o(true));
        j && j(a)
      }),
      r.setListener(b, function (a) {
        if (!_5403 && e === true)
          return;
        const f = a.nativeEvent.relatedTarget;
        if (ReactEventHookPropagation.hasEventHookPropagationStopped(a, "useFocusWithin"))
          return;
        h.isFocused && !ReactEventHelpers.isRelatedTargetWithin(b, f) ? (h.isFocused = false,
          l && l(false),
          h.isFocusVisible && o && o(false),
          i && i(a)) : ReactEventHookPropagation.stopEventHookPropagation(a, "useFocusWithin")
      }),
      t.setListener(b, function (a) {
        if (!_5403 && e === true)
          return;
        g && (g(a),
          s.setListener(document, function (a) {
            f && f(a),
              s.setListener(document, null)
          }))
      }))
  }, [s, t, r, e, q, x, a, f, g, i, j, l, o]);
  w();
  return b
}

const ReactFocusEventReact = {
  useFocus,
  useFocusWithin
}

export default ReactFocusEventReact
export { ReactFocusEventReact }

