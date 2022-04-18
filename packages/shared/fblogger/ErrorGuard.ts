import ErrorNormalizeUtils from "./ErrorNormalizeUtils";
import ErrorSerializer from "./ErrorSerializer";
import { getErrorSafe } from "./getErrorSafe";
import ErrorGuardState from "./ErrorGuardState";
import ErrorPubSub from "./ErrorPubSub";
import { NormalizeErrorProps } from "@farfetchd/common/Types";
import { Error2 } from "@farfetchd/common/Error2";

var oa = "<anonymous guard>";
var guardGlobalFlag = !1;

function applyWithGuard(a, b, c, nError: NormalizeErrorProps) {
  ErrorGuardState.pushGuard({
    name:
      ((nError === null || nError === void 0 ? void 0 : nError.name) != null
        ? nError.name
        : null) ||
      (a.name ? "func_name:" + a.name : null) ||
      oa,
    deferredSource:
      nError === null || nError === void 0 ? void 0 : nError.deferredSource,
  });
  if (guardGlobalFlag)
    try {
      return a.apply(b, c);
    } finally {
      ErrorGuardState.popGuard();
    }
  try {
    return Function.prototype.apply.call(a, b, c);
  } catch (h) {
    try {
      b = nError !== null && nError !== void 0 ? nError : {};
      var e = b.deferredSource,
        f = b.onError;
      b = b.onNormalizedError;
      let sError: Error2 = getErrorSafe(h);
      e = {
        deferredSource: e,
        loggingSource: "GUARDED",
        project:
          (e =
            nError === null || nError === void 0 ? void 0 : nError.project) !==
            null && e !== void 0
            ? e
            : "ErrorGuard",
        type: nError === null || nError === void 0 ? void 0 : nError.errorType,
      };
      ErrorSerializer.aggregateError(sError, e);
      nError = ErrorNormalizeUtils.normalizeError(sError);
      sError == null &&
        a &&
        ((nError.extra[a.toString().substring(0, 100)] = "function"),
        c != null &&
          c.length &&
          (nError.extra[Array.from(c).toString().substring(0, 100)] = "args"));
      nError.guardList = ErrorGuardState.cloneGuardList();
      f && f(sError);
      b && b(nError);
      ErrorPubSub.reportNormalizedError(nError);
    } catch (a) {}
  } finally {
    ErrorGuardState.popGuard();
  }
}

function guard(a: any, b: any) {
  function c() {
    for (var c = arguments.length, d = new Array(c), e = 0; e < c; e++)
      d[e] = arguments[e];
    return applyWithGuard(a, this, d, b);
  }
  a.__SMmeta && (c.__SMmeta = a.__SMmeta);
  return c;
}

function inGuard() {
  return ErrorGuardState.inGuard();
}

function skipGuardGlobal(flag: boolean) {
  guardGlobalFlag = flag;
}

const ErrorGuard = {
  skipGuardGlobal,
  inGuard,
  guard,
  applyWithGuard,
};

export default ErrorGuard;
export { skipGuardGlobal, inGuard, guard, applyWithGuard };
