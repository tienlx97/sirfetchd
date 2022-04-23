import React, { useRef } from "react";
const ReactDom = require("react-dom");
import { useLayoutEffect_SAFE_FOR_SSR } from "@farfetchd/experimental";

interface RefProp {
  clear: () => any;
  setListener: (a, b) => any;
}

interface OwnProp {
  passive?: any;
  capture?: any;
}

const reactUseEventReact = (eventName: string, props?: OwnProp) => {
  const ref = useRef<RefProp>();
  let current = ref.current;
  const _1703328 = true;
  _1703328 && props && (props.passive = undefined);

  if (current == null) {
    const unstable_createEventHandle = ReactDom.unstable_createEventHandle(
      eventName,
      props
    );
    const map = new Map();
    current = {
      setListener: (a, b) => {
        let mapItem = map.get(a);
        mapItem !== undefined && mapItem();
        if (b === null) {
          map["delete"](a);
          return;
        }
        mapItem = unstable_createEventHandle(a, b);
        map.set(a, mapItem);
      },
      clear: () => {
        const arrMap = Array.from(map.values());
        for (let b = 0; b < arrMap.length; b++) arrMap[b]();
        map.clear();
      },
    };
    ref.current = current;
  }

  useLayoutEffect_SAFE_FOR_SSR(() => {
    return function () {
      current != null && current.clear();
      ref.current = undefined;
    };
  }, [current]);
  return current;
};

export default reactUseEventReact;
