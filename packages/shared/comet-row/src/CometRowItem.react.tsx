import React, { forwardRef, useContext } from "react";
import { CometErrorBoundaryReact } from "@farfetchd/errorguard";
import { CometColumnContext, CometRowContext } from "@farfetchd/context";
import { BaseRowItemReact } from "@farfetchd/base-row";
import stylex from "@ladifire-opensource/stylex";
import { Error2 } from "@farfetchd/errorguard";
import { CometRowItemProps } from "./types";

// paddingRightLef
const $1 = stylex.create<4 | 8 | 12 | 16 | 24 | 32>({
  4: {
    paddingRight: "2px",
    paddingLeft: "2px",
  },
  8: {
    paddingRight: "4px",
    paddingLeft: "4px",
  },
  12: {
    paddingRight: "6px",
    paddingLeft: "6px",
  },
  16: {
    paddingRight: "8px",
    paddingLeft: "8px",
  },
  24: {
    paddingRight: "12px",
    paddingLeft: "12px",
  },
  32: {
    paddingRight: "16px",
    paddingLeft: "16px",
  },
});

// paddingBottomTop
const $2 = stylex.create<4 | 8 | 12 | 16 | 24 | 32>({
  4: { paddingBottom: "2px", paddingTop: "2px" },
  8: { paddingBottom: "4px", paddingTop: "4px" },
  12: { paddingBottom: "6px", paddingTop: "6px" },
  16: { paddingBottom: "8px", paddingTop: "8px" },
  24: { paddingBottom: "12px", paddingTop: "12px" },
  32: { paddingBottom: "16px", paddingTop: "16px" },
});



const cometRowItemReact = (props: CometRowItemProps, ref: any) => {

  const { spacingHorizontal, spacingVertical } = useContext(CometRowContext)!

  const {
    fallback,
    placeholder,
    children,
    xstyle,
    ...restProps
  } = props

  if (placeholder != undefined) {
    // a.placeholder;
    // var n = babelHelpers.objectWithoutPropertiesLoose(a, ["placeholder"]);
    // return h.jsx(c("CometPlaceholder.react"), {
    //   fallback:
    //     g != null
    //       ? h.jsx(
    //           l,
    //           babelHelpers["extends"]({}, n, { ref: b, children: g })
    //         )
    //       : null,
    //   children: h.jsx(l, babelHelpers["extends"]({}, n, { ref: b })),
    // });
  }

  if (fallback != undefined) {
    props.fallback
    const { fallback: _, ...propsWithoutFallback } = props;
    return (
      fallback == null ? (
        <CometErrorBoundaryReact>
          <CometRowItemReact
            {...propsWithoutFallback}
            ref={ref}
          // {...Object.assign({}, propsWithoutFallback, { ref })}
          />
        </CometErrorBoundaryReact>
      ) : (
        <CometErrorBoundaryReact
          fallback={(error, moduleName) => {
            return (
              <CometRowItemReact
                {...propsWithoutFallback}
                ref={ref}
                children={typeof fallback === "function" ? fallback(error, moduleName) : fallback}
              // {...Object.assign({}, propsWithoutFallback, {
              //   ref,
              //   children: typeof fallback === "function" ? fallback(error, moduleName) : fallback
              // })}
              />
            )
          }}>
          <CometRowItemReact
            {...propsWithoutFallback}
            ref={ref}
          // {...Object.assign({}, propsWithoutFallback, { ref })}
          />
        </CometErrorBoundaryReact>
      )
    )
  }

  return (
    <BaseRowItemReact
      {...restProps}
      ref={ref}
      xstyle={[
        $1[spacingHorizontal],
        $2[spacingVertical],
        xstyle
      ]}
    // {...Object.assign({}, restProps, {
    //   ref,
    //   useDeprecatedStyles: restProps.useDeprecatedStyles,
    //   xstyle: [
    //     $1[spacingHorizontal],
    //     $2[spacingVertical],
    //     restProps.xstyle
    //   ]
    // })}
    >
      <CometRowContext.Provider children={children} value={undefined} />
    </BaseRowItemReact>
  );
};

cometRowItemReact.displayName = `${cometRowItemReact.name} [from CometRowItem.react]`;

const CometRowItemReact = forwardRef(cometRowItemReact)

export default CometRowItemReact
export { CometRowItemReact }