import { Error2 } from "@farfetchd/common/Error2";
import { ErrorMetadata } from "@farfetchd/common/ErrorMetadata";
import { NormalizeErrorProps, StackItemProps } from "@farfetchd/common/Types";
import { toBeDefined, toBeEmpty, toBeNull } from "@farfetchd/utils";
import { getAll } from "./ErrorXFBDebug";
import { getSimpleHash } from "@farfetchd/utils/GetSimpleHash";
import { performanceNow } from "@farfetchd/utils/PerformanceNow";
import { toReadableMessage } from "ErrorSerializer";

import { PREVIOUS_FRAME } from "TAALOpcodes";

const stackLineRegex = [
    /\(([^\s\)\()]+):(\d+):(\d+)\)$/,
    /@([^\s\)\()]+):(\d+):(\d+)$/,
    /^([^\s\)\()]+):(\d+):(\d+)$/,
    /^at ([^\s\)\()]+):(\d+):(\d+)$/,
  ],
  symbolsRegex = /^\w+:\s.*?\n/g;

Error.stackTraceLimit != null &&
  Error.stackTraceLimit < 80 &&
  (Error.stackTraceLimit = 80);

/**
 * @example 
 * Error: Catching non-Error object is not supported
    at a.b.$1 (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:15475)
    at a.b.warn (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:16336)
    at a.b.catching (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:16922)
    at https://static.xx.fbcdn.net/rsrc.php/v3inrF4/y5/l/en_US/Cz5Cj65yEXYFAQsq7JgwAr2bvZLUnZFfMBlIYuoQOCG0JRMLKIe27TaeAcjmfJEv35WWlxpgwHBZoqNOja6HO4Rw0R4PaC62pZG7rw0iT7Guk_DS_LJQllwD8KJgiDj7Ey4c68r-XgMgiTu66lsP4_0qGd0bAtIkwQyPMu8_EK9X8TkTqIgCcDAU2lUMi1j25Xs5ffaKwKNWZDXcMzVpn64wsICSSF514xdraehoPlENa1xvT6SDjolMiFFZqlva4Z14pEJU.js?_nc_x=DDk_Zn6H8tc:380:12801
    at a (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:219:827)
    at m (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:147:335)
    at https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:147:1179
    at Object.applyWithGuard (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10113)
    at c (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10817)
    at g.<computed> (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:143:526)
    at r (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:143:655)
    at MessagePort.a.port1.onmessage (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:143:1442)
 */
function removeFirstMessageStack(error: Error2): string | null {
  const { name, message, stack } = error;

  if (stack == undefined) return null;

  if (name != null && message != null && !toBeEmpty(stack)) {
    const errorNameMessage = name + ": " + message + "\n";
    if (stack.startsWith(errorNameMessage)) {
      return stack.substring(errorNameMessage.length);
    }

    if (stack === name + ": " + message) return null;
  }

  if (name != null) {
    const errorName = name + "\n";
    if (stack.startsWith(errorName)) {
      return stack.substring(errorName.length);
    }
  }

  if (message != null && !toBeEmpty(message)) {
    const errorMessage = ": " + message + "\n";
    const index = stack.indexOf(errorMessage);
    const remainStack = stack!.substring(0, index);
    if (/^\w+$/.test(remainStack)) {
      return stack!.substring(index + errorMessage.length);
    }
  }

  return stack.replace(symbolsRegex, "") as string;
}

function formatStackFrame(props: StackItemProps) {
  const { identifier, script, line, column } = props;
  let text = "    at " + (identifier != undefined ? identifier : "<unknown>");

  script != undefined &&
    line != undefined &&
    column != undefined &&
    (text += " (" + script + ":" + line + ":" + column + ")");

  return text;
}

function splitStackLine(str: string): StackItemProps {
  str = str.trim();
  const stackItemProps: StackItemProps = {};
  // let atFunc: string, scriptAt: string, line: number, col: number;

  if (str.includes("charset=utf-8;base64,"))
    stackItemProps.identifier = "<inlined-file>";
  else {
    let itemList: RegExpMatchArray | null = null;
    for (let i = 0; i < stackLineRegex.length; i++) {
      const regex = stackLineRegex[i];
      itemList = str.match(regex);
      if (itemList != null) break;
    }

    if (itemList != null && itemList.length === 4) {
      stackItemProps.script = itemList[1];
      stackItemProps.line = parseInt(itemList[2], 10);
      stackItemProps.column = parseInt(itemList[3], 10);
      stackItemProps.identifier = str.substring(
        0,
        str.length - itemList![0].length
      );
    } else {
      stackItemProps.identifier = str;
    }

    stackItemProps.identifier = stackItemProps.identifier
      .replace(/^at /, "")
      .trim();
  }

  stackItemProps.text = formatStackFrame(stackItemProps);

  return stackItemProps;
}

