__d(
  "fb-error",
  ["performanceNow", "removeFromArray"],
  function (a, b, c, d, e, f) {
    "use strict";
    var g,
      h = {
        PREVIOUS_FILE: 1,
        PREVIOUS_FRAME: 2,
        PREVIOUS_DIR: 3,
        FORCED_KEY: 4,
      };
    function i(b) {
      var a = new Error(b);
      if (a.stack === void 0)
        try {
          throw a;
        } catch (a) {}
      a.messageFormat = b;
      for (
        var c = arguments.length, d = new Array(c > 1 ? c - 1 : 0), e = 1;
        e < c;
        e++
      )
        d[e - 1] = arguments[e];
      a.messageParams = d.map(function (a) {
        return String(a);
      });
      a.taalOpcodes = [h.PREVIOUS_FRAME];
      return a;
    }
    var j = !1,
      k = {
        errorListener: function (b) {
          var c = a.console,
            d = c[b.type] ? b.type : "error";
          if (b.type === "fatal" || (d === "error" && !j)) {
            d = b.message;
            c.error(
              "ErrorUtils caught an error:\n\n" +
                d +
                "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs."
            );
            j = !0;
          }
        },
      },
      l = {
        access_token: null,
      },
      m = 6,
      n = 6e4,
      o = 10 * n,
      p = new Map(),
      q = 0;
    function r() {
      var a = (g || (g = b("performanceNow")))();
      if (a > q + n) {
        var c = a - o;
        for (
          var d = p,
            e = Array.isArray(d),
            f = 0,
            d = e
              ? d
              : d[
                  typeof Symbol === "function" ? Symbol.iterator : "@@iterator"
                ]();
          ;

        ) {
          var h;
          if (e) {
            if (f >= d.length) break;
            h = d[f++];
          } else {
            f = d.next();
            if (f.done) break;
            h = f.value;
          }
          h = h;
          var i = h[0];
          h = h[1];
          h.lastAccessed < c && p["delete"](i);
        }
        q = a;
      }
    }
    function s(a) {
      r();
      var c = (g || (g = b("performanceNow")))(),
        d = p.get(a);
      if (d == null) {
        p.set(a, {
          dropped: 0,
          logged: [c],
          lastAccessed: c,
        });
        return 1;
      }
      a = d.dropped;
      var e = d.logged;
      d.lastAccessed = c;
      while (e[0] < c - n) e.shift();
      if (e.length < m) {
        d.dropped = 0;
        e.push(c);
        return a + 1;
      } else {
        d.dropped++;
        return null;
      }
    }
    var t = {
        shouldLog: function (a) {
          return s(a.hash);
        },
      },
      u = "RE_EXN_ID";
    function v(a) {
      var b = null;
      a == null || typeof a !== "object"
        ? (b = i("Non-object thrown: %s", String(a)))
        : Object.prototype.hasOwnProperty.call(a, u)
        ? (b = i("Rescript exception thrown: %s", JSON.stringify(a)))
        : typeof a.message !== "string"
        ? (b = i(
            "Non-error thrown: %s, keys: %s",
            String(a),
            JSON.stringify(Object.keys(a).sort())
          ))
        : Object.isExtensible &&
          !Object.isExtensible(a) &&
          (b = i("Non-extensible thrown: %s", String(a.message)));
      if (b != null) {
        b.taalOpcodes = b.taalOpcodes || [];
        b.taalOpcodes.push(h.PREVIOUS_FRAME);
        return b;
      }
      return a;
    }
    var aa =
        typeof window === "undefined" ? "<self.onerror>" : "<window.onerror>",
      w;
    function ba(a) {
      var b = a.error != null ? v(a.error) : i(a.message || "");
      b.fileName == null && a.filename != null && (b.fileName = a.filename);
      b.line == null && a.lineno != null && (b.line = a.lineno);
      b.column == null && a.colno != null && (b.column = a.colno);
      b.guardList = [aa];
      b.loggingSource = "ONERROR";
      (a = w) === null || a === void 0 ? void 0 : a.reportError(b);
    }
    var x = {
        setup: function (b) {
          if (typeof a.addEventListener !== "function") return;
          if (w != null) return;
          w = b;
          a.addEventListener("error", ba);
        },
      },
      y = [],
      z = {
        pushGuard: function (a) {
          y.unshift(a);
        },
        popGuard: function () {
          y.shift();
        },
        inGuard: function () {
          return y.length !== 0;
        },
        cloneGuardList: function () {
          return y.map(function (a) {
            return a.name;
          });
        },
        findDeferredSource: function () {
          for (var a = 0; a < y.length; a++) {
            var b = y[a];
            if (b.deferredSource != null) return b.deferredSource;
          }
        },
      };
    function ca(a) {
      if (a.type != null) return a.type;
      if (a.loggingSource == "GUARDED" || a.loggingSource == "ERROR_BOUNDARY")
        return "fatal";
      if (a.name == "SyntaxError") return "fatal";
      if (
        a.loggingSource == "ONERROR" &&
        a.message.indexOf("ResizeObserver loop") >= 0
      )
        return "warn";
      return a.stack != null && a.stack.indexOf("chrome-extension://") >= 0
        ? "warn"
        : "error";
    }
    var A = [],
      B = (function () {
        function a() {
          this.metadata = [].concat(A);
        }
        var b = a.prototype;
        b.addEntries = function () {
          var a;
          (a = this.metadata).push.apply(a, arguments);
          return this;
        };
        b.addEntry = function (a, b, c) {
          this.metadata.push([a, b, c]);
          return this;
        };
        b.isEmpty = function () {
          return this.metadata.length === 0;
        };
        b.clearEntries = function () {
          this.metadata = [];
        };
        b.format = function () {
          var a = [];
          this.metadata.forEach(function (b) {
            if (b && b.length) {
              b = b
                .map(function (a) {
                  return a != null ? String(a).replace(/:/g, "_") : "";
                })
                .join(":");
              a.push(b);
            }
          });
          return a;
        };
        b.getAll = function () {
          return this.metadata;
        };
        a.addGlobalMetadata = function (a, b, c) {
          A.push([a, b, c]);
        };
        a.getGlobalMetadata = function () {
          return A;
        };
        a.unsetGlobalMetadata = function (a, b) {
          A = A.filter(function (c) {
            return !(Array.isArray(c) && c[0] === a && c[1] === b);
          });
        };
        return a;
      })(),
      C = {
        debug: 1,
        info: 2,
        warn: 3,
        error: 4,
        fatal: 5,
      };
    function c(a, b) {
      if (Object.isFrozen(a)) return;
      b.type && (!a.type || C[a.type] > C[b.type]) && (a.type = b.type);
      var c = b.metadata;
      if (c != null) {
        var d;
        d = (d = a.metadata) !== null && d !== void 0 ? d : new B();
        c != null && d.addEntries.apply(d, c.getAll());
        a.metadata = d;
      }
      b.project != null && (a.project = b.project);
      b.errorName != null && (a.errorName = b.errorName);
      b.componentStack != null && (a.componentStack = b.componentStack);
      b.deferredSource != null && (a.deferredSource = b.deferredSource);
      b.blameModule != null && (a.blameModule = b.blameModule);
      b.loggingSource != null && (a.loggingSource = b.loggingSource);
      d = (c = a.messageFormat) !== null && c !== void 0 ? c : a.message;
      c = (c = a.messageParams) !== null && c !== void 0 ? c : [];
      if (d !== b.messageFormat && b.messageFormat != null) {
        var e;
        d += " [Caught in: " + b.messageFormat + "]";
        c.push.apply(
          c,
          (e = b.messageParams) !== null && e !== void 0 ? e : []
        );
      }
      a.messageFormat = d;
      a.messageParams = c;
      e = b.forcedKey;
      d = a.forcedKey;
      c =
        e != null && d != null
          ? e + "_" + d
          : e !== null && e !== void 0
          ? e
          : d;
      a.forcedKey = c;
    }
    function d(a) {
      var b;
      return da(
        (b = a.messageFormat) !== null && b !== void 0 ? b : a.message,
        a.messageParams || []
      );
    }
    function da(a, b) {
      var c = 0;
      a = a.replace(/%s/g, function () {
        return c < b.length ? b[c++] : "NOPARAM";
      });
      c < b.length && (a += " PARAMS" + JSON.stringify(b.slice(c)));
      return a;
    }
    function f(a) {
      return (a !== null && a !== void 0 ? a : []).map(function (a) {
        return String(a);
      });
    }
    var D = {
        aggregateError: c,
        toReadableMessage: d,
        toStringParams: f,
      },
      ea = 5,
      E = [];
    function F(a) {
      E.push(a), E.length > ea && E.shift();
    }
    function G(a) {
      var b = a.getAllResponseHeaders();
      if (b != null && b.indexOf("X-FB-Debug") >= 0) {
        b = a.getResponseHeader("X-FB-Debug");
        b && F(b);
      }
    }
    function fa() {
      return E;
    }
    var H = {
        add: F,
        addFromXHR: G,
        getAll: fa,
      },
      ga = "abcdefghijklmnopqrstuvwxyz012345";
    function I() {
      var a = 0;
      for (var b = arguments.length, c = new Array(b), d = 0; d < b; d++)
        c[d] = arguments[d];
      for (var e = 0; e < c.length; e++) {
        var f = c[e];
        if (f != null) {
          var g = f.length;
          for (var h = 0; h < g; h++) a = (a << 5) - a + f.charCodeAt(h);
        }
      }
      var i = "";
      for (var j = 0; j < 6; j++) (i = ga.charAt(a & 31) + i), (a >>= 5);
      return i;
    }
    var J = [
        /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
        /@([^\s\)\()]+):(\d+):(\d+)$/,
        /^([^\s\)\()]+):(\d+):(\d+)$/,
        /^at ([^\s\)\()]+):(\d+):(\d+)$/,
      ],
      ha = /^\w+:\s.*?\n/g;
    Error.stackTraceLimit != null &&
      Error.stackTraceLimit < 80 &&
      (Error.stackTraceLimit = 80);
    function ia(a) {
      var b = a.name,
        c = a.message;
      a = a.stack;
      if (a == null) return null;
      if (b != null && c != null && c !== "") {
        var d = b + ": " + c + "\n";
        if (a.startsWith(d)) return a.substr(d.length);
        if (a === b + ": " + c) return null;
      }
      if (b != null) {
        d = b + "\n";
        if (a.startsWith(d)) return a.substr(d.length);
      }
      if (c != null && c !== "") {
        b = ": " + c + "\n";
        d = a.indexOf(b);
        c = a.substring(0, d);
        if (/^\w+$/.test(c)) return a.substring(d + b.length);
      }
      return a.replace(ha, "");
    }
    function K(a) {
      a = a.trim();
      var b;
      a;
      var c, d, e;
      if (a.includes("charset=utf-8;base64,")) b = "<inlined-file>";
      else {
        var f;
        for (var g = 0; g < J.length; g++) {
          var h = J[g];
          f = a.match(h);
          if (f != null) break;
        }
        f != null && f.length === 4
          ? ((c = f[1]),
            (d = parseInt(f[2], 10)),
            (e = parseInt(f[3], 10)),
            (b = a.substring(0, a.length - f[0].length)))
          : (b = a);
        b = b.replace(/^at /, "").trim();
      }
      h = {
        identifier: b,
        script: c,
        line: d,
        column: e,
      };
      h.text = L(h);
      return h;
    }
    function ja(a) {
      return a == null || a === "" ? [] : a.split(/\n\n/)[0].split("\n").map(K);
    }
    function ka(a) {
      a = ia(a);
      return ja(a);
    }
    function la(a) {
      if (a == null || a === "") return null;
      a = a.split("\n");
      a.splice(0, 1);
      return a.map(function (a) {
        return a.trim();
      });
    }
    function L(a) {
      var b = a.identifier,
        c = a.script,
        d = a.line;
      a = a.column;
      b = "    at " + (b !== null && b !== void 0 ? b : "<unknown>");
      c != null &&
        d != null &&
        a != null &&
        (b += " (" + c + ":" + d + ":" + a + ")");
      return b;
    }
    function M(c) {
      var d,
        e,
        f,
        i,
        j,
        k,
        l = ka(c);
      d = (d = c.taalOpcodes) !== null && d !== void 0 ? d : [];
      var m = c.framesToPop;
      if (m != null) {
        m = Math.min(m, l.length);
        while (m-- > 0) d.unshift(h.PREVIOUS_FRAME);
      }
      m = (m = c.messageFormat) !== null && m !== void 0 ? m : c.message;
      e = ((e = c.messageParams) !== null && e !== void 0 ? e : []).map(
        function (a) {
          return String(a);
        }
      );
      var n = la(c.componentStack),
        o = n == null ? null : n.map(K),
        p = c.metadata ? c.metadata.format() : new B().format();
      p.length === 0 && (p = void 0);
      var q = l
        .map(function (a) {
          return a.text;
        })
        .join("\n");
      f = (f = c.errorName) !== null && f !== void 0 ? f : c.name;
      var r = ca(c),
        s = c.loggingSource,
        t = c.project;
      i = (i = c.lineNumber) !== null && i !== void 0 ? i : c.line;
      j = (j = c.columnNumber) !== null && j !== void 0 ? j : c.column;
      k = (k = c.fileName) !== null && k !== void 0 ? k : c.sourceURL;
      var u = l.length > 0;
      u && i == null && (i = l[0].line);
      u && j == null && (j = l[0].column);
      u && k == null && (k = l[0].script);
      o = {
        blameModule: c.blameModule,
        column: j == null ? null : String(j),
        clientTime: Math.floor(Date.now() / 1e3),
        componentStackFrames: o,
        deferredSource: c.deferredSource != null ? M(c.deferredSource) : null,
        extra: (u = c.extra) !== null && u !== void 0 ? u : {},
        fbtrace_id: c.fbtrace_id,
        guardList: (j = c.guardList) !== null && j !== void 0 ? j : [],
        hash: I(f, q, r, t, s),
        isNormalizedError: !0,
        line: i == null ? null : String(i),
        loggingSource: s,
        message: D.toReadableMessage(c),
        messageFormat: m,
        messageParams: e,
        metadata: p,
        name: f,
        page_time: Math.floor((g || (g = b("performanceNow")))()),
        project: t,
        reactComponentStack: n,
        script: k,
        serverHash: c.serverHash,
        stack: q,
        stackFrames: l,
        type: r,
        xFBDebug: H.getAll(),
      };
      c.forcedKey != null && (o.forcedKey = c.forcedKey);
      d.length > 0 && (o.taalOpcodes = d);
      u = a.location;
      u && (o.windowLocationURL = u.href);
      for (var j in o) o[j] == null && delete o[j];
      return o;
    }
    function ma(a) {
      return a != null && typeof a === "object" && a.isNormalizedError === !0
        ? a
        : null;
    }
    var N = {
        formatStackFrame: L,
        normalizeError: M,
        ifNormalizedError: ma,
      },
      na = "<global.react>",
      O = [],
      P = [],
      Q = 50,
      R = !1,
      S = {
        history: P,
        addListener: function (a, b) {
          b === void 0 && (b = !1),
            O.push(a),
            b ||
              P.forEach(function (b) {
                return a(
                  b,
                  (b = b.loggingSource) !== null && b !== void 0
                    ? b
                    : "DEPRECATED"
                );
              });
        },
        unshiftListener: function (a) {
          O.unshift(a);
        },
        removeListener: function (a) {
          b("removeFromArray")(O, a);
        },
        reportError: function (a) {
          a = N.normalizeError(a);
          S.reportNormalizedError(a);
        },
        reportNormalizedError: function (b) {
          if (R) return !1;
          var a = z.cloneGuardList();
          b.componentStackFrames && a.unshift(na);
          a.length > 0 && (b.guardList = a);
          if (b.deferredSource == null) {
            a = z.findDeferredSource();
            a != null && (b.deferredSource = N.normalizeError(a));
          }
          P.length > Q && P.splice(Q / 2, 1);
          P.push(b);
          R = !0;
          for (var a = 0; a < O.length; a++)
            try {
              var c;
              O[a](
                b,
                (c = b.loggingSource) !== null && c !== void 0
                  ? c
                  : "DEPRECATED"
              );
            } catch (a) {}
          R = !1;
          return !0;
        },
      };
    S.addListener(k.errorListener);
    var oa = "<anonymous guard>",
      T = !1,
      U = {
        applyWithGuard: function (a, b, c, d) {
          z.pushGuard({
            name:
              ((d === null || d === void 0 ? void 0 : d.name) != null
                ? d.name
                : null) ||
              (a.name ? "func_name:" + a.name : null) ||
              oa,
            deferredSource:
              d === null || d === void 0 ? void 0 : d.deferredSource,
          });
          if (T)
            try {
              return a.apply(b, c);
            } finally {
              z.popGuard();
            }
          try {
            return Function.prototype.apply.call(a, b, c);
          } catch (h) {
            try {
              b = d !== null && d !== void 0 ? d : {};
              var e = b.deferredSource,
                f = b.onError;
              b = b.onNormalizedError;
              var g = v(h);
              e = {
                deferredSource: e,
                loggingSource: "GUARDED",
                project:
                  (e = d === null || d === void 0 ? void 0 : d.project) !==
                    null && e !== void 0
                    ? e
                    : "ErrorGuard",
                type: d === null || d === void 0 ? void 0 : d.errorType,
              };
              D.aggregateError(g, e);
              d = N.normalizeError(g);
              g == null &&
                a &&
                ((d.extra[a.toString().substring(0, 100)] = "function"),
                c != null &&
                  c.length &&
                  (d.extra[Array.from(c).toString().substring(0, 100)] =
                    "args"));
              d.guardList = z.cloneGuardList();
              f && f(g);
              b && b(d);
              S.reportNormalizedError(d);
            } catch (a) {}
          } finally {
            z.popGuard();
          }
        },
        guard: function (a, b) {
          function c() {
            for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++)
              d[e] = arguments[e];
            return U.applyWithGuard(a, this, d, b);
          }
          a.__SMmeta && (c.__SMmeta = a.__SMmeta);
          return c;
        },
        inGuard: function () {
          return z.inGuard();
        },
        skipGuardGlobal: function (a) {
          T = a;
        },
      },
      V = 1024,
      W = [],
      pa = 0;
    function X(a) {
      return String(a);
    }
    function Y(a) {
      return a == null ? null : String(a);
    }
    function qa(a, b) {
      var c = {};
      b &&
        b.forEach(function (a) {
          c[a] = !0;
        });
      Object.keys(a).forEach(function (b) {
        a[b] ? (c[b] = !0) : c[b] && delete c[b];
      });
      return Object.keys(c);
    }
    function Z(a) {
      return (a !== null && a !== void 0 ? a : []).map(function (a) {
        return {
          column: Y(a.column),
          identifier: a.identifier,
          line: Y(a.line),
          script: a.script,
        };
      });
    }
    function ra(a) {
      a = String(a);
      return a.length > V ? a.substring(0, V - 3) + "..." : a;
    }
    function sa(a, b) {
      var c;
      c = {
        appId: Y(b.appId),
        cavalry_lid: b.cavalry_lid,
        access_token: l.access_token,
        ancestor_hash: a.hash,
        bundle_variant:
          (c = b.bundle_variant) !== null && c !== void 0 ? c : null,
        clientTime: X(a.clientTime),
        column: a.column,
        componentStackFrames: Z(a.componentStackFrames),
        events: a.events,
        extra: qa(a.extra, b.extra),
        forcedKey: a.forcedKey,
        frontend_env: (c = b.frontend_env) !== null && c !== void 0 ? c : null,
        guardList: a.guardList,
        line: a.line,
        loggingFramework: b.loggingFramework,
        messageFormat: ra(a.messageFormat),
        messageParams: a.messageParams.map(ra),
        name: a.name,
        sample_weight: Y(b.sample_weight),
        script: a.script,
        site_category: b.site_category,
        stackFrames: Z(a.stackFrames),
        type: a.type,
        page_time: Y(a.page_time),
        project: a.project,
        push_phase: b.push_phase,
        report_source: b.report_source,
        report_source_ref: b.report_source_ref,
        rollout_hash: (c = b.rollout_hash) !== null && c !== void 0 ? c : null,
        script_path: b.script_path,
        server_revision: Y(b.server_revision),
        spin: Y(b.spin),
        svn_rev: String(b.client_revision),
        additional_client_revisions: Array.from(
          (c = b.additional_client_revisions) !== null && c !== void 0 ? c : []
        ).map(X),
        taalOpcodes:
          a.taalOpcodes == null
            ? null
            : a.taalOpcodes.map(function (a) {
                return a;
              }),
        web_session_id: b.web_session_id,
        version: "3",
        xFBDebug: a.xFBDebug,
      };
      b = a.blameModule;
      var d = a.deferredSource;
      b != null && (c.blameModule = String(b));
      d &&
        d.stackFrames &&
        (c.deferredSource = {
          stackFrames: Z(d.stackFrames),
        });
      a.metadata && (c.metadata = a.metadata);
      a.loadingUrls && (c.loadingUrls = a.loadingUrls);
      a.serverHash != null && (c.serverHash = a.serverHash);
      a.windowLocationURL != null &&
        (c.windowLocationURL = a.windowLocationURL);
      a.loggingSource != null && (c.loggingSource = a.loggingSource);
      return c;
    }
    function ta(a, b, c) {
      var d;
      pa++;
      if (b.sample_weight === 0) return !1;
      var e = t.shouldLog(a);
      if (e == null) return !1;
      if (
        (d = b.projectBlocklist) !== null &&
        d !== void 0 &&
        d.includes(a.project)
      )
        return !1;
      d = sa(a, b);
      Object.assign(d, {
        ancestors: W.slice(),
        clientWeight: X(e),
        page_position: X(pa),
      });
      W.length < 15 && W.push(a.hash);
      c(d);
      return !0;
    }
    var ua = {
        createErrorPayload: sa,
        postError: ta,
      },
      $ = null,
      va = !1;
    function wa(a) {
      if (!$) return;
      var b = a.reason,
        c;
      if (
        b != null &&
        typeof b === "object" &&
        (b.name == null ||
          b.name === "" ||
          b.message == null ||
          b.message === "")
      )
        try {
          (c = i("UnhandledRejection: %s", JSON.stringify(b))),
            (c.loggingSource = "ONUNHANDLEDREJECTION");
        } catch (a) {
          (c = i(
            "UnhandledRejection: (circular) %s",
            Object.keys(b).join(",")
          )),
            (c.loggingSource = "ONUNHANDLEDREJECTION");
        }
      else
        (c = v(b)),
          c.loggingSource || (c.loggingSource = "ONUNHANDLEDREJECTION");
      try {
        b = a.promise;
        c.stack =
          String(c.stack || "") +
          (b != null && typeof b.settledStack === "string"
            ? "\n(<promise_settled_stack_below>)\n" + b.settledStack
            : "") +
          (b != null && typeof b.createdStack === "string"
            ? "\n(<promise_created_stack_below>)\n" + b.createdStack
            : "");
      } catch (a) {}
      $.reportError(c);
      a.preventDefault();
    }
    function xa(b) {
      ($ = b),
        typeof a.addEventListener === "function" &&
          !va &&
          ((va = !0), a.addEventListener("unhandledrejection", wa));
    }
    var ya = {
      onunhandledrejection: wa,
      setup: xa,
    };
    c = {
      preSetup: function (a) {
        (a == null || a.ignoreOnError !== !0) && x.setup(S),
          (a == null || a.ignoreOnUnahndledRejection !== !0) && ya.setup(S);
      },
      setup: function (a, b) {
        S.addListener(function (c) {
          ua.postError(c, a, b);
        });
      },
    };
    var za = (function () {
      function a(a) {
        (this.project = a),
          (this.events = []),
          (this.metadata = new B()),
          (this.taalOpcodes = []);
      }
      var b = a.prototype;
      b.$1 = function (b, c) {
        var d = String(c),
          e = this.events,
          f = this.project,
          g = this.metadata,
          i = this.blameModule,
          j = this.forcedKey,
          k = this.error,
          l;
        for (
          var m = arguments.length, n = new Array(m > 2 ? m - 2 : 0), o = 2;
          o < m;
          o++
        )
          n[o - 2] = arguments[o];
        if (this.normalizedError) {
          var p = {
            message:
              this.normalizedError.messageFormat + " [Caught in: " + d + "]",
            params: [].concat(this.normalizedError.messageParams, n),
            forcedKey: j,
          };
          l = babelHelpers["extends"]({}, this.normalizedError, {
            message: p.message,
            messageFormat: p.message,
            messageParams: D.toStringParams(p.params),
            project: f,
            type: b,
            loggingSource: "FBLOGGER",
          });
        } else if (k)
          this.taalOpcodes.length > 0 &&
            new a("fblogger")
              .blameToPreviousFrame()
              .blameToPreviousFrame()
              .warn("Blame helpers do not work with catching"),
            D.aggregateError(k, {
              messageFormat: d,
              messageParams: D.toStringParams(n),
              errorName: k.name,
              forcedKey: j,
              project: f,
              type: b,
              loggingSource: "FBLOGGER",
            }),
            (l = N.normalizeError(k));
        else {
          k = new Error(d);
          if (k.stack === void 0)
            try {
              throw k;
            } catch (a) {}
          k.messageFormat = d;
          k.messageParams = D.toStringParams(n);
          k.blameModule = i;
          k.forcedKey = j;
          k.project = f;
          k.type = b;
          k.loggingSource = "FBLOGGER";
          k.taalOpcodes = [h.PREVIOUS_FRAME, h.PREVIOUS_FRAME].concat(
            this.taalOpcodes
          );
          l = N.normalizeError(k);
          l.name = "FBLogger";
        }
        g.isEmpty() || (l.metadata = g.format());
        if (e.length > 0)
          if (l.events != null) {
            var q;
            (q = l.events).push.apply(q, e);
          } else l.events = e;
        S.reportNormalizedError(l);
        return k;
      };
      b.fatal = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["fatal", a].concat(c));
      };
      b.mustfix = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["error", a].concat(c));
      };
      b.warn = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["warn", a].concat(c));
      };
      b.info = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        this.$1.apply(this, ["info", a].concat(c));
      };
      b.debug = function (a) {};
      b.mustfixThrow = function (a) {
        for (
          var b = arguments.length, c = new Array(b > 1 ? b - 1 : 0), d = 1;
          d < b;
          d++
        )
          c[d - 1] = arguments[d];
        var e = this.$1.apply(this, ["error", a].concat(c));
        e ||
          ((e = i("mustfixThrow does not support catchingNormalizedError")),
          (e.taalOpcodes = e.taalOpcodes || []),
          e.taalOpcodes.push(h.PREVIOUS_FRAME));
        throw e;
      };
      b.catching = function (b) {
        !(b instanceof Error)
          ? new a("fblogger")
              .blameToPreviousFrame()
              .warn("Catching non-Error object is not supported")
          : (this.error = b);
        return this;
      };
      b.catchingNormalizedError = function (a) {
        this.normalizedError = a;
        return this;
      };
      b.event = function (a) {
        this.events.push(a);
        return this;
      };
      b.blameToModule = function (a) {
        this.blameModule = a;
        return this;
      };
      b.blameToPreviousFile = function () {
        this.taalOpcodes.push(h.PREVIOUS_FILE);
        return this;
      };
      b.blameToPreviousFrame = function () {
        this.taalOpcodes.push(h.PREVIOUS_FRAME);
        return this;
      };
      b.blameToPreviousDirectory = function () {
        this.taalOpcodes.push(h.PREVIOUS_DIR);
        return this;
      };
      b.addToCategoryKey = function (a) {
        this.forcedKey = a;
        return this;
      };
      b.addMetadata = function (a, b, c) {
        this.metadata.addEntry(a, b, c);
        return this;
      };
      return a;
    })();
    d = function (a, b) {
      var c = new za(a);
      return b != null ? c.event(a + "." + b) : c;
    };
    d.addGlobalMetadata = function (a, b, c) {
      B.addGlobalMetadata(a, b, c);
    };
    f = {
      blameToPreviousFile: function (a) {
        var b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(h.PREVIOUS_FILE);
        return a;
      },
      blameToPreviousFrame: function (a) {
        var b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(h.PREVIOUS_FRAME);
        return a;
      },
      blameToPreviousDirectory: function (a) {
        var b;
        a.taalOpcodes = (b = a.taalOpcodes) !== null && b !== void 0 ? b : [];
        a.taalOpcodes.push(h.PREVIOUS_DIR);
        return a;
      },
    };
    G = {
      err: i,
      ErrorBrowserConsole: k,
      ErrorDynamicData: l,
      ErrorFilter: t,
      ErrorGlobalEventHandler: x,
      ErrorGuard: U,
      ErrorGuardState: z,
      ErrorMetadata: B,
      ErrorNormalizeUtils: N,
      ErrorPoster: ua,
      ErrorPubSub: S,
      ErrorSerializer: D,
      ErrorSetup: c,
      ErrorXFBDebug: H,
      FBLogger: d,
      getErrorSafe: v,
      getSimpleHash: I,
      TAAL: f,
      TAALOpcode: h,
    };
    e.exports = G;
  },
  null
);
