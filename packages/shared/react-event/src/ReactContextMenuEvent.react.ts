import React, { useEffect } from "react";
import ReactEventHookPropagation from "./ReactEventHookPropagation";
import ReactUseEvent_React from "./ReactUseEvent.react";

type OwnProp = {
  disabled?: boolean;
  onContextMenu?: (event: React.SyntheticEvent<EventTarget, Event>) => void;
  preventDefault?: boolean;
};

function useContextMenu(ref: any, props: OwnProp) {
  const { disabled, onContextMenu, preventDefault } = props;
  const contextmenuHandle = ReactUseEvent_React("contextmenu");
  useEffect(() => {
    const refCurrent = ref.current;

    refCurrent != null &&
      contextmenuHandle.setListener(refCurrent, (event) => {
        if (disabled === true) {
          return;
        }
        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useContextMenu"
          )
        )
          return;
        ReactEventHookPropagation.stopEventHookPropagation(
          event,
          "useContextMenu"
        );

        if (preventDefault !== false && !event.nativeEvent.defaultPrevented) {
          event.preventDefault();
        }

        if (onContextMenu) {
          onContextMenu(event);
        }
      });
  }, [disabled, ref, contextmenuHandle, preventDefault, onContextMenu]);
}

export default useContextMenu;
export { useContextMenu };
