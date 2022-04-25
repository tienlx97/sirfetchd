import React, { SyntheticEvent, useRef } from "react";
const ReactDOMComet = require("react-dom");
import { useLayoutEffect_SAFE_FOR_SSR } from "@farfetchd/experimental";

interface UseEventHandle {
  clear: () => void;
  setListener: (
    target: EventTarget,
    callback?: (e: SyntheticEvent<EventTarget>) => void
  ) => void;
}

interface OwnOptions {
  passive?: any;
  capture?: boolean;
}

const reactUseEvent_React = (
  event: string,
  options?: OwnOptions
): UseEventHandle => {
  const handleRef = useRef<UseEventHandle | undefined>(undefined);
  let useEventHandle = handleRef.current;
  const _1703328 = true;
  _1703328 && options && (options.passive = undefined);

  if (useEventHandle == null) {
    const setEventHandle = ReactDOMComet.unstable_createEventHandle(
      event,
      options
    );

    const clears = new Map();

    useEventHandle = {
      setListener: (
        target: EventTarget,
        callback?: (syncEvent: SyntheticEvent<EventTarget>) => void
      ) => {
        let clear = clears.get(target);

        if (clear != null) {
          clear();
        }

        if (callback == null) {
          clears.delete(target);
          return;
        }

        clear = setEventHandle(target, callback);
        clears.set(target, clear);
      },

      clear: (): void => {
        clears.forEach((clr) => clr());
        clears.clear();
      },
    };
    handleRef.current = useEventHandle;
  }

  // use effect | useLayoutEffect []
  useLayoutEffect_SAFE_FOR_SSR(() => {
    return function () {
      if (useEventHandle != null) {
        useEventHandle.clear();
      }
      handleRef.current = undefined;
    };
  }, [useEventHandle]);

  return useEventHandle;
};

export default reactUseEvent_React;
export { reactUseEvent_React as ReactUseEvent_React };
