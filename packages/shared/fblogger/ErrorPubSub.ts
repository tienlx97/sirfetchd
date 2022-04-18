import { Error2 } from "@farfetchd/common/Error2";
import { ErrorPubSubProps, NormalizeErrorProps } from "@farfetchd/common/Types";
import { removeFromArray } from "@farfetchd/utils/";

import ErrorGuardState from "./ErrorGuardState";
import ErrorBrowserConsole from "./ErrorBrowserConsole";
import ErrorNormalizeUtils from "./ErrorNormalizeUtils";

let flag = false;
const listeners: FuncErrorPubSubListener[] = [];
const gReact = "<global.react>";
let fDSourse;
const normalizeErrorList: NormalizeErrorProps[] = [];
const normalizeErrorListSize = 50;

const history = normalizeErrorList;

type FuncErrorPubSubListener = (
  nError: NormalizeErrorProps,
  loggingSource?: string
) => any;

const addListener = (listener: FuncErrorPubSubListener, check?: any) => {
  check == undefined && (check = false),
    listeners.push(listener),
    check ||
      normalizeErrorList.forEach((nError) =>
        listener(
          nError,
          nError.loggingSource != undefined
            ? nError.loggingSource
            : "DEPRECATED"
        )
      );
};

const unshiftListener = (listener: FuncErrorPubSubListener) => {
  listeners.unshift(listener);
};

const removeListener = (a: any) => {
  removeFromArray(listeners, a);
};

const reportError = (error: Error2) => {
  const nError = ErrorNormalizeUtils.normalizeError(error);
  reportNormalizedError(nError);
};

const reportNormalizedError = (nError: NormalizeErrorProps) => {
  if (flag) {
    return false;
  }

  const guardList = ErrorGuardState.cloneGuardList();
  nError.componentStackFrames && guardList.unshift(gReact);

  guardList.length > 0 && (nError.guardList = guardList);
  if (nError.deferredSource == null) {
    const dSourse =
      fDSourse || (fDSourse = ErrorGuardState.findDeferredSource());
    dSourse != null &&
      (nError.deferredSource = ErrorNormalizeUtils.normalizeError(dSourse));
  }

  normalizeErrorList.length > normalizeErrorListSize &&
    normalizeErrorList.splice(normalizeErrorListSize / 2, 1);
  normalizeErrorList.push(nError);
  flag = true;
  for (let i = 0; i < listeners.length; i++)
    try {
      listeners[i](
        nError,
        nError.loggingSource != null ? nError.loggingSource : "DEPRECATED"
      );
    } catch (a) {}
  flag = false;
  return true;
};

const ErrorPubSub = {
  addListener,
  history,
  removeListener,
  reportError,
  reportNormalizedError,
  unshiftListener,
} as ErrorPubSubProps;

// QPLUserFlow
// Bootloader
addListener(ErrorBrowserConsole.errorListener);
// ErrorGlobalEventHandler.setup(ErrorPubSub);
// ErrorUnhandledRejectionHandler.setup(ErrorPubSub);

// CometErrorLogging
// SyntaxErrorMonitor
// AdsLogger
// AdsUnifiedLoggingLogger
// CatalogBusinessEventsLoggerHelper
// AdsInterfacesLoggerUtils
// AppInstallLogger
// ErrorMessageConsole
export default ErrorPubSub;

/*
(h || (h = b("ErrorPubSub"))).unshiftListener(function(a) {
        var b = [];
        for (var c = t, d = Array.isArray(c), e = 0, c = d ? c : c[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"](); ; ) {
            var f;
            if (d) {
                if (e >= c.length)
                    break;
                f = c[e++]
            } else {
                e = c.next();
                if (e.done)
                    break;
                f = e.value
            }
            f = f;
            var g = f[0];
            f[1];
            if (u.has(g))
                continue;
            f = N(g);
            if (f.type === "csr" || f.type === "async")
                continue;
            b.push(f.src)
        }
        a.loadingUrls = b
    });
*/
