import { PREVIOUS_FRAME } from "./TAALOpcodes";
import { expect } from "@farfetchd/utils";
import { Error2 } from "@farfetchd/common";

function err(msg: string, ...agrs: any[]) {
  const error = new Error2(msg);
  if (expect.toBeUndefined(error.stack))
    try {
      throw error;
    } catch (a) {}

  error.messageFormat = msg;

  error.messageParams = agrs.map((agr) => String(agr));

  error.taalOpcodes = [PREVIOUS_FRAME];
  return error;
}

export { err };
