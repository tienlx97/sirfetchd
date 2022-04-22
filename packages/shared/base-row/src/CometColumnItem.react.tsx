import React, { forwardRef, useContext } from "react";
import UserAgent from "@reacttips/useragent"
import { CometColumnContext, CometColumnProps } from "@farfetchd/context"
import { BaseViewReact } from "./BaseView.react"
import { CometErrorBoundaryReact } from "@farfetchd/errorguard";
import stylex from "@ladifire-opensource/stylex";
import { CometColumnItemReactProps } from "./types";

const $1 = stylex.create({
  divider: {
    borderTopColor: "var(--divider)",
    borderTopStyle: "solid",
    borderTopWidth: "1px",
    ":first-child": { display: "none" },
  },

  expanding: {
    flexBasis: "100%",
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
  },

  expandingIE11: { flexBasis: "auto" },

  root: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    maxWidth: "100%",
  },
})

const $2 = stylex.create({
  center: { alignItems: "center" },
  end: { alignItems: "flex-end" },
  start: { alignItems: "flex-start" },
})
const $3 = stylex.create({
  4: { paddingRight: "4px", paddingLeft: "4px" },
  8: { paddingRight: "8px", paddingLeft: "8px" },
  12: { paddingRight: "12px", paddingLeft: "12px" },
  16: { paddingRight: "16px", paddingLeft: "16px" },
  20: { paddingRight: "20px", paddingLeft: "20px" },
})
const $4 = stylex.create({
  0: { paddingTop: 0 },
  4: { paddingTop: "4px" },
  8: { paddingTop: "8px" },
  12: { paddingTop: "12px" },
  16: { paddingTop: "16px" },
  20: { paddingTop: "20px" },
})
const $5 = stylex.create({
  4: { paddingTop: "4px", paddingBottom: "4px" },
  8: { paddingTop: "8px", paddingBottom: "8px" },
  12: { paddingTop: "12px", paddingBottom: "12px" },
  16: { paddingTop: "16px", paddingBottom: "16px" },
  20: { paddingTop: "20px", paddingBottom: "20px" },
})
const $6 = stylex.create({
  4: { marginTop: "2px", marginBottom: "2px" },
  8: { marginTop: "4px", marginBottom: "4px" },
  12: { marginTop: "6px", marginBottom: "6px" },
  16: { marginTop: "8px", marginBottom: "8px" },
  20: { marginTop: "10px", marginBottom: "10px" },
  24: { marginTop: "12px", marginBottom: "12px" },
  32: { marginTop: "16px", marginBottom: "16px" },
  40: { marginTop: "20px", marginBottom: "20px" },
})
const $7 = stylex.create({
  bottom: { justifyContent: "flex-end" },
  center: { justifyContent: "center" },
  "space-between": { justifyContent: "space-between" },
})
const $8 = stylex.create({
  4: { marginRight: "4px", marginLeft: "4px" },
  8: { marginRight: "8px", marginLeft: "8px" },
  12: { marginRight: "12px", marginLeft: "12px" },
  16: { marginRight: "16px", marginLeft: "16px" },
  20: { marginRight: "20px", marginLeft: "20px" },
})
const isBrowser = UserAgent.isBrowser("IE >= 11");


const cometColumnItemReact = (props: CometColumnItemReactProps, ref: any) => {

  const {
    align,
    children,
    expanding,
    fallback,
    paddingHorizontal,
    paddingTop,
    paddingVertical,
    placeholder,
    verticalAlign,
    xstyle,
    ...restProps
  } = props;

  const contextCometColumn = useContext(CometColumnContext) != null ? useContext(CometColumnContext) : {} as CometColumnProps

  let _align, _expanding, _paddingHorizontal, _paddingVertical, _verticalAlign;

  if (align === undefined) {
    if (contextCometColumn?.align != undefined)
      _align = contextCometColumn.align
    else
      _align = "stretch"
  } else {
    _align = align
  }

  // cChildren = children
  // cFallback = fallback
  // cPaddingTop = paddingTop
  // cPlaceholder = placeholder

  if (expanding == undefined) {
    _expanding = false
  } else {
    _expanding = expanding
  }

  if (paddingHorizontal == undefined) {
    if (contextCometColumn?.paddingHorizontal != undefined)
      _paddingHorizontal = contextCometColumn.align
    else
      _paddingHorizontal = 0
  } else {
    _paddingHorizontal = paddingHorizontal
  }

  if (paddingVertical == undefined) {
    _paddingVertical = 0
  } else {
    _paddingVertical = paddingVertical
  }

  if (verticalAlign == undefined) {
    _verticalAlign = "top"
  } else {
    _verticalAlign = verticalAlign
  }

  let element = (
    <React.Fragment>
      {contextCometColumn?.hasDividers != undefined && (
        <BaseViewReact
          role="separator"
          xstyle={[
            $1.divider,
            $8[contextCometColumn.paddingHorizontal != undefined
              ? contextCometColumn.paddingHorizontal
              : 0
            ]
          ]}
        />
      )}
      {
        <BaseViewReact
          {...restProps}
          ref={ref}
          xstyle={[
            $1.root,
            _expanding && [$1.expanding, isBrowser && $1.expandingIE11],
            _align !== "stretch" && $2[_align],
            _verticalAlign !== "top" && $7[_verticalAlign],
            contextCometColumn?.spacing != null && $6[contextCometColumn?.spacing],
            $3[_paddingHorizontal],
            $5[_paddingVertical],
            paddingTop != null && $4[paddingTop],
            xstyle, //
          ]}
        // {...Object.assign({}, restProps, {
        //   ref,
        //   xstyle: [
        //     $1.root,
        //     _expanding && [$1.expanding, isBrowser && $1.expandingIE11],
        //     _align !== "stretch" && $2[_align],
        //     _verticalAlign !== "top" && $7[_verticalAlign],
        //     contextCometColumn?.spacing != null && $6[contextCometColumn?.spacing],
        //     $3[_paddingHorizontal],
        //     $5[_paddingVertical],
        //     paddingTop != null && $4[paddingTop],
        //     restProps.xstyle,
        //   ]
        // })}
        >
          <CometColumnContext.Provider value={undefined} children={children} />
        </BaseViewReact>
      }
    </React.Fragment>
  )

  if (fallback != undefined) {
    fallback;
    const { fallback: _, ...propsWithoutFallback } = props
    if (fallback == null) {
      element = <CometErrorBoundaryReact children={element} />
    } else {
      element = (
        <CometErrorBoundaryReact
          fallback={(error, moduleName) => {
            <CometColumnItemReact
              {...propsWithoutFallback}
              ref={ref}
              children={typeof fallback === "function" ? fallback(error, moduleName) : fallback}
            // {...Object.assign({}, propsWithoutFallback, {
            //   ref,
            //   children: typeof fallback === "function" ? fallback(error, moduleName) : fallback
            // })}
            />
          }}
          children={element}
        />
      )
    }
  }

  if (placeholder !== undefined) {
    // a.placeholder;
    // A = babelHelpers.objectWithoutPropertiesLoose(a, ["placeholder"]);
    // g = h.jsx(c("CometPlaceholder.react"), {
    //   fallback:
    //     y != null
    //       ? h.jsx(
    //           s,
    //           babelHelpers["extends"]({}, A, { ref: b, children: y })
    //         )
    //       : null,
    //   children: g,
    // });
  }

  return element
}

cometColumnItemReact.displayName = `${cometColumnItemReact.name} [from CometColumnItem.react]`

const CometColumnItemReact = forwardRef(cometColumnItemReact)
export default CometColumnItemReact
export { CometColumnItemReact }