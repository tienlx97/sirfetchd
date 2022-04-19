__d(
  "CometColumnItem.react",
  [
    "BaseView.react",
    "CometColumnContext",
    "CometErrorBoundary.react",
    "CometPlaceholder.react",
    "UserAgent",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react"),
      i = d("react").useContext,
      j = {
        divider: {
          borderTopColor: "qbxu24ho",
          borderTopStyle: "goun2846",
          borderTopWidth: "frvqaej8",
          ":first-child": { display: "jpp8pzdo" },
        },
        expanding: {
          flexBasis: "d8ncny3e",
          flexGrow: "buofh1pr",
          flexShrink: "g5gj957u",
          minHeight: "tgvbjcpo",
        },
        expandingIE11: { flexBasis: "mg4g778l" },
        root: {
          display: "j83agx80",
          flexDirection: "cbu4d94t",
          flexShrink: "pfnyh3mw",
          maxWidth: "d2edcug0",
        },
      },
      k = {
        center: { alignItems: "bp9cbjyn" },
        end: { alignItems: "aovydwv3" },
        start: { alignItems: "ll8tlv6m" },
      },
      l = {
        4: { paddingEnd: "ph5uu5jm", paddingStart: "b3onmgus" },
        8: { paddingEnd: "dflh9lhu", paddingStart: "scb9dxdr" },
        12: { paddingEnd: "d1544ag0", paddingStart: "tw6a2znq" },
        16: { paddingEnd: "hv4rvrfc", paddingStart: "dati1w0a" },
        20: { paddingEnd: "gl4o1x5y", paddingStart: "lt9micmv" },
      },
      m = {
        0: { paddingTop: "jb3vyjys" },
        4: { paddingTop: "ecm0bbzt" },
        8: { paddingTop: "cxgpxx05" },
        12: { paddingTop: "pybr56ya" },
        16: { paddingTop: "discj3wi" },
        20: { paddingTop: "aodizinl" },
      },
      n = {
        4: { paddingTop: "ecm0bbzt", paddingBottom: "e5nlhep0" },
        8: { paddingTop: "cxgpxx05", paddingBottom: "sj5x9vvc" },
        12: { paddingTop: "pybr56ya", paddingBottom: "f10w8fjw" },
        16: { paddingTop: "discj3wi", paddingBottom: "ihqw7lf3" },
        20: { paddingTop: "aodizinl", paddingBottom: "ofv0k9yr" },
      },
      o = {
        4: { marginTop: "rs0gx3tq", marginBottom: "dicw6rsg" },
        8: { marginTop: "aahdfvyu", marginBottom: "tvmbv18p" },
        12: { marginTop: "qjjbsfad", marginBottom: "w0hvl6rk" },
        16: { marginTop: "aov4n071", marginBottom: "bi6gxh9e" },
        20: { marginTop: "ku2m03ct", marginBottom: "oud54xpy" },
        24: { marginTop: "n1l5q3vz", marginBottom: "n851cfcs" },
        32: { marginTop: "tr9rh885", marginBottom: "sjgh65i0" },
        40: { marginTop: "jei6r52m", marginBottom: "sej5wr8e" },
      },
      p = {
        bottom: { justifyContent: "bkfpd7mw" },
        center: { justifyContent: "taijpn5t" },
        "space-between": { justifyContent: "i1fnvgqd" },
      },
      q = {
        4: { marginEnd: "cgat1ltu", marginStart: "kkf49tns" },
        8: { marginEnd: "oi9244e8", marginStart: "h676nmdw" },
        12: { marginEnd: "tvfksri0", marginStart: "ozuftl9m" },
        16: { marginEnd: "wkznzc2l", marginStart: "dhix69tm" },
        20: { marginEnd: "m8hsej2k", marginStart: "i0u1bx94" },
      },
      r = c("UserAgent").isBrowser("IE >= 11");
    function a(a, b) {
      var d, e, f, g;
      d = (d = i(c("CometColumnContext"))) != null ? d : {};
      var t = a.align;
      e = t === void 0 ? ((e = d.align) != null ? e : "stretch") : t;
      t = a.children;
      var u = a.expanding;
      u = u === void 0 ? !1 : u;
      var v = a.fallback,
        w = a.paddingHorizontal;
      f = w === void 0 ? ((f = d.paddingHorizontal) != null ? f : 0) : w;
      w = a.paddingTop;
      var x = a.paddingVertical;
      x = x === void 0 ? 0 : x;
      var y = a.placeholder,
        z = a.verticalAlign;
      z = z === void 0 ? "top" : z;
      var A = babelHelpers.objectWithoutPropertiesLoose(a, [
        "align",
        "children",
        "expanding",
        "fallback",
        "paddingHorizontal",
        "paddingTop",
        "paddingVertical",
        "placeholder",
        "verticalAlign",
      ]);
      g = h.jsxs(h.Fragment, {
        children: [
          d.hasDividers === !0 &&
            h.jsx(c("BaseView.react"), {
              role: "separator",
              xstyle: [j.divider, q[(g = d.paddingHorizontal) != null ? g : 0]],
            }),
          h.jsx(
            c("BaseView.react"),
            babelHelpers["extends"]({}, A, {
              ref: b,
              xstyle: [
                j.root,
                u && [j.expanding, r && j.expandingIE11],
                e !== "stretch" && k[e],
                z !== "top" && p[z],
                d.spacing != null && o[d.spacing],
                l[f],
                n[x],
                w != null && m[w],
                a.xstyle,
              ],
              children: h.jsx(c("CometColumnContext").Provider, {
                value: null,
                children: t,
              }),
            })
          ),
        ],
      });
      if (v !== void 0) {
        a.fallback;
        var B = babelHelpers.objectWithoutPropertiesLoose(a, ["fallback"]);
        v === null
          ? (g = h.jsx(c("CometErrorBoundary.react"), { children: g }))
          : (g = h.jsx(c("CometErrorBoundary.react"), {
              fallback: function (a, c) {
                return h.jsx(
                  s,
                  babelHelpers["extends"]({}, B, {
                    ref: b,
                    children: typeof v === "function" ? v(a, c) : v,
                  })
                );
              },
              children: g,
            }));
      }
      if (y !== void 0) {
        a.placeholder;
        A = babelHelpers.objectWithoutPropertiesLoose(a, ["placeholder"]);
        g = h.jsx(c("CometPlaceholder.react"), {
          fallback:
            y != null
              ? h.jsx(
                  s,
                  babelHelpers["extends"]({}, A, { ref: b, children: y })
                )
              : null,
          children: g,
        });
      }
      return g;
    }
    a.displayName = a.name + " [from " + f.id + "]";
    var s = h.forwardRef(a);
    b = s;
    g["default"] = b;
  },
  98
);
