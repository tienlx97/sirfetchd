import invariant from "./invariant";
import { nullthrows } from "@farfetchd/utils";

const a = {
  __flight_execution_mode_DO_NOT_USE: undefined,
};

const i = {},
  j = new Set();

function ix(b) {
  const d = i[b];
  !d && invariant(0, 11798, b);
  a.__flight_execution_mode_DO_NOT_USE === "flight" &&
    d.sprited === 1 &&
    j.add(
      nullthrows(
        d.origPath,
        "origPath should be defined on the server in react flight"
      )
    );
  return d;
}
ix.add = function (a, b) {
  const c = !1;
  for (const c in a)
    b && b.entry++,
      !(c in i) ? ((a[c].loggingID = c), (i[c] = a[c])) : b && b.dup_entry++;
};

ix.getUsedPaths_ONLY_FOR_REACT_FLIGHT = function () {
  a.__flight_execution_mode_DO_NOT_USE === "flight" || invariant(0, 34547);
  return Array.from(j);
};

export default ix;
export { ix };
