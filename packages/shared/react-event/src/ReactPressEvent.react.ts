// import React, { SyntheticEvent, useEffect, useRef } from "react";
// import ReactUseEvent_React from "./ReactUseEvent.react";
// import ReactEventHookPropagation from "./ReactEventHookPropagation";
// import ReactEventHelpers from "./ReactEventHelpers";

// const useEventProps = {
//   passive: !0,
// };

// function k(a, b, c, d, e) {
//   const f = {
//     altKey: d.altKey,
//     buttons: b,
//     clientX: d.clientX,
//     clientY: d.clientY,
//     ctrlKey: d.ctrlKey,
//     defaultPrevented: d.defaultPrevented,
//     metaKey: d.metaKey,
//     pageX: d.pageX,
//     pageY: d.pageY,
//     pointerType: c,
//     screenX: d.screenX,
//     screenY: d.screenY,
//     shiftKey: d.shiftKey,
//     target: e,
//     timeStamp: d.timeStamp,
//     type: a,
//     x: d.clientX,
//     y: d.clientY,
//     preventDefault: function () {
//       (f.defaultPrevented = !0), d.preventDefault();
//     },
//     stopPropagation: function () {
//       d.stopPropagation();
//     },
//   };
//   return f;
// }
// type PressEvent = SyntheticEvent<EventTarget>;

// type UsePressOptions = {
//   disabled?: boolean;
//   onPressStart?: (e: any) => void;
//   onPressMove?: (e: any) => void;
//   onPressEnd?: (e: any) => void;
//   onPressChange?: (value: boolean) => void;
// };

// function usePress(
//   pressTargetRef: { current: undefined | Node },
//   props: UsePressOptions
// ) {
//   const { disabled, onPressStart, onPressMove, onPressEnd, onPressChange } =
//     props;

