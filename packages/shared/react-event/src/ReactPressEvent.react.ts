import React, { SyntheticEvent, useEffect, useRef } from "react";
import ReactUseEvent_React from "./ReactUseEvent.react";
import ReactEventHookPropagation from "./ReactEventHookPropagation";
import ReactEventHelpers from "./ReactEventHelpers";

const useEventProps = {
  passive: true,
};

function createEvent(eventName, buttons, pointerType, event, target) {
  const f = {
    altKey: event.altKey,
    buttons,
    clientX: event.clientX,
    clientY: event.clientY,
    ctrlKey: event.ctrlKey,
    defaultPrevented: event.defaultPrevented,
    metaKey: event.metaKey,
    pageX: event.pageX,
    pageY: event.pageY,
    pointerType,
    screenX: event.screenX,
    screenY: event.screenY,
    shiftKey: event.shiftKey,
    target,
    timeStamp: event.timeStamp,
    type: eventName,
    x: event.clientX,
    y: event.clientY,
    preventDefault: function () {
      (f.defaultPrevented = true), event.preventDefault();
    },
    stopPropagation: function () {
      event.stopPropagation();
    },
  };
  return f;
}
// type PressEvent = SyntheticEvent<EventTarget>;

type UsePressOptions = {
  disabled?: boolean;
  onPressStart?: (e: any) => void;
  onPressMove?: (e: any) => void;
  onPressEnd?: (e: any) => void;
  onPressChange?: (value: boolean) => void;
};

