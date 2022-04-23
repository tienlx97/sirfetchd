import React, { useContext, useMemo, memo, forwardRef, BaseSyntheticEvent, AriaRole } from "react";
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

interface BaseInputReactProps {

  "aria-autocomplete"?: "none" | "both" | "inline" | "list"
  "aria-controls"?: string
  "aria-describedby"?: string
  "aria-expanded"?: boolean
  "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling"
  "aria-label"?: string

  autoComplete?: string
  autoFocus?: boolean
  checked?: boolean
  disabled?: boolean
  id?: string
  inputMode?: "text" | "none" | "search" | "tel" | "url" | "email" | "numeric" | "decimal"
  name?: string
  maxLength?: number

  xstyle?: any
  type?: string
  onValueChange?: any

  onChange?: (e: BaseSyntheticEvent) => void,
  onClick?: (event: BaseSyntheticEvent) => void,
  onBlur?: (e: BaseSyntheticEvent) => void,
  onFocus?: (e: BaseSyntheticEvent) => void
  onMouseUp?: (e: BaseSyntheticEvent) => void

  placeholder?: string
  role?: AriaRole
  spellCheck?: boolean
  tabIndex?: number
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

  const checkboxOrRadio = inputTypeMemo === "checkbox" || inputTypeMemo === "radio"
  const isTextarea = inputTypeMemo === "textarea"
  const isContextNotNull = useContext(CometContainerPressableContext) != null


  const inputProps = Object.assign({
    dir: isRTL ? "rtl" : "ltr"
  }, restProps, {
    className: stylex([$1.root, xstyle, isContextNotNull && $1.zIndex]),
    onChange: (event: BaseSyntheticEvent) => {
      checkboxOrRadio || onValueChange && onValueChange(event.target.value, event)
      onChange && onChange(event)
    },
    onClick: (event: BaseSyntheticEvent) => {
      checkboxOrRadio && (onValueChange && onValueChange(event.target.checked, event)),
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
        {
          ref
        }
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

/**

aria-autocomplete
aria-controls
aria-describedby
aria-expanded
aria-invalid
aria-label
autoComplete
autoFocus
checked
disabled
id
inputMode
name
maxLength
onBlur
onChange
onFocus
onMouseUp
onValueChange
placeholder
role
spellCheck
tabIndex
type
value
xstyle


 */