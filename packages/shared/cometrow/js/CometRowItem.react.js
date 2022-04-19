__d(
  "CometRowItem.react",
  [
    "BaseRowItem.react",
    "CometErrorBoundary.react",
    "CometPlaceholder.react",
    "CometRowContext",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react"),
      i = d("react").useContext,
      j = {
        4: { paddingEnd: "n8tt0mok", paddingStart: "hyh9befq" },
        8: { paddingEnd: "ph5uu5jm", paddingStart: "b3onmgus" },
        12: { paddingEnd: "p8fzw8mz", paddingStart: "pcp91wgn" },
        16: { paddingEnd: "dflh9lhu", paddingStart: "scb9dxdr" },
        24: { paddingEnd: "d1544ag0", paddingStart: "tw6a2znq" },
        32: { paddingEnd: "hv4rvrfc", paddingStart: "dati1w0a" },
      },
      k = {
        4: { paddingBottom: "r8blr3vg", paddingTop: "jwdofwj8" },
        8: { paddingBottom: "e5nlhep0", paddingTop: "ecm0bbzt" },
        12: { paddingBottom: "iuny7tx3", paddingTop: "ipjc6fyt" },
        16: { paddingBottom: "sj5x9vvc", paddingTop: "cxgpxx05" },
        24: { paddingBottom: "f10w8fjw", paddingTop: "pybr56ya" },
        32: { paddingBottom: "ihqw7lf3", paddingTop: "discj3wi" },
      };
    function a(a, b) {
      var d;
      d = (d = i(c("CometRowContext"))) != null ? d : {};
      var e = d.spacingHorizontal;
      d = d.spacingVertical;
      var f = a.fallback,
        g = a.placeholder,
        m = babelHelpers.objectWithoutPropertiesLoose(a, [
          "fallback",
          "placeholder",
        ]);
      if (g !== void 0) {
        a.placeholder;
        var n = babelHelpers.objectWithoutPropertiesLoose(a, ["placeholder"]);
        return h.jsx(c("CometPlaceholder.react"), {
          fallback:
            g != null
              ? h.jsx(
                  l,
                  babelHelpers["extends"]({}, n, { ref: b, children: g })
                )
              : null,
          children: h.jsx(l, babelHelpers["extends"]({}, n, { ref: b })),
        });
      }
      if (f !== void 0) {
        a.fallback;
        var o = babelHelpers.objectWithoutPropertiesLoose(a, ["fallback"]);
        return f === null
          ? h.jsx(c("CometErrorBoundary.react"), {
              children: h.jsx(l, babelHelpers["extends"]({}, o, { ref: b })),
            })
          : h.jsx(c("CometErrorBoundary.react"), {
              fallback: function (a, c) {
                return h.jsx(
                  l,
                  babelHelpers["extends"]({}, o, {
                    ref: b,
                    children: typeof f === "function" ? f(a, c) : f,
                  })
                );
              },
              children: h.jsx(l, babelHelpers["extends"]({}, o, { ref: b })),
            });
      }
      return h.jsx(
        c("BaseRowItem.react"),
        babelHelpers["extends"]({}, m, {
          ref: b,
          useDeprecatedStyles: m.useDeprecatedStyles,
          xstyle: [j[e], k[d], m.xstyle],
          children: h.jsx(c("CometRowContext").Provider, {
            value: null,
            children: m.children,
          }),
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    var l = h.forwardRef(a);
    b = l;
    g["default"] = b;
  },
  98
);