function usePress(
  pressTargetRef: { current: undefined | Node },
  {
    disabled,
    onPressStart,
    onPressMove,
    onPressEnd,
    onPressChange,
  }: UsePressOptions
) {
  const stateRef = useRef<
    | undefined
    | {
        isPressed: boolean;
        isPressActive: boolean;
        pointerId?: any;
        bounds?: any;
        pointerType: string;
        buttons: number;
        activationEvent?: any;
      }
  >({
    isPressed: false,
    isPressActive: false,
    // pointerId: null,
    // bounds: null,
    pointerType: "",
    buttons: 0,
    activationEvent: null,
  });
  const pointerdownHandle = ReactUseEvent_React("pointerdown");
  const pointermoveHandle = ReactUseEvent_React("pointermove", useEventProps);
  const pointerupHandle = ReactUseEvent_React("pointerup", useEventProps);
  const pointercancelHandle = ReactUseEvent_React(
    "pointercancel",
    useEventProps
  );
  const mousedownHandle = ReactUseEvent_React("mousedown");
  const mouseupHanlde = ReactUseEvent_React("mouseup", useEventProps);
  const mousemoveHandle = ReactUseEvent_React("mousemove", useEventProps);
  const dragstartHandle = ReactUseEvent_React("dragstart", useEventProps);
  const focusoutHandle = ReactUseEvent_React("focusout", useEventProps);

  useEffect(() => {
    const pressTarget = pressTargetRef.current;
    const state = stateRef.current;
    if (pressTarget != null && state != null) {
      const downHandlerCb = (event) => {
        if (disabled === true) {
          upHanlderCb(event);
          return;
        }
        if (
          ReactEventHookPropagation.hasEventHookPropagationStopped(
            event,
            "usePress"
          )
        ) {
          return;
        }
        ReactEventHookPropagation.stopEventHookPropagation(event, "usePress");

        if (
          event.buttons === 2 ||
          event.buttons > 4 ||
          (ReactEventHelpers.isMac &&
            event.pointerType === "mouse" &&
            event.ctrlKey)
        ) {
          return;
        }
        state.buttons = event.buttons as number;
        if (event.button === 1) {
          state.buttons = 4;
        }
        j(event);
      };

      const j = function (event) {
        if (!state.isPressed) {
          const { pointerId, pointerType } = event;
          const newPointerType = pointerType || "mouse";
          state.isPressed = true;
          state.isPressActive = true;
          if (pointerId !== undefined) {
            state.pointerId = pointerId;
          } else {
            state.pointerId = null;
          }
          state.pointerType = newPointerType;
          state.activationEvent = event;

          if (newPointerType !== "mouse") {
            state.bounds = (pressTarget as any).getBoundingClientRect();
          }

          if (onPressStart) {
            onPressStart(
              createEvent(
                "pressstart",
                state.buttons,
                newPointerType,
                event,
                pressTarget
              )
            );
          }

          if (onPressChange) {
            onPressChange(true);
          }

          if (ReactEventHelpers.hasPointerEvents) {
            pointerupHandle.setListener(document, upHanlderCb);
            pointermoveHandle.setListener(document, moveHandlerCb);
            pointercancelHandle.setListener(document, upHanlderCb);
          } else {
            mousemoveHandle.setListener(document, moveHandlerCb);
            mouseupHanlde.setListener(document, upHanlderCb);
            dragstartHandle.setListener(document, upHanlderCb);
          }
        }
      };

      const pressEndHanlder = (event) => {
        if (state.isPressed) {
          state.isPressed = false;
          if (onPressEnd) {
            onPressEnd(
              createEvent(
                "pressend",
                state.buttons,
                state.pointerType,
                event,
                pressTarget
              )
            );
          }

          if (onPressChange) {
            onPressChange(false);
          }
        }

        // state.isPressed &&
        //   ((state.isPressed = false),
        //   onPressEnd &&
        //     onPressEnd(
        //       createEvent(
        //         "pressend",
        //         state.buttons,
        //         state.pointerType,
        //         event,
        //         pressTarget
        //       )
        //     ),
        //   onPressChange && onPressChange(false));
      };

      const upHanlderCb = (event) => {
        state.isPressActive = false;
        state.bounds = null;
        state.activationEvent = null;
        pressEndHanlder(event);

        if (ReactEventHelpers.hasPointerEvents) {
          pointerupHandle.setListener(document, undefined);
          pointermoveHandle.setListener(document, undefined);
          pointercancelHandle.setListener(document, undefined);
        } else {
          mousemoveHandle.setListener(document, undefined),
            mouseupHanlde.setListener(document, undefined),
            dragstartHandle.setListener(document, undefined);
        }
      };

      const moveHandlerCb = (event) => {
        if (disabled === true) {
          upHanlderCb(event);
          return;
        }

        if (!state.isPressActive) {
          return;
        }

        const { pointerType, isPressed } = state;

        let containTarget = false;

        if (pointerType === "mouse") {
          containTarget = pressTarget.contains(event.target);
        } else {
          const pointerId = event.pointerId;
          const bounds = state.bounds;
          if (pointerId !== state.pointerId || bounds == null) {
            return;
          }

          const clientX = event.clientX;
          const clientY = event.clientY;

          const { top, left, right, bottom } = bounds;

          if (
            clientX >= left &&
            clientX <= right &&
            clientY >= top &&
            clientY <= bottom
          ) {
            containTarget = true;
          }
        }

        if (containTarget) {
          if (isPressed) {
            if (onPressMove) {
              onPressMove(
                createEvent(
                  "pressmove",
                  state.buttons,
                  pointerType,
                  event,
                  pressTarget
                )
              );
            }
          } else {
            j(event);
          }
        } else {
          if (isPressed) {
            pressEndHanlder(event);
          }
        }

        // containTarget
        //   ? isPressed
        //     ? onPressMove &&
        //       onPressMove(
        //         k("pressmove", state.buttons, pointerType, event, pressTarget)
        //       )
        //     : j(event)
        //   : isPressed && x(event);
      };

      if (ReactEventHelpers.hasPointerEvents) {
        pointerdownHandle.setListener(pressTarget, downHandlerCb);
      } else {
        mousedownHandle.setListener(pressTarget, downHandlerCb);
      }

      // ReactEventHelpers.hasPointerEvents
      //   ? pointerdownHandle.setListener(pressTarget, i)
      //   : mousedownHandle.setListener(pressTarget, i);
      focusoutHandle.setListener(pressTarget, (event) => {
        const activationEvent = state.activationEvent;
        event.target === pressTarget &&
          activationEvent !== null &&
          upHanlderCb(activationEvent);
      });

      if (state.isPressActive) {
        if (ReactEventHelpers.hasPointerEvents) {
          pointerupHandle.setListener(document, upHanlderCb);
          pointermoveHandle.setListener(document, moveHandlerCb);
          pointercancelHandle.setListener(document, upHanlderCb);
        } else {
          mousemoveHandle.setListener(document, moveHandlerCb);
          mouseupHanlde.setListener(document, upHanlderCb);
          dragstartHandle.setListener(document, upHanlderCb);
        }
      }

      // state.isPressActive &&
      //   (ReactEventHelpers.hasPointerEvents
      //     ? (pointerupHandle.setListener(document, y),
      //       pointermoveHandle.setListener(document, z),
      //       pointercancelHandle.setListener(document, y))
      //     : (mousemoveHandle.setListener(document, z),
      //       mouseupHanlde.setListener(document, y),
      //       dragstartHandle.setListener(document, y)));
      return function () {
        const activationEvent = state.activationEvent;

        if (pressTargetRef.current === null && activationEvent !== null) {
          upHanlderCb(activationEvent);
        }
      };
    }
  }, [
    disabled,
    dragstartHandle,
    focusoutHandle,
    mousedownHandle,
    mousemoveHandle,
    mouseupHanlde,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    pointercancelHandle,
    pointerdownHandle,
    pointermoveHandle,
    pointerupHandle,
    pressTargetRef,
  ]);
}

export default usePress;
export { usePress };
