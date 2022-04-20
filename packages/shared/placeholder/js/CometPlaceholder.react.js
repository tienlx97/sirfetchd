__d(
  "CometPlaceholder.react",
  ["react", "useCometPlaceholderImpl"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    d("react");
    function a(a) {
      return c("useCometPlaceholderImpl")(a);
    }
    a.displayName = a.name + " [from " + f.id + "]";
    g["default"] = a;
  },
  98
);

__d(
  "useCometPlaceholderImpl",
  [
    "CometSSRHydrationMarkerUtils", //
    "CometSuspenseHUD.react", //
    "ExecutionEnvironment",
    "gkx",
    "hero-tracing-placeholder",
    "react",
    "requireDeferred",
    "useLayoutEffect_SAFE_FOR_SSR",
    "useStable",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react");
    e = d("react");
    var i = e.useCallback,
      j = e.useRef,
      k = c("requireDeferred")("CometSuspenseFalcoEvent").__setRef(
        "useCometPlaceholderImpl"
      ),
      l = 5;
    function m(a) {
      var b = a.cb,
        d = j(!1);
      c("useLayoutEffect_SAFE_FOR_SSR")(function () {
        d.current || (b(), (d.current = !0));
      });
      return null;
    }
    function b(b) {
      var e = b.children,
        f = b.fallback,
        g = b.name,
        n = b.unstable_avoidThisFallback,
        o = b.unstable_expectedLoadTime,
        p = b.unstable_onSuspense,
        q = c("useStable")(function () {
          return c("CometSuspenseHUD.react") &&
            d("ExecutionEnvironment").canUseDOM
            ? a.document.createElement("div")
            : null;
        }),
        r = j(0),
        s = j(null),
        t = j(!1);
      b = e;
      e = f;
      d("CometSSRHydrationMarkerUtils").addMarkersToChildren != null &&
        d("CometSSRHydrationMarkerUtils").addMarkersToFallback != null &&
        ((b = d("CometSSRHydrationMarkerUtils").addMarkersToChildren(b)),
        (e = d("CometSSRHydrationMarkerUtils").addMarkersToFallback(e)));
      f = i(
        function (a) {
          q != null && (q.textContent = a), (s.current = a), p && p(a);
        },
        [q, p]
      );
      var u = null;
      q != null &&
        c("CometSuspenseHUD.react") != null &&
        (u = h.jsx(c("CometSuspenseHUD.react"), {
          desc: q,
        }));
      var v = i(
          function () {
            (r.current += 1),
              c("gkx")("1863055") &&
                t.current &&
                r.current <= l &&
                k.onReady(function (a) {
                  a.log(function () {
                    return {
                      event: "unexpected_suspense",
                      is_backup_placeholder: n === !0,
                      placeholder_name: g,
                      promise_name: s.current,
                      suspense_count: String(r.current),
                    };
                  });
                });
          },
          [g, n]
        ),
        w = i(function () {
          t.current = !0;
        }, []);
      return h.jsxs(d("hero-tracing-placeholder").HeroPlaceholder, {
        enableCpuSuspense: c("gkx")("1748426"),
        fallback: h.jsxs(h.Fragment, {
          children: [
            e,
            h.jsx(m, {
              cb: v,
            }),
            u,
          ],
        }),
        name: g,
        unstable_avoidThisFallback: n,
        unstable_expectedLoadTime: o,
        unstable_onSuspense: f,
        children: [
          h.jsx(m, {
            cb: w,
          }),
          b,
        ],
      });
    }
    b.displayName = b.name + " [from " + f.id + "]";
    g["default"] = b;
  },
  98
);
