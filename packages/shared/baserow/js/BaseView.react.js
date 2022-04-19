__d(
  "BaseView.react",
  ["LegacyHidden", "react", "stylex", "testID"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react"),
      i = {
        hidden: { display: "mkhogb32" },
        root: {
          boxSizing: "rq0escxv",
          position: "l9j0dhe7",
          zIndex: "du4w35lb",
        },
      };
    function a(a, b) {
      var d = a.children,
        e = a.suppressHydrationWarning,
        f = a.testid,
        g = a.xstyle;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "children",
        "suppressHydrationWarning",
        "testid",
        "xstyle",
      ]);
      var j = a.hidden === !0;
      return h.jsx(c("LegacyHidden"), {
        htmlAttributes: babelHelpers["extends"]({}, a, c("testID")(f), {
          className: c("stylex")(i.root, g, j && i.hidden),
        }),
        mode: j ? "hidden" : "visible",
        ref: b,
        suppressHydrationWarning: e,
        children: d,
      });
    }
    a.displayName = a.name + " [from " + f.id + "]";
    b = h.forwardRef(a);
    g["default"] = b;
  },
  98
);
