import performance from "./performance";

function performanceNow(): number {
  let fn: () => number;
  // support window
  if (performance.now)
    fn = function () {
      return performance.now();
    };
  else {
    // unsupport window.performance
    // do it manually
    const startTime = window._cstart;
    const currentTime = Date.now();

    let start =
      typeof startTime === "number" && startTime < currentTime
        ? startTime
        : currentTime;

    let increaseTime = 0;

    fn = function () {
      const nowTime = Date.now();
      let remainTime = nowTime - start;
      remainTime < increaseTime &&
        ((start -= increaseTime - remainTime), (remainTime = nowTime - start));
      increaseTime = remainTime;
      return remainTime;
    };
  }

  return fn();
}

export default performanceNow;
export { performanceNow };
