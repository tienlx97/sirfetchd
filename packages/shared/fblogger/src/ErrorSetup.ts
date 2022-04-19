import ErrorGlobalEventHandler from "./ErrorGlobalEventHandler";
import ErrorPubSub from "./ErrorPubSub";
import ErrorPoster from "./ErrorPoster";
import ErrorUnhandledRejectionHandler from "./ErrorUnhandledRejectionHandler";
import { ErrorPosterProp, NormalizeErrorProps } from "@farfetchd/common";

function preSetup(objSetup?: any) {
  (objSetup == null || objSetup.ignoreOnError !== true) &&
    ErrorGlobalEventHandler.setup(ErrorPubSub),
    (objSetup == null || objSetup.ignoreOnUnahndledRejection !== true) &&
      ErrorUnhandledRejectionHandler.setup(ErrorPubSub);
}

function setup(props: ErrorPosterProp, logFunc: any) {
  ErrorPubSub.addListener((nError: NormalizeErrorProps) => {
    ErrorPoster.postError(nError, props, logFunc);
  });
}

const ErrorSetup = {
  setup,
  preSetup,
};

export default ErrorSetup;
