import React, { Ref } from "react";
import { BaseRowContext } from "@farfetchd/context"
import { BaseViewReact } from "./BaseView.react"
import stylex from "@ladifire-opensource/stylex";
import { type } from "os";

interface Props extends React.HTMLAttributes<HTMLElement> {
  xstyle?: any
  expanding?: boolean
  useDeprecatedStyles?: boolean
  verticalAlign?: string
  // 
  children: string | React.ReactNode
  columns?: number
  wrap?: string
}

type kS = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
type jS = "expanding" | "expandingWithWrap" | "item" | "item_DEPRECATED"
type lS = "bottom" | "center" | "stretch" | "top"

const j = stylex.create<jS>({
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


const k = stylex.create<kS>({
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


const l = stylex.create<lS>({
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

  const { xstyle, expanding, useDeprecatedStyles, verticalAlign, columns, wrap, ...attributes } = props;

  const bXstyle = xstyle;
  const bExpanding = expanding === undefined ? false : expanding
  const bUseDeprecatedStyles = useDeprecatedStyles == undefined ? false : useDeprecatedStyles
  const bVerticalAlign = verticalAlign;
  const { columns: bColumns, wrap: bWrap } = React.useContext(BaseRowContext)

  return (
    <BaseViewReact
      {...attributes}
      ref={ref}
      xstyle={[
        bUseDeprecatedStyles ? j.item_DEPRECATED : j.item,
        bExpanding && j.expanding,
        bExpanding && bWrap !== "none" && j.expandingWithWrap,
        bColumns > 0 && k[bColumns],
        bVerticalAlign != null && l[bVerticalAlign],
        bXstyle
      ]} />
  )
}

baseRowItemReact.displayName = `${baseRowItemReact.name} [from BaseRowItem.react]`

const BaseRowItemReact = React.forwardRef(baseRowItemReact);

export default BaseRowItemReact;
export { BaseRowItemReact };
