import { Error2 } from "@farfetchd/errorguard";
import { TAALOpcodes } from "@farfetchd/utils";
import env from "./Env";

function invariant(a, b, ...args) {
  if (!a) {
    let d = b;

    if (typeof d === "number") {
      const i = h(d, args),
        j = i.message,
        k = i.decoderLink;
      d = j;
      args.unshift(k);
    } else if (d === undefined) {
      d = "Invariant: ";
      for (let l = 0; l < args.length; l++) d += "%s,";
    }
    const m = d,
      n = new Error2(m);
    n.name = "Invariant Violation";
    n.messageFormat = d;
    n.messageParams = args.map(function (a) {
      return String(a);
    });
    n.taalOpcodes = [TAALOpcodes.PREVIOUS_FRAME];
    n.stack;
    throw n;
  }
}
function h(invariantValue, args) {
  let d = "Minified invariant #" + invariantValue + "; %s";
  args.length > 0 &&
    (d +=
      " Params: " +
      args
        .map(function (a) {
          return "%s";
        })
        .join(", "));
  invariantValue =
    env.show_invariant_decoder === true
      ? "visit " + i(invariantValue, args) + " to see the full message."
      : "";
  return {
    message: d,
    decoderLink: invariantValue,
  };
}
function i(a, b) {
  a = "https://www.internalfb.com/intern/invariant/" + a + "/";
  b.length > 0 &&
    (a +=
      "?" +
      b
        .map(function (a, b) {
          return "args[" + b + "]=" + encodeURIComponent(String(a));
        })
        .join("&"));
  return a;
}
export default invariant;
