import ReactFocusEvent_React from "./ReactFocusEvent.react";
import React, {
  useMemo,
  useRef,
  useState
} from "react"
const R = require("react")

type OwnProps = {
  children?: React.ReactNode | Function
  onFocusChange?: any
  onFocusVisibleChange?: any
  onFocusWithin?: any
  onBlurWithin?: any
  testOnly?: any
}

const focusWithinHandler_React = (props: OwnProps) => {

  const {
    children, onFocusChange, onBlurWithin, onFocusVisibleChange, onFocusWithin, testOnly
  } = props

  const ref = useRef(null);
  const [focus, setFocus] = useState((testOnly && testOnly.focus) != null ? testOnly : false);
  const [focusVisible, setFocusVisible] = useState((testOnly && testOnly.focusVisible) != null ? testOnly : false);
  const newRef = ReactFocusEvent_React.useFocusWithin(ref, useMemo(function () {
    return {
      onFocusWithin: (a) => {
        onFocusWithin && !focus && onFocusWithin(a)
      },
      onBlurWithin: (a) => {
        onBlurWithin && focus && onBlurWithin(a)
      },
      onFocusWithinChange: onFocusChange ? (a) => {
        setFocus(a),
          onFocusChange(a)
      }
        : setFocus,
      onFocusWithinVisibleChange: onFocusVisibleChange ? (a) => {
        setFocusVisible(a),
          onFocusVisibleChange(a)
      }
        : setFocusVisible
    }
  }, [focus, onBlurWithin, onFocusChange, onFocusVisibleChange, onFocusWithin]));

  return (
    <R.unstable_Scope
      ref={newRef}
      children={typeof children === "function" ? children(focus, focusVisible) : children}
    />
  )
}

focusWithinHandler_React.displayName = `${focusWithinHandler_React.name} [from FocusWithinHandler.react]`;
const FocusWithinHandler_React = focusWithinHandler_React
export default FocusWithinHandler_React
export { FocusWithinHandler_React }