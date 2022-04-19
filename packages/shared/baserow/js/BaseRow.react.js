__d(
  "BaseRow.react",
  ["BaseRowContext", "BaseView.react", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react"),
      i = d("react").useMemo,
      j = {
        expanding: {
          flexBasis: "rj1gh0hx",
          flexGrow: "buofh1pr",
          flexShrink: "g5gj957u",
          minWidth: "hpfvmrgz",
        },
        row: { display: "j83agx80", flexShrink: "pfnyh3mw" },
      },
      k = {
        center: { justifyContent: "taijpn5t" },
        end: { justifyContent: "bkfpd7mw" },
        justify: { justifyContent: "i1fnvgqd" },
        start: { justifyContent: "jifvfom9" },
      },
      l = {
        bottom: { alignItems: "aovydwv3" },
        center: { alignItems: "bp9cbjyn" },
        stretch: { alignItems: "gs1a9yip" },
        top: { alignItems: "ll8tlv6m" },
      },
      m = {
        backward: { flexDirection: "rl25f0pe" },
        forward: { flexDirection: "btwxx1t3" },
      },
      n = {
        backward: { flexWrap: "kbz25j0m" },
        forward: { flexWrap: "lhclo0ds" },
        none: { flexWrap: "owycx6da" },
      },
      o = { end: "start", start: "end" };
    function a(a, b) {
      var d = a.align;
      d = d === void 0 ? "justify" : d;
      var e = a.children,
        f = a.columns,
        g = f === void 0 ? 0 : f;
      f = a.direction;
      f = f === void 0 ? "forward" : f;
      var p = a.expanding;
      p = p === void 0 ? !1 : p;
      var q = a.verticalAlign;
      q = q === void 0 ? "stretch" : q;
      var r = a.wrap,
        s = r === void 0 ? "none" : r;
      r = a.xstyle;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "align",
        "children",
        "columns",
        "direction",
        "expanding",
        "verticalAlign",
        "wrap",
        "xstyle",
      ]);
      var t = i(
        function () {
          return { columns: g, wrap: s };
        },
        [g, s]
      );
      return h.jsx(
        c("BaseView.react"),
        babelHelpers["extends"]({}, a, {
          ref: b,
          xstyle: [
            j.row,
            p && j.expanding,
            k[f === "backward" && (d === "start" || d === "end") ? o[d] : d],
            l[q],
            n[s],
            m[f],
            r,
          ],
          children: h.jsx(c("BaseRowContext").Provider, {
            value: t,
            children: e,
          }),
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    b = h.forwardRef(a);
    g["default"] = b;
  },
  98
);
