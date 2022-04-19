__d(
  "CometErrorBoundary.react",
  [
    "CometHeroInteractionContext",
    "ErrorBoundary.react",
    "ErrorMetadata",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react");
    b = d("react");
    e = b.forwardRef;
    var i = b.useContext;
    function a(a, b) {
      var d,
        e = i(c("CometHeroInteractionContext").Context);
      e = e.pageletStack;
      a = babelHelpers["extends"]({}, a);
      a.context = a.context || {};
      d =
        ((d = a.context) == null ? void 0 : d.metadata) ||
        new (c("ErrorMetadata"))();
      e != null &&
        d.addEntries(["COMET_INFRA", "INTERACTION_PAGELET_STACK", e.join(",")]);
      a.context.metadata = d;
      return h.jsx(
        c("ErrorBoundary.react"),
        babelHelpers["extends"]({}, a, { fallback: a.fallback, ref: b })
      );
    }
    a.displayName = a.name + " [from " + f.id + "]";
    d = e(a);
    g["default"] = d;
  },
  98
);
