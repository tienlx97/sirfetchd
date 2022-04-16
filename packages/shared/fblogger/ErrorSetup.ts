import ErrorGlobalEventHandler from "./ErrorGlobalEventHandler";
import ErrorPubSub from "./ErrorPubSub";

import ErrorUnhandledRejectionHandler from "./ErrorUnhandledRejectionHandler";

function preSetup(objSetup: any) {
  (objSetup == null || objSetup.ignoreOnError !== true) &&
    ErrorGlobalEventHandler.setup(ErrorPubSub),
    (objSetup == null || objSetup.ignoreOnUnahndledRejection !== true) &&
      ErrorUnhandledRejectionHandler.setup(ErrorPubSub);
}

// function setup() {
//   ErrorPubSub.addListener(function (c) {
//     ua.postError(c, a, b);
//   });
// }
