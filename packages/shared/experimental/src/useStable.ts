import React, { useRef } from "react";

const i =
  typeof Symbol === "function" && typeof Symbol() === "symbol"
    ? Symbol()
    : Object.freeze({});

function useStable(uniqueID: () => string) {
  const b = useRef(i);
  b.current === i && (b.current = uniqueID());
  return b.current;
}

export default useStable;
export { useStable };
