import ErrorFilter from "./ErrorFilter";
import { ErrorPosterProp, NormalizeErrorProps, StackItemProps } from "./types";

const l = {
  access_token: undefined,
};

let V: 1024;

function toString(val: unknown) {
  return String(val);
}

function toStringNotNull(val?: unknown) {
  return val == null ? undefined : String(val);
}

function eventsDiff(nErrorExtra: any, propsExtra: any) {
  const c = {};
  propsExtra &&
    propsExtra.forEach((a) => {
      c[a] = true;
    });
  Object.keys(nErrorExtra).forEach((b) => {
    nErrorExtra[b] ? (c[b] = true) : c[b] && delete c[b];
  });
  return Object.keys(c);
}

function splitMsgFormat(a: any) {
  a = String(a);
  return a.length > V ? a.substring(0, V - 3) + "..." : a;
}

function createStackItem(a: StackItemProps[] | null) {
  return (a != null && a !== void 0 ? a : []).map(function (a) {
    return {
      column: toStringNotNull(a.column),
      identifier: a.identifier,
      line: toStringNotNull(a.line),
      script: a.script,
    } as StackItemProps;
  });
}

function createErrorPayload(
  nError: NormalizeErrorProps,
  props: ErrorPosterProp
) {
  const obj: ErrorPosterProp = {
    appId: toStringNotNull(props.appId), //
    access_token: l.access_token, //
    ancestor_hash: nError.hash, //
    clientTime: toString(nError.clientTime), //
    column: nError.column, //
    componentStackFrames: createStackItem(nError.componentStackFrames), //
    events: nError.events, //
    extra: eventsDiff(nError.extra, props.extra), //
    forcedKey: nError.forcedKey, //
    frontend_env: props.frontend_env != null ? props.frontend_env : undefined, //
    guardList: nError.guardList, //
    line: nError.line, //
    loggingFramework: props.loggingFramework, //
    messageFormat: splitMsgFormat(nError.messageFormat), //
    messageParams: nError.messageParams.map(splitMsgFormat), //
    name: nError.name, //
    script: nError.script, //
    site_category: props.site_category, //
    stackFrames: createStackItem(nError.stackFrames), //
    type: nError.type, //
    project: nError.project, //
    script_path: props.script_path, //
    taalOpcodes:
      nError.taalOpcodes == null
        ? undefined
        : nError.taalOpcodes.map(function (a) {
            return a;
          }),
    // web_session_id: b.web_session_id,
    version: "3",
    xFBDebug: nError.xFBDebug,
  };

  const d = nError.deferredSource;
  nError.blameModule != null && (obj.blameModule = String(nError.blameModule));
  nError.deferredSource &&
    nError.deferredSource.stackFrames &&
    (nError.deferredSource.deferredSource = {
      stackFrames: createStackItem(d.stackFrames),
    });
  nError.metadata && (obj.metadata = nError.metadata);
  nError.loadingUrls && (obj.loadingUrls = nError.loadingUrls);
  nError.serverHash != null && (obj.serverHash = nError.serverHash);
  nError.windowLocationURL != null &&
    (obj.windowLocationURL = nError.windowLocationURL);
  nError.loggingSource != null && (obj.loggingSource = nError.loggingSource);
  return obj;
}

// Post here
function postError(
  nError: NormalizeErrorProps,
  props: ErrorPosterProp,
  logFunc
) {
  const shouldLog = ErrorFilter.shouldLog(nError);
  if (shouldLog == null) return false;
  const d = createErrorPayload(nError, props);
  logFunc(d);
  return true;
}

const ErrorPoster = {
  createErrorPayload,
  postError,
};
export default ErrorPoster;
export { createErrorPayload, postError };