//   const stateRef = useRef<
//       | undefined
//       | {
//           isPressed: boolean;
//           isPressActive: boolean;
//           pointerId?: any;
//           bounds?: any;
//           pointerType: string;
//           buttons: number;
//           activationEvent?: any;
//         }
//     >({
//       isPressed: !1,
//       isPressActive: !1,
//       // pointerId: null,
//       // bounds: null,
//       pointerType: "",
//       buttons: 0,
//       activationEvent: null,
//     }),
//     pointerdownHandle = ReactUseEvent_React("pointerdown"),
//     pointermoveHandle = ReactUseEvent_React("pointermove", useEventProps),
//     pointerupHandle = ReactUseEvent_React("pointerup", useEventProps),
//     pointercancelHandle = ReactUseEvent_React("pointercancel", useEventProps),
//     mousedownHandle = ReactUseEvent_React("mousedown"),
//     mouseupHanlde = ReactUseEvent_React("mouseup", useEventProps),
//     mousemoveHandle = ReactUseEvent_React("mousemove", useEventProps),
//     dragstartHandle = ReactUseEvent_React("dragstart", useEventProps),
//     focusoutHandle = ReactUseEvent_React("focusout", useEventProps);
//   useEffect(() => {
//     const pressTarget = pressTargetRef.current;
//     const state = stateRef.current;
//     if (pressTarget != null && state != null) {
//       let i = (event: PressEvent) => {
//           if (disabled === !0) {
//             y(event);
//             return;
//           }
//           if (
//             ReactEventHookPropagation.hasEventHookPropagationStopped(
//               event,
//               "usePress"
//             )
//           )
//             return;
//           ReactEventHookPropagation.stopEventHookPropagation(event, "usePress");
//           if (
//             (event as any).buttons === 2 ||
//             (event as any).buttons > 4 ||
//             (ReactEventHelpers.isMac &&
//               event.pointerType === "mouse" &&
//               event.ctrlKey)
//           )
//             return;
//           state.buttons = event.buttons as number;
//           event.button === 1 && (state.buttons = 4);
//           j(event);
//         },
//         j = function (a) {
//           if (!state.isPressed) {
//             let e = a;
//             const g = e.pointerId;
//             e = e.pointerType || "mouse";
//             state.isPressed = !0;
//             state.isPressActive = !0;
//             state.pointerId = g !== void 0 ? g : null;
//             state.pointerType = e;
//             state.activationEvent = a;
//             e !== "mouse" &&
//               (state.bounds = pressTarget.getBoundingClientRect());
//             onPressStart &&
//               onPressStart(k("pressstart", state.buttons, e, a, pressTarget));
//             onPressChange && onPressChange(!0);
//             ReactEventHelpers.hasPointerEvents
//               ? (pointerupHandle.setListener(document, y),
//                 pointermoveHandle.setListener(document, z),
//                 pointercancelHandle.setListener(document, y))
//               : (mousemoveHandle.setListener(document, z),
//                 mouseupHanlde.setListener(document, y),
//                 dragstartHandle.setListener(document, y));
//           }
//         },
//         x = function (a) {
//           state.isPressed &&
//             ((state.isPressed = !1),
//             onPressEnd &&
//               onPressEnd(
//                 k("pressend", state.buttons, state.pointerType, a, pressTarget)
//               ),
//             onPressChange && onPressChange(!1));
//         },
//         y = function (a) {
//           (state.isPressActive = !1),
//             (state.bounds = null),
//             (state.activationEvent = null),
//             x(a),
//             ReactEventHelpers.hasPointerEvents
//               ? (pointerupHandle.setListener(document, undefined),
//                 pointermoveHandle.setListener(document, undefined),
//                 pointercancelHandle.setListener(document, undefined))
//               : (mousemoveHandle.setListener(document, undefined),
//                 mouseupHanlde.setListener(document, undefined),
//                 dragstartHandle.setListener(document, undefined));
//         },
//         z = function (a) {
//           if (disabled === !0) {
//             y(a);
//             return;
//           }
//           if (!state.isPressActive) return;
//           const d = state.pointerType,
//             f = state.isPressed;
//           let h = !1;
//           if (d === "mouse") {
//             const i = a.target;
//             h = pressTarget.contains(i);
//           } else {
//             i = a;
//             i = i.pointerId;
//             let l = state.bounds;
//             if (i !== state.pointerId || l === null) return;
//             i = a.clientX;
//             const m = a.clientY,
//               n = l.top,
//               o = l.left,
//               p = l.right;
//             l = l.bottom;
//             i >= o && i <= p && m >= n && m <= l && (h = !0);
//           }
//           h
//             ? f
//               ? onPressMove &&
//                 onPressMove(k("pressmove", state.buttons, d, a, pressTarget))
//               : j(a)
//             : f && x(a);
//         };
//       ReactEventHelpers.hasPointerEvents
//         ? pointerdownHandle.setListener(pressTarget, i)
//         : mousedownHandle.setListener(pressTarget, i);
//       focusoutHandle.setListener(pressTarget, function (a) {
//         const d = state.activationEvent;
//         a.target === pressTarget && d !== null && y(d);
//       });
//       state.isPressActive &&
//         (ReactEventHelpers.hasPointerEvents
//           ? (pointerupHandle.setListener(document, y),
//             pointermoveHandle.setListener(document, z),
//             pointercancelHandle.setListener(document, y))
//           : (mousemoveHandle.setListener(document, z),
//             mouseupHanlde.setListener(document, y),
//             dragstartHandle.setListener(document, y)));
//       return function () {
//         const b = state.activationEvent;
//         pressTargetRef.current === null && b !== null && y(b);
//       };
//     }
//   }, [
//     disabled,
//     dragstartHandle,
//     focusoutHandle,
//     mousedownHandle,
//     mousemoveHandle,
//     mouseupHanlde,
//     onPressChange,
//     onPressEnd,
//     onPressMove,
//     onPressStart,
//     pointercancelHandle,
//     pointerdownHandle,
//     pointermoveHandle,
//     pointerupHandle,
//     pressTargetRef,
//   ]);
// }
