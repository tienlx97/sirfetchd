/* eslint-disable prefer-const */
import { performanceNow } from "@farfetchd/utils";
import { NormalizeErrorProps } from "./types";

interface ErrorFilterProp {
  dropped: number;
  logged: number[];
  lastAccessed: number;
}

let performance: number = 0;
let m = 6,
  n = 6e4,
  o = 10 * n,
  q = 0;

const p = new Map<string, ErrorFilterProp>();

function r() {
  const a = performance || (performance = performanceNow());
  if (a > q + n) {
    const c = a - o;
    for (
      let isArray = Array.isArray(p),
        f: any = 0,
        interator = isArray
          ? p
          : p[typeof Symbol === "function" ? Symbol.iterator : "@@iterator"]();
      ;

    ) {
      let h: any;
      if (isArray) {
        if (f >= interator.length) break;
        h = interator[f++];
      } else {
        f = interator.next();
        if (f.done) break;
        h = f.value;
      }
      h = h;
      const i = h[0];
      h = h[1];
      h.lastAccessed < c && p["delete"](i);
    }
    q = a;
  }
}

function s(hash: string) {
  r();
  const c = performance || (performance = performanceNow()),
    d: ErrorFilterProp | undefined = p.get(hash);
  if (d == null) {
    p.set(hash, {
      dropped: 0,
      logged: [c],
      lastAccessed: c,
    } as ErrorFilterProp);
    return 1;
  }
  const dropped = d.dropped;
  const e = d.logged;
  d.lastAccessed = c;
  while (e[0] < c - n) e.shift();
  if (e.length < m) {
    d.dropped = 0;
    e.push(c);
    return dropped + 1;
  } else {
    d.dropped++;
    return null;
  }
}

function shouldLog(nError: NormalizeErrorProps) {
  return s(nError.hash);
}

const ErrorFilter = {
  shouldLog,
};

export default ErrorFilter;
