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
