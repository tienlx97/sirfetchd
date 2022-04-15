import { PREVIOUS_FRAME } from "./TAALOpcodes";
import { toBeUndefined } from "@farfetch/utils/";
import { Error2 } from "@farfetch/common/Error2";

function err(msg: string, ...agrs: any[]) {
  const error = new Error2(msg);
  if (toBeUndefined(error.stack))
    try {
      throw error;
    } catch (a) {}

  error.messageFormat = msg;

  error.messageParams = agrs.map((agr) => String(agr));

  error.taalOpcodes = [PREVIOUS_FRAME];
  return error;
}

export { err };
