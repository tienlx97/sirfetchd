__d(
  "BaseRowItem.react",
  ["BaseRowContext", "BaseView.react", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react"),
      i = d("react").useContext,
      j = {
        expanding: {
          flexBasis: "rj1gh0hx",
          flexGrow: "buofh1pr",
          flexShrink: "g5gj957u",
        },
        expandingWithWrap: { flexBasis: "d8ncny3e" },
        item: {
          display: "j83agx80",
          flexDirection: "cbu4d94t",
          flexShrink: "pfnyh3mw",
          maxWidth: "d2edcug0",
          minWidth: "hpfvmrgz",
        },
        item_DEPRECATED: { maxWidth: "d2edcug0", minWidth: "hpfvmrgz" },
      },
      k = {
        1: { flexBasis: "d8ncny3e" },
        2: { flexBasis: "hkbzh7o3" },
        3: { flexBasis: "dz1kfvuc" },
        4: { flexBasis: "ftbm7790" },
        5: { flexBasis: "eot2utzp" },
        6: { flexBasis: "o16kv4ps" },
        7: { flexBasis: "lrnmdj7q" },
        8: { flexBasis: "joeu7ti0" },
        9: { flexBasis: "pz8kndp3" },
        10: { flexBasis: "t9lf192y" },
      },
      l = {
        bottom: { alignSelf: "c4hnarmi" },
        center: { alignSelf: "o8rfisnq" },
        stretch: { alignSelf: "ns4p8fja" },
        top: { alignSelf: "nqmvxvec" },
      };
    function a(a, b) {
      var d = a.expanding;
      d = d === void 0 ? !1 : d;
      var e = a.useDeprecatedStyles;
      e = e === void 0 ? !1 : e;
      var f = a.verticalAlign,
        g = a.xstyle;
      a = babelHelpers.objectWithoutPropertiesLoose(a, [
        "expanding",
        "useDeprecatedStyles",
        "verticalAlign",
        "xstyle",
      ]);
      var m = i(c("BaseRowContext")),
        n = m.columns;
      m = m.wrap;
      return h.jsx(
        c("BaseView.react"),
        babelHelpers["extends"]({}, a, {
          ref: b,
          xstyle: [
            e ? j.item_DEPRECATED : j.item,
            d && j.expanding,
            d && m !== "none" && j.expandingWithWrap,
            n > 0 && k[n],
            f != null && l[f],
            g,
          ],
        })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    b = h.forwardRef(a);
    g["default"] = b;
  },
  98
);
