import { Error2 } from "@farfetchd/commonError2";
import FBLogger from "./FBLogger";

function unrecoverableViolation(
  msg: string,
  projectName: string,
  e?: any,
  errObj?: any
) {
  errObj == undefined && (errObj = {});
  errObj = errObj.error;
  let fbLogMsg = FBLogger(projectName);
  fbLogMsg = errObj
    ? fbLogMsg.catching(errObj as Error2)
    : fbLogMsg.blameToPreviousFrame();
  const categoryKey = e == undefined ? undefined : (e.categoryKey as string);
  categoryKey != undefined &&
    (fbLogMsg = fbLogMsg.addToCategoryKey(categoryKey));
  return fbLogMsg.mustfixThrow(msg);
}

export { unrecoverableViolation };
