import { ErrorPubSubProps, Error2 } from "@farfetchd/common";
import { err } from "./err";
import { getErrorSafe } from "./getErrorSafe";

let errorPubSub: ErrorPubSubProps | null = null,
  flag = false;
function onunhandledrejection(promiseRejectionEvent: PromiseRejectionEvent) {
  if (!errorPubSub) return;
  let objError = promiseRejectionEvent.reason;
  let error: Error2;
  if (
    objError != null &&
    typeof objError === "object" &&
    (objError.name == null ||
      objError.name === "" ||
      objError.message == null ||
      objError.message === "")
  )
    try {
      (error = err("UnhandledRejection: %s", JSON.stringify(objError))),
        (error.loggingSource = "ONUNHANDLEDREJECTION");
    } catch (a) {
      (error = err(
        "UnhandledRejection: (circular) %s",
        Object.keys(objError).join(",")
      )),
        (error.loggingSource = "ONUNHANDLEDREJECTION");
    }
  else
    (error = getErrorSafe(objError)),
      error.loggingSource || (error.loggingSource = "ONUNHANDLEDREJECTION");
  try {
    objError = promiseRejectionEvent.promise;
    error.stack =
      String(error.stack || "") +
      (objError != null && typeof objError.settledStack === "string"
        ? "\n(<promise_settled_stack_below>)\n" + objError.settledStack
        : "") +
      (objError != null && typeof objError.createdStack === "string"
        ? "\n(<promise_created_stack_below>)\n" + objError.createdStack
        : "");
  } catch (a) {}
  errorPubSub.reportError(error);
  promiseRejectionEvent.preventDefault();
}

function setup(ePubSub: ErrorPubSubProps) {
  (errorPubSub = ePubSub),
    typeof window.addEventListener === "function" &&
      !flag &&
      ((flag = true),
      window.addEventListener("unhandledrejection", (e) =>
        onunhandledrejection(e)
      ));
}

const ErrorGlobalEventHandler = {
  setup,
};

export { setup };
export default ErrorGlobalEventHandler;
