__d(
  "hero-tracing-placeholder",
  ["PromiseAnnotate", "react", "useLayoutEffect_SAFE_FOR_SSR", "useStable"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h = g || b("react"),
      i = function () {},
      j = {
        consumeBootload: i,
        hold: function () {
          return "";
        },
        logHeroRender: i,
        logMetadata: i,
        logPageletVC: i,
        logReactCommit: i,
        logReactPostCommit: i,
        logReactRender: i,
        pageletStack: [],
        registerPlaceholder: i,
        removePlaceholder: i,
        suspenseCallback: i,
        unhold: i,
      },
      k = h.createContext(j);
    i = Object.freeze({
      __proto__: null,
      DEFAULT_CONTEXT_VALUE: j,
      Context: k,
    });
    var l = h.createContext(null);
    function a(a) {
      var c = a.description,
        d = h.useContext(k),
        e = h.useContext(l);
      b("useLayoutEffect_SAFE_FOR_SSR")(
        function () {
          e != null && d.logHeroRender(e, c, d.pageletStack);
        },
        [c, d, e]
      );
      return null;
    }
    a.displayName = "HeroComponent";
    a = h.memo(a);
    var m = h.createContext({
      current: null,
    });
    function c(a) {
      var c = a.description,
        d = a.hold,
        e = h.useContext(k),
        f = h.useContext(l);
      b("useLayoutEffect_SAFE_FOR_SSR")(
        function () {
          if (d && f != null) {
            var a = e.hold(f, e.pageletStack, c);
            return function () {
              e.unhold(f, a);
            };
          }
        },
        [c, e, f, d]
      );
      return null;
    }
    c.displayName = "HeroHoldTrigger";
    function d(a) {
      var b = a.children;
      a = a.clear;
      a = a === void 0 ? !0 : a;
      var c = h.useContext(k);
      return h.createElement(
        k.Provider,
        {
          value: a === !1 ? c : j,
        },
        b
      );
    }
    d.displayName = "HeroInteractionContextPassthrough";
    var n = new Map();
    function e(a) {
      n.has(a) || n.set(a, new Map());
    }
    function o(a, b, c) {
      a = n.get(a);
      a && a.set(b, c);
    }
    function p(a) {
      a = n.get(a);
      var b = [];
      a &&
        a.forEach(function (a) {
          return b.push(a);
        });
      return b;
    }
    function q(a) {
      n["delete"](a);
    }
    function r(a, b) {
      a = n.get(a);
      a && a["delete"](b);
    }
    function s(a) {
      return n.has(a);
    }
    e = Object.freeze({
      __proto__: null,
      addInteraction: e,
      addPlaceholder: o,
      dump: p,
      removeInteraction: q,
      removePlaceholder: r,
      isInteractionActive: s,
    });
    function t(a) {
      var c = a.uuid,
        d = h.useContext(k),
        e = h.useContext(l);
      b("useLayoutEffect_SAFE_FOR_SSR")(
        function () {
          if (e != null) {
            d.registerPlaceholder(e, c, d.pageletStack);
            return function () {
              d.removePlaceholder(e, c);
            };
          }
        },
        [d, e, c]
      );
      return null;
    }
    t.displayName = "HeroFallbackTracker";
    var u = 0;
    function v() {
      return String(u++);
    }
    function w(a) {
      if (a != null && a.size > 0)
        return Array.from(a)
          .map(function (a) {
            a = b("PromiseAnnotate").getDisplayName(a);
            if (a != null) return a;
            else return "Promise";
          })
          .join(",");
      else return null;
    }
    o = Object.freeze({
      __proto__: null,
      getSimpleUUID: v,
      createThenableDescription: w,
    });
    p = function (a) {
      a = a.children;
      return a;
    };
    function x(a) {
      var c = a.cb,
        d = h.useRef(!1);
      b("useLayoutEffect_SAFE_FOR_SSR")(function () {
        d.current || (c(), (d.current = !0));
      });
      return null;
    }
    function y(a) {
      var c = a.children,
        d = a.enableCpuSuspense,
        e = a.fallback,
        f = a.name,
        g = a.unstable_avoidThisFallback,
        i = a.unstable_expectedLoadTime,
        j = a.unstable_onSuspense,
        m = h.useContext(k),
        n = h.useContext(l),
        o = b("useStable")(v),
        p = b("useStable")(v),
        q = h.useRef(!1);
      a = c;
      c = h.useCallback(
        function (a) {
          n != null && m.suspenseCallback(n, o, m.pageletStack, a, f);
          if (j) {
            a = (a = w(a)) !== null && a !== void 0 ? a : "";
            j(a);
          }
        },
        [m, n, f, o, j]
      );
      b("useLayoutEffect_SAFE_FOR_SSR")(
        function () {
          if (q.current === !1 && n != null && n != null) {
            m.hold(n, m.pageletStack, "Hydration", p, f);
            return function () {
              return m.unhold(n, p);
            };
          }
        },
        [m, n, f, p]
      );
      var r = function () {
        (q.current = !0), n != null && m.unhold(n, p);
      };
      return h.createElement(
        h.Suspense,
        {
          fallback: h.createElement(
            h.Fragment,
            null,
            e,
            h.createElement(x, {
              cb: r,
            }),
            h.createElement(t, {
              uuid: o,
            })
          ),
          suspenseCallback: c,
          unstable_avoidThisFallback: g,
          unstable_expectedLoadTime: d === !0 ? i : void 0,
        },
        h.createElement(x, {
          cb: r,
        }),
        a
      );
    }
    y.displayName = "HeroPlaceholder";
    f.HeroComponent = a;
    f.HeroCurrentInteractionForLoggingContext = m;
    f.HeroHoldTrigger = c;
    f.HeroInteractionContext = i;
    f.HeroInteractionContextPassthrough = d;
    f.HeroInteractionIDContext = l;
    f.HeroPendingPlaceholderTracker = e;
    f.HeroPlaceholder = y;
    f.HeroPlaceholderUtils = o;
  },
  null
);
