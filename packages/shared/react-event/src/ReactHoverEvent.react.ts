import React, { BaseSyntheticEvent, useEffect, useRef } from "react";
import ReactUseEvent_React from "./ReactUseEvent.react";
import ReactEventHookPropagation from "./ReactEventHookPropagation";
import ReactEventHelpers from "./ReactEventHelpers";

function createEvent(type, event, target) {
  return {
    clientX: event.clientX,
    clientY: event.clientY,
    pageX: event.pageX,
    pageY: event.pageY,
    screenX: event.screenX,
    screenY: event.screenY,
    target: target,
    timeStamp: event.timeStamp,
    type: type,
    x: event.clientX,
    y: event.clientY,
  };
}

const useEventProps = {
  passive: true,
};

function isParent(parent, child) {
  // b = b;
  let tmp = child;
  while (tmp != null) {
    if (tmp === parent) return true;
    if (tmp._hoverEventTarget) return false;
    tmp = tmp.parentNode;
  }
  return false;
}
type HoverEvent = BaseSyntheticEvent<EventTarget>;

type UseHoverOptions = {
  disabled?: boolean;
  onHoverStart?: (e: any) => void;
  onHoverMove?: (e: any) => void;
  onHoverEnd?: (e: any) => void;
  onHoverChange?: (value: boolean) => void;
};

function useHover(
  hoverTargetRef: { current: null | any },
  {
    disabled,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
    onHoverChange,
  }: UseHoverOptions
) {
  const touchstartHandle = ReactUseEvent_React("touchstart", useEventProps);
  const mouseoverHandle = ReactUseEvent_React("mouseover", useEventProps);
  const mouseoutHandle = ReactUseEvent_React("mouseout", useEventProps);
  const mousemoveHandle = ReactUseEvent_React("mousemove", useEventProps);
  const pointeroverHandle = ReactUseEvent_React("pointerover", useEventProps);
  const pointeroutHandle = ReactUseEvent_React("pointerout", useEventProps);
  const pointermoveHandle = ReactUseEvent_React("pointermove", useEventProps);
  const pointercancelHandle = ReactUseEvent_React(
    "pointercancel",
    useEventProps
  );

  const stateRef = useRef<
    undefined | { isHovered: boolean; isTouched: boolean }
  >({
    isHovered: false,
    isTouched: false,
  });

  useEffect(() => {
    const hoverTarget = hoverTargetRef.current;
    const state = stateRef.current;

    if (hoverTarget != null && state != null) {
      hoverTarget._hoverEventTarget = true;

      const sthCallback = (event) => {
        if (disabled === true) {
          pointercancelCallback(event);
          return;
        }
        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "useHover"
          )
        ) {
          return;
        }

        ReactEventHookPropagation.stopEventHookPropagation(event, "useHover");

        if (!state.isHovered && !isParent(hoverTarget, event.relatedTarget)) {
          state.isHovered = true;
          if (onHoverStart) {
            onHoverStart(createEvent("hoverstart", event, hoverTarget));
          }
          if (onHoverChange) {
            onHoverChange(true);
          }
          if (ReactEventHelpers.hasPointerEvents) {
            pointermoveHandle.setListener(document, pointermoveCallback);
            pointercancelHandle.setListener(document, pointercancelCallback);
            pointeroutHandle.setListener(document, mouseOrPointerCallback);
          } else {
            mouseoutHandle.setListener(document, mouseOrPointerCallback);
          }
        }
      };

      const mouseOrPointerCallback = (event) => {
        if (state.isHovered && !isParent(hoverTarget, event.relatedTarget)) {
          state.isHovered = false;
          if (onHoverEnd) {
            onHoverEnd(createEvent("hoverend", event, hoverTarget));
          }
          if (onHoverChange) {
            onHoverChange(false);
          }
          pointercancelCallback(event);
        }
      };
      const pointermoveCallback = (event) => {
        state.isTouched = false;
        if (disabled === true) {
          pointercancelCallback(event);
          return;
        }
        if (state.isHovered && onHoverMove) {
          onHoverMove(createEvent("hovermove", event, hoverTarget));
        }
      };
      const pointercancelCallback = (event) => {
        state.isTouched = false;
        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandle.setListener(document, undefined);
          pointercancelHandle.setListener(document, undefined);
          pointeroutHandle.setListener(document, undefined);
        } else {
          mouseoutHandle.setListener(document, undefined);
        }

        mouseOrPointerCallback(event);
      };

      if (ReactEventHelpers.hasPointerEvents) {
        pointeroverHandle.setListener(hoverTarget, (eevent) => {
          if ((eevent as any).pointerType !== "touch") {
            sthCallback(eevent);
          }
        });
      } else {
        mouseoverHandle.setListener(hoverTarget, (eevent) => {
          state.isTouched || sthCallback(eevent);
        });
        touchstartHandle.setListener(hoverTarget, () => {
          state.isTouched = true;
        });
        mousemoveHandle.setListener(document, pointermoveCallback);
      }

      if (state.isHovered) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointermoveHandle.setListener(document, pointermoveCallback),
            pointercancelHandle.setListener(document, pointercancelCallback),
            pointeroutHandle.setListener(document, mouseOrPointerCallback);
        } else {
          mouseoutHandle.setListener(document, mouseOrPointerCallback);
        }
      }
    }
  }, [
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    pointercancelHandle,
    pointermoveHandle,
    pointeroutHandle,
    pointeroverHandle,
    mousemoveHandle,
    mouseoutHandle,
    mouseoverHandle,
    hoverTargetRef,
    touchstartHandle,
  ]);
}

export default useHover;
export { useHover };
