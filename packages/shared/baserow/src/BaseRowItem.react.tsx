import React, { Ref } from "react";
import { BaseRowContext } from "@farfetchd/context"
import { BaseViewReact } from "./BaseView.react"

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  xstyle: any
  expanding?: boolean
  useDeprecatedStyles?: boolean
  verticalAlign?: string
  columns?: number
  wrap?: string
}

const j = {
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
  }
}
  , k = {
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
      flexBasis: ":calc(100% / 7)"
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
  }
  , l = {
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
  };

const baseRowItemReact = (props: Props, ref: Ref<HTMLDivElement>) => {

  const { children, xstyle, expanding, useDeprecatedStyles, verticalAlign, columns, wrap, ...attributes } = props;

  const bExpanding = expanding === undefined ? false : expanding
  const bUseDeprecatedStyles = useDeprecatedStyles == undefined ? false : useDeprecatedStyles
  const bVerticalAlign = verticalAlign;
  const bWrap = wrap
  const bRowContext = React.useContext(BaseRowContext)
  const bColumns = bRowContext.columns

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
        xstyle
      ]}
    >
      {children}
    </BaseViewReact>
  )
}

baseRowItemReact.displayName = `${baseRowItemReact.name} [from BaseRowItem.react]`

const BaseRowItemReact = React.forwardRef(baseRowItemReact);

export default BaseRowItemReact;
export { BaseRowItemReact };
