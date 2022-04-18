import { Error2 } from "@farfetchd/common/Error2";
import { PREVIOUS_FRAME } from "./TAALOpcodes";
import { err } from "./Err";

const reExnId = "RE_EXN_ID";

function getErrorSafe(obj: Error2 | any): Error2 {
  var newErr: Error2 | null = null;

  if (obj == null || typeof obj !== "object") {
    newErr = err("Non-object thrown: %s", String(obj));
  } else {
    if (Object.prototype.hasOwnProperty.call(obj, reExnId)) {
      newErr = err("Rescript exception thrown: %s", JSON.stringify(err));
    } else {
      if (typeof obj.message !== "string") {
        newErr = err(
          "Non-error thrown: %s, keys: %s",
          String(obj),
          JSON.stringify(Object.keys(obj).sort())
        );
      } else {
        if (Object.isExtensible && !Object.isExtensible(obj)) {
          newErr = err("Non-extensible thrown: %s", String(obj.message));
        }
      }
    }
  }

  if (newErr != null) {
    newErr.taalOpcodes = newErr.taalOpcodes || [];
    newErr.taalOpcodes.push(PREVIOUS_FRAME);
    return newErr;
  }
  return obj as Error2;
}

export { getErrorSafe };
