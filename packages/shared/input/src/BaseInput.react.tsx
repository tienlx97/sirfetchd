import React, { useContext, useMemo, memo, forwardRef } from "react";
import stylex from '@ladifire-opensource/stylex';
import { CometContainerPressableContext } from "@farfetchd/context"

const $1 = stylex.create({
  root: {
    WebkitTapHighlightColor: "transparent",
    boxSizing: "border-box",
    touchAction: "manipulation",
    ":disabled": {
      cursor: "not-allowed"
    }
  },

  zIndex: {
    zIndex: 1
  }
});

const isRTL = false;

interface BaseInputReactProps extends React.HTMLAttributes<HTMLInputElement> {
  xstyle?: any
  type?: string
  onValueChange?: any
  onChange?: (e: any) => void,
  onClick?: (e: any) => void,
  onBlur?: (e: any) => void,
  onFocus?: (e: any) => void,
}

const baseInputReact = (props: BaseInputReactProps, ref: any) => {

  const {
    onChange,
    onClick,
    onValueChange,
    type,
    xstyle,
    ...restProps
  } = props

  const inputType = type == null ? "text" : type

  const inputTypeMemo = useMemo(() => {
    switch (inputType) {
      case "switch":
        return "checkbox"
      default:
        return inputType
    }
  }, [inputType])

  const checkbokOrRadio = inputTypeMemo === "checkbox" || inputTypeMemo === "radio"
  const isTextarea = inputTypeMemo === "textarea"
  const isContextNotNull = useContext(CometContainerPressableContext) != null

  const inputProps = Object.assign({
    dir: isRTL ? "rtl" : "ltr"
  }, restProps, {
    className: stylex([$1.root, xstyle, isContextNotNull && $1.zIndex]),
    onChange: (event: any) => {
      checkbokOrRadio || onValueChange && onValueChange(event.target.value, event)
      onChange && onChange(event)
    },
    onClick: (event: any) => {
      checkbokOrRadio && (onValueChange && onValueChange(event.target.checked, event)),
        onClick && onClick(event)
    }
  })

  return isTextarea ? (
    <textarea
      {...Object.assign(
        {
          suppressHydrationWarning: true
        },
        inputProps,
        ref
      )}
    />
  ) : (
    <input
      {...Object.assign(
        {
          suppressHydrationWarning: true
        },
        inputProps,
        {
          ref,
          type: inputTypeMemo,
        }
      )}
    />
  )
}

baseInputReact.displayName = `${baseInputReact.name} [from BaseInput.react]`

const BaseInputReact = memo(forwardRef(baseInputReact));
export default BaseInputReact;
export { baseInputReact }