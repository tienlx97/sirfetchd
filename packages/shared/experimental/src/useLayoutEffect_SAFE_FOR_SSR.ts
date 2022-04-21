import { useLayoutEffect, useEffect } from "react";

import { ExecutionEnvironment } from "@farfetchd/env";

const useLayoutEffect_SAFE_FOR_SSR = ExecutionEnvironment.canUseDOM
  ? useLayoutEffect
  : useEffect;

export { useLayoutEffect_SAFE_FOR_SSR };
export default useLayoutEffect_SAFE_FOR_SSR;
