import React, { AriaRole, BaseSyntheticEvent, forwardRef, memo } from 'react';
import BaseInput_React from './BaseInput.react'
import { BaseFocusRing_React } from "@farfetchd/focus-manager"
import stylex from "@ladifire-opensource/stylex";

const $1 = stylex.create({
  root: {
    ":disabled": {
      color: "var(--disabled-text)"
    }
  }
});

type OwnProp = {
  suppressFocusRing?: boolean
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

const baseTextInputReact = (props: OwnProp, ref?: any) => {
  const { suppressFocusRing, xstyle, ...restProps } = props

  return (
    <BaseFocusRing_React
      suppressFocusRing={suppressFocusRing}
      children={function (childrenXstyle) {
        return (
          <BaseInput_React
            ref={ref}
            xstyle={[$1.root, childrenXstyle, xstyle]}
            {...restProps}
          />
        )
      }}
    />
  )
}

baseTextInputReact.displayName = `${baseTextInputReact.name} [from BaseTextinput.react]`
const BaseTextInput_React = memo(forwardRef(baseTextInputReact))


export default BaseTextInput_React
export { BaseTextInput_React }