import { Error2 } from "./Error2";
import { removeFromArray } from "@farfetchd/utils";

import ErrorGuardState from "./ErrorGuardState";
import ErrorBrowserConsole from "./ErrorBrowserConsole";
import ErrorNormalizeUtils from "./ErrorNormalizeUtils";
import { ErrorPubSubProps, NormalizeErrorProps } from "./types";

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

// CometErrorLogging
// SyntaxErrorMonitor
// AdsLogger
// AdsUnifiedLoggingLogger
// CatalogBusinessEventsLoggerHelper
// AdsInterfacesLoggerUtils
// AppInstallLogger
// ErrorMessageConsole
export default ErrorPubSub;
