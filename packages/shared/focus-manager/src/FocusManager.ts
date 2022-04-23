import getTabbableNodes from "./getTabbableNodes";

let h = false,
  i = false,
  j = false;
const k = 500;

function l() {
  try {
    const a = document.createElement("div");
    a.addEventListener(
      "focus",
      function (a) {
        a.preventDefault(), a.stopPropagation();
      },
      !0
    );
    a.focus(
      Object.defineProperty({}, "preventScroll", {
        get: function () {
          i = !0;
        },
      })
    );
  } catch (a) {}
}
function m(a: any) {
  a = a.parentElement;
  const b = [],
    c = document.scrollingElement || document.documentElement;
  while (a && a !== c) {
    let d = a;
    const e = d.offsetHeight;
    d = d.offsetWidth;
    (e < a.scrollHeight || d < a.scrollWidth) &&
      b.push([a, a.scrollTop, a.scrollLeft]);
    a = a.parentElement;
  }
  c && b.push([c, c.scrollTop, c.scrollLeft]);
  return b;
}
function n(a) {
  for (let b = 0; b < a.length; b++) {
    let c = a[b];
    const d = c[0];
    const e = c[1];
    c = c[2];
    d.scrollTop = e;
    d.scrollLeft = c;
  }
}
function getAllNodesFromOneOrManyQueries(a, b) {
  a = Array.isArray(a) ? a : [a];
  for (let c = 0; c < a.length; c++) {
    const d = b.DO_NOT_USE_queryAllNodes(a[c]);
    if (d) return d;
  }
  return null;
}
function getFirstNodeFromOneOrManyQueries(a, b) {
  a = Array.isArray(a) ? a : [a];
  for (let c = 0; c < a.length; c++) {
    const d = b.DO_NOT_USE_queryFirstNode(a[c]);
    if (d) return d;
  }
  return null;
}
function focusFirst(a, b, c) {
  c = c || {};
  const d = c.preventScroll,
    e = c.focusWithoutUserIntent;
  c = c.focusWithAutoFocus;
  a = getFirstNodeFromOneOrManyQueries(a, b);
  a != null &&
    focusElement(a, {
      preventScroll: d,
      focusWithoutUserIntent: e,
      focusWithAutoFocus: c,
    });
}
function isFocusingWithoutUserIntent() {
  return h;
}
function wasElementAutoFocused(a) {
  return a._focusWithAutoFocus === !0;
}
function focusElement(a, b?) {
  b = b || {};
  let c = b.preventScroll;
  const d = b.focusWithoutUserIntent;
  b = b.focusWithAutoFocus;
  if (a !== null) {
    j || ((j = !0), l());
    let e = a._tabIndexState;
    if (e && e.canTab === false) return;
    e = e ? e.value : a.tabIndex;
    a.tabIndex = -1;
    const f = h;
    c = c || false;
    b === !0 &&
      ((a._focusWithAutoFocus = !0),
      window.setTimeout(function () {
        a._focusWithAutoFocus = false;
      }, k));
    try {
      h = d || false;
      if (!c) t(a);
      else if (i)
        t(a, {
          preventScroll: !0,
        });
      else {
        b = m(a);
        t(a);
        n(b);
      }
    } catch (a) {
    } finally {
      h = f;
    }
    a.tabIndex = e;
  }
}
function focusNext(a, b, d) {
  a = getTabbableNodes(a, b);
  b = a[0];
  const e = a[2],
    f = a[3];
  a = a[4];
  a !== null &&
    a !== e &&
    b &&
    focusElement(b[f + 1], {
      preventScroll: d,
    });
}
function focusPrevious(a, b, d) {
  a = getTabbableNodes(a, b);
  b = a[0];
  const e = a[1],
    f = a[3];
  a = a[4];
  a !== null &&
    a !== e &&
    b &&
    focusElement(b[f - 1], {
      preventScroll: d,
    });
}
function focusNextContained(a, b, d, e, f) {
  a = getTabbableNodes(a, b);
  b = a[0];
  const g = a[1],
    h = a[2],
    i = a[3];
  a = a[4];
  if (a === null || b === null) return;
  a === h
    ? f != null
      ? f()
      : e === !0 && (focusElement(g), d.preventDefault(), d.stopPropagation())
    : (focusElement(b[i + 1]), d.preventDefault(), d.stopPropagation());
}
function focusPreviousContained(a, b, d, e, f) {
  a = getTabbableNodes(a, b);
  b = a[0];
  const g = a[1],
    h = a[2],
    i = a[3];
  a = a[4];
  if (a === null || b === null) return;
  a === g
    ? f != null
      ? f()
      : e === !0 && (focusElement(h), d.preventDefault(), d.stopPropagation())
    : (focusElement(b[i - 1]), d.preventDefault(), d.stopPropagation());
}
const t = function (a, b?) {
  (a.focus || HTMLElement.prototype.focus).call(a, b);
};

const FocusManager = {
  getAllNodesFromOneOrManyQueries,
  getFirstNodeFromOneOrManyQueries,
  focusFirst,
  isFocusingWithoutUserIntent,
  wasElementAutoFocused,
  focusElement,
  focusNext,
  focusPrevious,
  focusNextContained,
  focusPreviousContained,
};

export default FocusManager;
export { FocusManager };
