import { ExecutionEnvironment } from "@farfetchd/env";
import emptyFunction from "./emptyFunction";
import BanzaiLazyQueue from "./BanzaiLazyQueue";
import { invariant } from "@farfetchd/env";
const i = {},
  j = {};
function k(a) {
  const b = i[a];
  b != null || invariant(0, 11797, a);
  j[a] ||
    ((j[a] = !0),
    (ExecutionEnvironment.canUseDOM || ExecutionEnvironment.isInWorker) &&
      BanzaiLazyQueue.queuePost("gk2_exposure", {
        identifier: a,
        hash: b.hash,
      }));
  return b.result;
}
function add(a, b?) {
  for (const c in a)
    b && b.entry++, !(c in i) ? (i[c] = a[c]) : b && b.dup_entry++;
}
function addLoggedInternal(a) {
  add(a);
  for (const aa in a) j[aa] = !0;
}
function getGKs() {
  return null;
}
function getLogged() {
  return Object.keys(j).map(function (a) {
    return {
      identifier: a,
      hash: i[a].hash,
    };
  });
}
const setPass = emptyFunction;
const setFail = emptyFunction;
const clear = emptyFunction;

const gkx = {
  setPass,
  setFail,
  clear,
  getLogged,
  getGKs,
  addLoggedInternal,
  add,
  k,
};
export default gkx;
