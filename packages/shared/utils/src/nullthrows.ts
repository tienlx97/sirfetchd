import { Error2 } from "@farfetchd/errorguard";

function nullthrows(error: Error2 | null, msg?: string) {
  msg === undefined && (msg = "Got unexpected null or undefined");
  if (error != null) return error;
  error = new Error2(msg);
  error.framesToPop = 1;
  throw error;
}

export default nullthrows;
export { nullthrows };
