import { Error2 } from "./Error2";
import { TAALOpcodes } from "@farfetchd/utils";

function fbErrorLite(msg: string, ...args) {
  const err = new Error2(msg);
  if (err.stack === void 0)
    try {
      throw err;
    } catch (e) {}
  err.messageFormat = msg;
  err.messageParams = args.map((a) => String(a));
  err.taalOpcodes = [TAALOpcodes.PREVIOUS_FRAME];
  return err;
}

export default fbErrorLite;
export { fbErrorLite };
