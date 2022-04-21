import React, { Ref } from "react";
import { BaseRowContext } from "@farfetchd/context"
import { BaseViewReact } from "./BaseView.react"
import stylex from "@ladifire-opensource/stylex";

interface Props extends React.HTMLAttributes<HTMLElement> {
  xstyle?: any
  expanding?: boolean
  useDeprecatedStyles?: boolean
  verticalAlign?: string
  // 
  children?: React.ReactNode
  columns?: number
  wrap?: string
}


const $1 = stylex.create<"expanding" | "expandingWithWrap" | "item" | "item_DEPRECATED">({
  expanding: {
    flexBasis: "0px",
    flexGrow: "1",
    flexShrink: 1
  },
  expandingWithWrap: {
    flexBasis: "100%"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    maxWidth: "100%",
    minWidth: 0
  },
  item_DEPRECATED: {
    maxWidth: "100%",
    minWidth: 0
  },

})


const $2 = stylex.create<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>({
  1: {
    flexBasis: "100%"
  },
  2: {
    flexBasis: "50%"
  },
  3: {
    flexBasis: "calc(100% / 3)"
  },
  4: {
    flexBasis: "20%"
  },
  5: {
    flexBasis: "eot2utzp"
  },
  6: {
    flexBasis: "calc(100% / 6)"
  },
  7: {
    flexBasis: "calc(100% / 7)"
  },
  8: {
    flexBasis: "12.5%"
  },
  9: {
    flexBasis: "calc(100% / 9)"
  },
  10: {
    flexBasis: "10%"
  }
})


const $3 = stylex.create<"bottom" | "center" | "stretch" | "top">({
  bottom: {
    alignSelf: "flex-end"
  },
  center: {
    alignSelf: "center"
  },
  stretch: {
    alignSelf: "stretch"
  },
  top: {
    alignSelf: "flex-start"
  }
});

const baseRowItemReact = (props: Props, ref: Ref<HTMLDivElement>) => {

  const {
    expanding,
    useDeprecatedStyles,
    verticalAlign,
    xstyle,
    ...restProps
  } = props;

  const _expanding = expanding === undefined ? false : expanding
  const _useDeprecatedStyles = useDeprecatedStyles == undefined ? false : useDeprecatedStyles
  const _verticalAlign = verticalAlign;
  const { columns: _columns, wrap: bWrap } = React.useContext(BaseRowContext)

  return (
    <BaseViewReact
      {...Object.assign({}, restProps, {
        ref,
        xstyle: [
          _useDeprecatedStyles ? $1.item_DEPRECATED : $1.item,
          _expanding && $1.expanding,
          _expanding && bWrap !== "none" && $1.expandingWithWrap,
          _columns > 0 && $2[_columns],
          _verticalAlign != null && $3[_verticalAlign],
          xstyle
        ]
      })}
    />
  )
}

baseRowItemReact.displayName = `${baseRowItemReact.name} [from BaseRowItem.react]`

const BaseRowItemReact = React.forwardRef(baseRowItemReact);

export default BaseRowItemReact;
export { BaseRowItemReact };
