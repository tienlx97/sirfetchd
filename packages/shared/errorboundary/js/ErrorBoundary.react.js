__d(
  "ErrorBoundary.react",
  [
    "ErrorPubSub",
    "ErrorSerializer",
    "cr:1645510",
    "getErrorSafe",
    "getReactElementDisplayName",
    "react",
  ],
  function (a, b, c, d, e, f, g) {
    "use strict";
    var h = d("react");
    a = (function (a) {
      babelHelpers.inheritsLoose(d, a);
      function d() {
        var b, c;
        for (var d = arguments.length, e = new Array(d), f = 0; f < d; f++)
          e[f] = arguments[f];
        return (
          ((b = c = a.call.apply(a, [this].concat(e)) || this),
          (c.suppressReactDefaultErrorLogging = !0),
          (c.state = { error: null, moduleName: i(c.props.children) }),
          b) || babelHelpers.assertThisInitialized(c)
        );
      }
      d.getDerivedStateFromError = function (a) {
        return { error: c("getErrorSafe")(a) };
      };
      var e = d.prototype;
      e.componentDidCatch = function (a, b) {
        a = b.componentStack;
        b = this.props;
        var d = b.context;
        d = d === void 0 ? {} : d;
        var e = b.description;
        e = e === void 0 ? "base" : e;
        b = b.onError;
        d.messageFormat == null &&
          ((d.messageFormat = "caught error in module %s (%s)"),
          (d.messageParams = [this.state.moduleName, e]));
        e = this.state;
        var f = e.error;
        e = e.moduleName;
        f != null &&
          (c("ErrorSerializer").aggregateError(
            f,
            babelHelpers["extends"](
              { componentStack: a, loggingSource: "ERROR_BOUNDARY" },
              d
            )
          ),
          c("ErrorPubSub").reportError(f),
          typeof b === "function" && b(f, e));
      };
      e.componentDidUpdate = function (a) {
        if (
          this.state.error &&
          this.props.forceResetErrorCount != null &&
          this.props.forceResetErrorCount != a.forceResetErrorCount
        ) {
          this.setState({ error: null });
          return;
        }
      };
      e.render = function () {
        var a = this.state,
          c = a.error;
        a = a.moduleName;
        if (c) {
          var d = this.props.fallback;
          return d != null ? d(c, a) : null;
        }
        return b("cr:1645510") != null
          ? h.jsxs(h.Fragment, {
              children: [h.jsx(b("cr:1645510"), {}), this.props.children],
            })
          : (d = this.props.children) != null
          ? d
          : null;
      };
      return d;
    })(h.Component);
    a.defaultProps = { forceResetErrorCount: 0 };
    function i(a) {
      a = h.Children.count(a) > 1 ? h.Children.toArray(a)[0] : a;
      return c("getReactElementDisplayName")(a);
    }
    g["default"] = a;
  },
  98
);
