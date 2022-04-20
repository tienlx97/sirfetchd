__d(
  "gkx",
  ["invariant", "BanzaiLazyQueue", "ExecutionEnvironment", "emptyFunction"],
  function (a, b, c, d, e, f, g, h) {
    "use strict";
    var i = {},
      j = {};
    function k(a) {
      var b = i[a];
      b != null || h(0, 11797, a);
      j[a] ||
        ((j[a] = !0),
        (d("ExecutionEnvironment").canUseDOM ||
          d("ExecutionEnvironment").isInWorker) &&
          d("BanzaiLazyQueue").queuePost("gk2_exposure", {
            identifier: a,
            hash: b.hash,
          }));
      return b.result;
    }
    k.add = function (a, b) {
      for (var c in a)
        b && b.entry++, !(c in i) ? (i[c] = a[c]) : b && b.dup_entry++;
    };
    k.addLoggedInternal = function (a) {
      k.add(a);
      for (var a in a) j[a] = !0;
    };
    a = c("emptyFunction");
    k.getGKs = function () {
      return null;
    };
    k.getLogged = function () {
      return Object.keys(j).map(function (a) {
        return {
          identifier: a,
          hash: i[a].hash,
        };
      });
    };
    k.setPass = a;
    k.setFail = a;
    k.clear = a;
    b = k;
    g["default"] = b;
  },
  98
);

__d(
  "SimpleHook",
  [],
  function (a, b, c, d, e, f) {
    "use strict";
    a = (function () {
      function a() {
        (this.__callbacks = []), (this.call = this.$2);
      }
      var b = a.prototype;
      b.hasCallback = function (a) {
        var b = this.__callbacks;
        return (
          b.length > 0 &&
          (a == null ||
            b.some(function (b) {
              return b === a || b.$1 === a;
            }))
        );
      };
      b.add = function (a, b) {
        var c = this,
          d;
        if ((b == null ? void 0 : b.once) === !0) {
          b = function () {
            c.remove(d), a.apply(null, arguments);
          };
          b.$1 = a;
          d = b;
        } else d = a;
        this.__callbacks.push(d);
        return d;
      };
      b.removeLast = function () {
        return this.__callbacks.pop();
      };
      b.remove = function (a) {
        return this.removeIf(function (b) {
          return b === a;
        });
      };
      b.removeIf = function (a) {
        var b = this.__callbacks;
        this.__callbacks = b.filter(function (b) {
          return !a(b);
        });
        return b.length > this.__callbacks.length;
      };
      b.clear = function () {
        this.__callbacks = [];
      };
      b.$2 = function () {
        var a = this.__callbacks;
        for (var b = 0, c = a.length; b < c; ++b) {
          var d = a[b];
          d.apply(null, arguments);
        }
      };
      return a;
    })();
    f.SimpleHook = a;
  },
  66
);
__d(
  "BanzaiLazyQueue",
  ["SimpleHook"],
  function (a, b, c, d, e, f, g) {
    var h = [],
      i = new (d("SimpleHook").SimpleHook)();
    a = {
      onQueue: i,
      queuePost: function (a, b, c) {
        h.push([a, b, c]), i.call(a, b, c);
      },
      flushQueue: function () {
        var a = h;
        h = [];
        return a;
      },
    };
    f.exports = a;
  },
  34
);

__d(
  "emptyFunction",
  [],
  function (a, b, c, d, e, f) {
    function a(a) {
      return function () {
        return a;
      };
    }
    b = function () {};
    b.thatReturns = a;
    b.thatReturnsFalse = a(!1);
    b.thatReturnsTrue = a(!0);
    b.thatReturnsNull = a(null);
    b.thatReturnsThis = function () {
      return this;
    };
    b.thatReturnsArgument = function (a) {
      return a;
    };
    c = b;
    f["default"] = c;
  },
  66
);