function splitStack(stack: string | null): StackItemProps[] {
  if (stack == null || toBeEmpty(stack)) {
    return [];
  }
  return stack
    .split(/\n\n/)[0]
    .split("\n")
    .map((str) => splitStackLine(str));
}

function componentStackUtils(componentStack: string | undefined) {
  if (componentStack != undefined || toBeEmpty(componentStack!)) return null;
  const items = componentStack!.split("\n");
  items.splice(0, 1);
  return items.map((item) => item.trim());
}

function stackUtils(error: Error2) {
  const newStack = removeFirstMessageStack(error);
  return splitStack(newStack);
}

function errorTypeUtils(error: Error2) {
  if (error.type != undefined) return error.type;
  if (
    error.loggingSource == "GUARDED" ||
    error.loggingSource == "ERROR_BOUNDARY"
  )
    return "fatal";
  if (error.name == "SyntaxError") return "fatal";
  if (
    error.loggingSource == "ONERROR" &&
    error.message.indexOf("ResizeObserver loop") >= 0
  )
    return "warn";
  return error.stack != null && error.stack.indexOf("chrome-extension://") >= 0
    ? "warn"
    : "error";
}

function normalizeError(error: Error2) {
  const stackItemList = stackUtils(error);

  const taalOpcodes = error.taalOpcodes != undefined ? error.taalOpcodes : [];

  let { framesToPop } = error;

  const { blameModule, extra, fbtrace_id, guardList, serverHash } = error;

  if (framesToPop != undefined) {
    framesToPop = Math.min(framesToPop, stackItemList.length);
    while (framesToPop-- > 0) taalOpcodes.unshift(PREVIOUS_FRAME);
  }

  const messageFormat =
    error.messageFormat != undefined ? error.messageFormat : error.message;

  const messageParams = (
    error.messageParams != undefined ? error.messageParams : []
  ).map((param) => String(param));

  const componentStackItem = componentStackUtils(error.componentStack);

  const componentStackFrames =
    componentStackItem == null ? null : componentStackItem.map(splitStackLine);

  let format: string[] | undefined =
    error.metadata != undefined
      ? error.metadata.format()
      : new ErrorMetadata().format();

  format?.length === 0 && (format = undefined);

  const stack = stackItemList.map((item) => item.text).join("\n");

  const errorName = error.errorName != undefined ? error.errorName : error.name;

  const type = errorTypeUtils(error);
  const loggingSource = error.loggingSource;
  const project = error.project;

  let lineNumber =
    error.lineNumber != undefined ? error.lineNumber : error.line;
  let columnNumber =
    error.columnNumber != undefined ? error.columnNumber : error.column;
  let fileName = error.fileName != undefined ? error.fileName : error.sourceURL;

  const check = stackItemList.length > 0;

  check && lineNumber == undefined && (lineNumber = stackItemList[0].line);
  check &&
    columnNumber == undefined &&
    (columnNumber = stackItemList[0].column);
  check && fileName == undefined && (fileName = stackItemList[0].script);

  const obj: NormalizeErrorProps = {
    blameModule: blameModule ? blameModule : null,
    column: columnNumber ? String(columnNumber) : undefined,
    clientTime: Math.floor(Date.now() / 1e3),
    componentStackFrames: componentStackFrames,
    deferredSource: error.deferredSource
      ? normalizeError(error.deferredSource!)
      : null,
    extra: toBeDefined(extra) ? extra! : {},
    fbtrace_id: fbtrace_id ? fbtrace_id : undefined,
    guardList: guardList ? guardList! : [],
    hash: getSimpleHash(errorName, stack, type, project, loggingSource),
    isNormalizedError: true,
    line: lineNumber ? String(lineNumber) : undefined,
    loggingSource: loggingSource!,
    message: toReadableMessage(error),
    messageFormat: messageFormat,
    messageParams: messageParams,
    metadata: format ? format : undefined,
    name: errorName,
    page_time: Math.floor(performanceNow()),
    project: project,
    reactComponentStack: componentStackItem,
    script: fileName ? fileName : undefined,
    serverHash: serverHash ? serverHash : undefined,
    stack: stack,
    stackFrames: stackItemList,
    type: type ? type : undefined,
    xFBDebug: getAll(),
    //
    forcedKey: error.forcedKey ? error.forcedKey! : undefined,
    taalOpcodes: taalOpcodes.length > 0 ? taalOpcodes : undefined,
    windowLocationURL: window.location ? location.href : undefined,
  };

  for (const i in obj)
    (obj[i] === null || obj[i] === undefined) && delete obj[i];
  return obj;
}

const ErrorNormalizeUtils = {
  normalizeError,
};

export default ErrorNormalizeUtils;
export { normalizeError };
