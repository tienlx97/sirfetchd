import { ErrorPubSubProps, NormalizeErrorProps } from "@farfetch/common/Types";
import { errorListener } from "./ErrorBrowserConsole";
import { cloneGuardList, findDeferredSource } from "./ErrorGuardState";
import { normalizeError } from "./ErrorNormalizeUtils";
import { removeFromArray } from "@farfetch/utils/RemoveFromArray";
import { Error2 } from "@farfetch/common/Error2";
let flag = false;
const listeners: any = [];
const gReact = "<global.react>";
let fDSourse;
const normalizeErrorList: NormalizeErrorProps[] = [];
const normalizeErrorListSize = 50;

const history = normalizeErrorList;

const addListener = (listener: any, check?: any) => {
  check == undefined && (check = false),
    listeners.push(listener),
    check ||
      normalizeErrorList.forEach((nError) => {
        return listener(
          nError,
          nError.loggingSource != undefined
            ? nError.loggingSource
            : "DEPRECATED"
        );
      });
};

const unshiftListener = (a: any) => {
  listeners.unshift(a);
};

const removeListener = (a: any) => {
  removeFromArray(listeners, a);
};

const reportError = (error: Error2) => {
  const nError = normalizeError(error);
  reportNormalizedError(nError);
};

const reportNormalizedError = (nError: NormalizeErrorProps) => {
  if (flag) {
    return false;
  }

  const guardList = cloneGuardList();
  nError.componentStackFrames && guardList.unshift(gReact);

  guardList.length > 0 && (nError.guardList = guardList);
  if (nError.deferredSource == null) {
    const dSourse = fDSourse || (fDSourse = findDeferredSource());
    dSourse != null && (nError.deferredSource = normalizeError(dSourse));
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

addListener(errorListener);

const ErrorPubSub = {
  addListener,
  history,
  removeListener,
  reportError,
  reportNormalizedError,
  unshiftListener,
} as ErrorPubSubProps;

// b("ErrorGlobalEventHandler").setup(m);
// b("ErrorUnhandledRejectionHandler").setup(m);
export default ErrorPubSub;
