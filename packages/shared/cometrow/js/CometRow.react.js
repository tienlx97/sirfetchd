__d(
  "CometRow.react",
  [
    "BaseRow.react",
    "CometColumnContext",
    "CometColumnItem.react",
    "CometRowContext",
    "CometRowItem.react",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react");
    b = d("react");
    var i = b.useContext,
      j = b.useMemo,
      k = {
        4: { paddingEnd: "ph5uu5jm", paddingStart: "b3onmgus" },
        8: { paddingEnd: "dflh9lhu", paddingStart: "scb9dxdr" },
        12: { paddingEnd: "d1544ag0", paddingStart: "tw6a2znq" },
        16: { paddingEnd: "hv4rvrfc", paddingStart: "dati1w0a" },
      },
      l = {
        0: { paddingTop: "jb3vyjys" },
        4: { paddingTop: "ecm0bbzt" },
        8: { paddingTop: "cxgpxx05" },
        12: { paddingTop: "pybr56ya" },
        16: { paddingTop: "discj3wi" },
      },
      m = {
        4: { paddingBottom: "e5nlhep0", paddingTop: "ecm0bbzt" },
        8: { paddingBottom: "sj5x9vvc", paddingTop: "cxgpxx05" },
        12: { paddingBottom: "f10w8fjw", paddingTop: "pybr56ya" },
        16: { paddingBottom: "ihqw7lf3", paddingTop: "discj3wi" },
      },
      n = {
        4: { marginEnd: "nkwizq5d", marginStart: "roh60bw9" },
        8: { marginEnd: "dlv3wnog", marginStart: "rl04r1d5" },
        12: { marginEnd: "b5q2rw42", marginStart: "lq239pai" },
        16: { marginEnd: "o22cckgh", marginStart: "fop5sh7t" },
        24: { marginEnd: "a9txdygg", marginStart: "fnu23jab" },
        32: { marginEnd: "tmqn73lw", marginStart: "ocgrx2df" },
      },
      o = {
        4: { marginBottom: "scwd0bx6", marginTop: "hop8lmos" },
        8: { marginBottom: "enqfppq2", marginTop: "muag1w35" },
        12: { marginBottom: "mysgfdmx", marginTop: "hddg9phg" },
        16: { marginBottom: "obtkqiv7", marginTop: "sv5sfqaa" },
        24: { marginBottom: "fi9g468h", marginTop: "gy6hb44f" },
        32: { marginBottom: "b20td4e0", marginTop: "rtmu0sqt" },
      };
    function a(a, b) {
      var d = i(c("CometColumnContext")),
        e = i(c("CometRowContext")),
        f = (d == null ? void 0 : d.paddingHorizontal) != null ? 0 : 12,
        g = (d == null ? void 0 : d.spacing) != null ? 0 : 16,
        p = a.children,
        q = a.paddingHorizontal;
      f = q === void 0 ? f : q;
      q = a.paddingVertical;
      q = q === void 0 ? 0 : q;
      var r = a.paddingTop;
      g = r === void 0 ? (a.paddingVertical == null ? g : null) : r;
      r = a.spacing;
      r = r === void 0 ? 12 : r;
      var s = a.spacingHorizontal,
        t = s === void 0 ? r : s;
      s = a.spacingVertical;
      var u = s === void 0 ? r : s;
      r = a.xstyle;
      s = babelHelpers.objectWithoutPropertiesLoose(a, [
        "children",
        "paddingHorizontal",
        "paddingVertical",
        "paddingTop",
        "spacing",
        "spacingHorizontal",
        "spacingVertical",
        "xstyle",
      ]);
      a = j(
        function () {
          return { spacingHorizontal: t, spacingVertical: u };
        },
        [t, u]
      );
      b = h.jsx(
        c("BaseRow.react"),
        babelHelpers["extends"]({}, s, {
          ref: b,
          xstyle: [k[f], m[q], g != null && l[g], n[t], o[u], r],
          children: h.jsx(c("CometRowContext").Provider, {
            value: a,
            children: p,
          }),
        })
      );
      if (e != null)
        return h.jsx(c("CometRowItem.react"), {
          expanding: s.expanding,
          children: b,
        });
      return d != null
        ? h.jsx(c("CometColumnItem.react"), {
            expanding: s.expanding,
            children: b,
          })
        : b;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    e = h.forwardRef(a);
    d = e;
    g["default"] = d;
  },
  98
);
