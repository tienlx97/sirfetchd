import { Error2 } from "@farfetchd/common";
import FBLogger from "./FBLogger";

function recoverableViolation(
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
  fbLogMsg.mustfix(msg);
  return null;
}

export { recoverableViolation };
export default recoverableViolation;
