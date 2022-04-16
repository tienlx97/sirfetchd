import { Error2 } from "@farfetch/common/Error2";
import { ErrorPubSubProps } from "@farfetch/common/Types";
import { err } from "Err";
import { getErrorSafe } from "GetErrorSafe";

let onError =
    typeof window === "undefined" ? "<self.onerror>" : "<window.onerror>",
  errorPubSub: ErrorPubSubProps | null = null;

function listener(errEvent: ErrorEvent) {
  let b: Error2 =
    errEvent.error != null
      ? getErrorSafe(errEvent.error)
      : err(errEvent.message || "");
  b.fileName == null &&
    errEvent.filename != null &&
    (b.fileName = errEvent.filename);
  b.line == null && errEvent.lineno != null && (b.line = errEvent.lineno);
  b.column == null && errEvent.colno != null && (b.column = errEvent.colno);
  b.guardList = [onError];
  b.loggingSource = "ONERROR";
  errorPubSub === null || errorPubSub === undefined
    ? undefined
    : errorPubSub.reportError(b);
}

function setup(ePubSub: ErrorPubSubProps) {
  if (typeof window.addEventListener !== "function") return;
  if (errorPubSub != null) return;
  errorPubSub = ePubSub;
  window.addEventListener("error", listener);
}

const ErrorGlobalEventHandler = {
  setup,
};

export default ErrorGlobalEventHandler;
export { setup };
