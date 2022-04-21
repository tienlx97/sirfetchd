import { Error2 } from "./Error2";
import { err } from "./err";
import { getErrorSafe } from "./getErrorSafe";
import { ErrorPubSubProps } from "./types";

const onError =
  typeof window === "undefined" ? "<self.onerror>" : "<window.onerror>";
let errorPubSub: ErrorPubSubProps | null = null;

function listener(errEvent: ErrorEvent) {
  const newError: Error2 =
    errEvent.error != null
      ? getErrorSafe(errEvent.error)
      : err(errEvent.message || "");

  if (newError.fileName == null && errEvent.filename != null)
    newError.fileName = errEvent.filename;

  if (newError.line == null && errEvent.lineno != null)
    newError.line = errEvent.lineno;

  if (newError.column == null && errEvent.colno != null)
    newError.column = errEvent.colno;

  newError.guardList = [onError];
  newError.loggingSource = "ONERROR";

  errorPubSub === null || errorPubSub === undefined
    ? undefined
    : errorPubSub.reportError(newError);
}

function setup(ePubSub: ErrorPubSubProps) {
  if (typeof window.addEventListener !== "function") return;
  if (errorPubSub != null) return;
  errorPubSub = ePubSub;
  window.addEventListener("error", (e) => listener(e));
}

const ErrorGlobalEventHandler = {
  setup,
};

export { setup };
export default ErrorGlobalEventHandler;
