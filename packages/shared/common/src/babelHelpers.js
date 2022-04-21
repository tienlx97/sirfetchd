(function (a) {
  var b = (a.babelHelpers = {}),
    c = Object.prototype.hasOwnProperty;
  typeof Symbol !== "undefined" &&
    !(typeof Symbol === "function"
      ? Symbol.asyncIterator
      : "@@asyncIterator") &&
    (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"));
  function d(a) {
    this.wrapped = a;
  }
  function e(a) {
    var b, c;
    function e(a, d) {
      return new Promise(function (e, g) {
        e = {
          key: a,
          arg: d,
          resolve: e,
          reject: g,
          next: null,
        };
        c ? (c = c.next = e) : ((b = c = e), f(a, d));
      });
    }
    function f(b, c) {
      try {
        var e = a[b](c);
        c = e.value;
        var h = c instanceof d;
        Promise.resolve(h ? c.wrapped : c).then(
          function (a) {
            if (h) {
              f(b === "return" ? "return" : "next", a);
              return;
            }
            g(e.done ? "return" : "normal", a);
          },
          function (a) {
            f("throw", a);
          }
        );
      } catch (a) {
        g("throw", a);
      }
    }
    function g(a, d) {
      switch (a) {
        case "return":
          b.resolve({
            value: d,
            done: !0,
          });
          break;
        case "throw":
          b.reject(d);
          break;
        default:
          b.resolve({
            value: d,
            done: !1,
          });
          break;
      }
      b = b.next;
      b ? f(b.key, b.arg) : (c = null);
    }
    this._invoke = e;
    typeof a["return"] !== "function" && (this["return"] = void 0);
  }
  typeof Symbol === "function" &&
    (typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator") &&
    (e.prototype[
      typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator"
    ] = function () {
      return this;
    });
  e.prototype.next = function (a) {
    return this._invoke("next", a);
  };
  e.prototype["throw"] = function (a) {
    return this._invoke("throw", a);
  };
  e.prototype["return"] = function (a) {
    return this._invoke("return", a);
  };
  b.inheritsLoose = function (a, b) {
    Object.assign(a, b);
    a.prototype = Object.create(b && b.prototype);
    a.prototype.constructor = a;
    a.__superConstructor__ = b;
    return b;
  };
  b.wrapNativeSuper = function (a) {
    var c = typeof Map === "function" ? new Map() : void 0;
    b.wrapNativeSuper = function (a) {
      if (a === null) return null;
      if (typeof a !== "function")
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (c !== void 0) {
        if (c.has(a)) return c.get(a);
        c.set(a, d);
      }
      b.inheritsLoose(d, a);
      function d() {
        a.apply(this, arguments);
      }
      return d;
    };
    return b.wrapNativeSuper(a);
  };
  b.assertThisInitialized = function (a) {
    if (a === void 0)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return a;
  };
  b._extends = Object.assign;
  b["extends"] = b._extends;
  b.construct = function (a, b) {
    return new (Function.prototype.bind.apply(a, [null].concat(b)))();
  };
  b.objectWithoutPropertiesLoose = function (a, b) {
    var d = {};
    for (var e in a) {
      if (!c.call(a, e) || b.indexOf(e) >= 0) continue;
      d[e] = a[e];
    }
    return d;
  };
  b.taggedTemplateLiteralLoose = function (a, b) {
    b || (b = a.slice(0));
    a.raw = b;
    return a;
  };
  b.bind = Function.prototype.bind;
  b.wrapAsyncGenerator = function (a) {
    return function () {
      return new e(a.apply(this, arguments));
    };
  };
  b.awaitAsyncGenerator = function (a) {
    return new d(a);
  };
  b.asyncIterator = function (a) {
    var b;
    if (typeof Symbol !== "undefined") {
      if (
        typeof Symbol === "function" ? Symbol.asyncIterator : "@@asyncIterator"
      ) {
        b = a[Symbol.asyncIterator];
        if (b != null) return b.call(a);
      }
      if (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") {
        b = a[Symbol.iterator];
        if (b != null) return b.call(a);
      }
    }
    throw new TypeError("Object is not async iterable");
  };
  b.asyncGeneratorDelegate = function (a, b) {
    var c = {},
      d = !1;
    function e(c, e) {
      d = !0;
      e = new Promise(function (b) {
        b(a[c](e));
      });
      return {
        done: !1,
        value: b(e),
      };
    }
    typeof Symbol === "function" &&
      (typeof Symbol === "function" ? Symbol.iterator : "@@iterator") &&
      (c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"] =
        function () {
          return this;
        });
    c.next = function (a) {
      if (d) {
        d = !1;
        return a;
      }
      return e("next", a);
    };
    typeof a["throw"] === "function" &&
      (c["throw"] = function (a) {
        if (d) {
          d = !1;
          throw a;
        }
        return e("throw", a);
      });
    typeof a["return"] === "function" &&
      (c["return"] = function (a) {
        if (d) {
          d = !1;
          return a;
        }
        return e("return", a);
      });
    return c;
  };
})(typeof global === "undefined" ? self : global);
