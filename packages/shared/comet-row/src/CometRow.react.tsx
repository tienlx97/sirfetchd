import React, { forwardRef, useContext, useMemo } from "react";
import { CometColumnContext, CometRowContext } from "@farfetchd/context"
import { CometRowItemReact } from "./CometRowItem.react"
import { CometColumnItemReact } from "./CometColumnItem.react"
import { BaseRowReact } from "@farfetchd/base-row"
import stylex from "@ladifire-opensource/stylex";

const $1 = stylex.create({
  4: { paddingRight: "4px", paddingLeft: "4px" },
  8: { paddingRight: "8px", paddingLeft: "8px" },
  12: { paddingRight: "12px", paddingLeft: "12px" },
  16: { paddingRight: "16px", paddingLeft: "16px" },
}),
  $2 = stylex.create({
    0: { paddingTop: 0 },
    4: { paddingTop: "4px" },
    8: { paddingTop: "8px" },
    12: { paddingTop: "12px" },
    16: { paddingTop: "16px" },
  }),
  $3 = stylex.create({
    4: { paddingBottom: "4px", paddingTop: "4px" },
    8: { paddingBottom: "8px", paddingTop: "8px" },
    12: { paddingBottom: "12px", paddingTop: "12px" },
    16: { paddingBottom: "16px", paddingTop: "16px" },
  }),
  $4 = stylex.create({
    4: { marginRight: "2px", marginLeft: "2px" },
    8: { marginRight: "4px", marginLeft: "4px" },
    12: { marginRight: "6px", marginLeft: "6px" },
    16: { marginRight: "8px", marginLeft: "8px" },
    24: { marginRight: "12px", marginLeft: "12px" },
    32: { marginRight: "16px", marginLeft: "16px" },
  }),
  $5 = stylex.create({
    4: { marginBottom: "2px", marginTop: "2px" },
    8: { marginBottom: "4px", marginTop: "4px" },
    12: { marginBottom: "6px", marginTop: "6px" },
    16: { marginBottom: "8px", marginTop: "8px" },
    24: { marginBottom: "12px", marginTop: "12px" },
    32: { marginBottom: "16px", marginTop: "16px" },
  });

interface Props {
  children?: React.ReactNode
  paddingHorizontal?: number
  paddingVertical?: number
  paddingTop?: number
  spacing?: number
  spacingHorizontal?: number
  spacingVertical?: number
  xstyle?: any
  expanding?: boolean
}

// null == undefined => true
// null === undefined => false
// check `value` is not null and not undefined => value != null
const cometRowReact = (props: Props, ref: any) => {
  const contextColumn = useContext(CometColumnContext)
  const contextCometRow = useContext(CometRowContext)
  let _paddingHorizontal = (contextColumn == null ? undefined : contextColumn.paddingHorizontal) != null ? 0 : 12
  const _spacing = (contextColumn == null ? undefined : contextColumn.spacing) != null ? 0 : 16

  const {
    children,
    paddingHorizontal,
    paddingVertical,
    paddingTop,
    spacing,
    spacingHorizontal,
    spacingVertical,
    xstyle,
    ...restProps
  } = props;

  paddingHorizontal !== undefined && (_paddingHorizontal = paddingHorizontal);
  const _paddingVertical = paddingVertical === undefined ? 0 : paddingVertical
 /*_spacing*/ const $spacing = paddingTop === undefined ? (paddingVertical == undefined ? _spacing : undefined) : paddingTop
  const _spacingHV = spacing == undefined ? 12 : spacing
  const _spacingHorizontal = spacingHorizontal == undefined ? _spacingHV : spacingHorizontal
  const _spacingVertical = spacingVertical == undefined ? _spacingHV : spacingVertical
  // xstyle

  const spacingHVMemo = useMemo(() => {
    return { spacingHorizontal: _spacingHorizontal, spacingVertical: _spacingVertical };
  }, [_spacingHorizontal, _spacingVertical]);

  const BaseRowReactElement = (
    <BaseRowReact
      {...restProps}
      ref={ref}
      xstyle={[
        $1[_paddingHorizontal],
        $3[_paddingVertical],
        $spacing != null && $2[$spacing],
        $4[_spacingHorizontal],
        $5[_spacingVertical],
        xstyle
      ]}
    >
      <CometRowContext.Provider value={spacingHVMemo} children={children} />
    </BaseRowReact>
  )
  if (contextCometRow != null)
    return <CometRowItemReact expanding={restProps.expanding} children={BaseRowReactElement} />

  return contextColumn != null ? (
    <CometColumnItemReact expanding={restProps.expanding} children={BaseRowReactElement} />
  ) : BaseRowReactElement
}

cometRowReact.displayName = `${cometRowReact.name} [from CometRowReact.react]`;

const CometRowReact = forwardRef(cometRowReact)

export default CometRowReact
export { CometRowReact }