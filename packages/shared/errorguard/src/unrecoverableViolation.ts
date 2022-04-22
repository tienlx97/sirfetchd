import { Error2 } from "./Error2";
import FBLogger from "./FBLogger";

function unrecoverableViolation(
  msg: string,
  projectName: string,
  category?: any,
  errObj?: any
) {
  errObj == undefined && (errObj = {});
  errObj = errObj.error;
  let fbLogMsg = FBLogger(projectName);
  fbLogMsg = errObj
    ? fbLogMsg.catching(errObj as Error2)
    : fbLogMsg.blameToPreviousFrame();
  const categoryKey =
    category == undefined ? undefined : (category.categoryKey as string);
  categoryKey != undefined &&
    (fbLogMsg = fbLogMsg.addToCategoryKey(categoryKey));
  return fbLogMsg.mustfixThrow(msg);
}

export { unrecoverableViolation };
export default unrecoverableViolation;
