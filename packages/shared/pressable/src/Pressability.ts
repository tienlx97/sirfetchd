import React from "react";
import {
  ReactFocusEvent_React,
  ReactHoverEvent_React,
  ReactPressEvent_React,
  ReactContextMenuEvent_React,
} from "@farfetchd/react-event";

function usePressability(
  targetRef,
  {
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
  }: any
) {
  // useHover
  ReactHoverEvent_React(targetRef, {
    disabled: disabled,
    onHoverChange: onHoverChange,
    onHoverEnd: onHoverEnd,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverStart,
  });

  // usePress
  ReactPressEvent_React(targetRef, {
    disabled: disabled,
    onPressChange: onPressChange,
    onPressEnd: onPressEnd,
    onPressMove: onPressMove,
    onPressStart: onPressStart,
  });

  // useFocus
  ReactFocusEvent_React.useFocus(targetRef, {
    disabled: disabled,
    onBlur: onBlur,
    onFocus: onFocus,
    onFocusChange: onFocusChange,
    onFocusVisibleChange: onFocusVisibleChange,
  });

  // useContextMenu
  ReactContextMenuEvent_React(targetRef, {
    disabled: disabled,
    onContextMenu: onContextMenu,
    preventDefault: preventContextMenu || false,
  });
}

export { usePressability };
export default usePressability;
