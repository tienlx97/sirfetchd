import performance from "./Performance";

function performanceNow(): number {
  // support window
  performance.now && performance.now();

  return 1;
  // unsupport window.performance
  // do it manually
  // const startTime = window._cstart;
  // const currentTime = Date.now();

  // let start =
  //   typeof startTime === "number" && startTime < currentTime
  //     ? startTime
  //     : currentTime;

  // let increaseTime = 0;

  // return () => {
  //   const nowTime = Date.now();
  //   let remainTime = nowTime - start;
  //   remainTime < increaseTime &&
  //     ((start -= increaseTime - remainTime), (remainTime = nowTime - start));
  //   increaseTime = remainTime;
  //   return remainTime;
  // };
}

export { performanceNow };
