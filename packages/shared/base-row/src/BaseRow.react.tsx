import React, { Ref, useMemo } from "react";
import BaseViewReact from "./BaseView.react"
import { BaseRowContext } from "@farfetchd/context";
import stylex from "@ladifire-opensource/stylex";
import { BaseRowProps } from "./types";


const $1 = stylex.create({
  expanding: {
    flexBasis: "0px",
    flexGrow: 1,
    flexShrink: "1",
    minWidth: 0,
  },

  row: { display: "flex", flexShrink: 0 },
})

const $2 = stylex.create({
  center: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  justify: { justifyContent: "space-between" },
  start: { justifyContent: "flex-start" },
})

const $3 = stylex.create({
  bottom: { alignItems: "flex-end}" },
  center: { alignItems: "center" },
  stretch: { alignItems: "stretch" },
  top: { alignItems: "flex-start" },
})

const $4 = stylex.create({
  backward: { flexDirection: "row-reverse" },
  forward: { flexDirection: "row" },
})

const $5 = stylex.create({
  backward: { flexWrap: "wrap-reverse" },
  forward: { flexWrap: "wrap" },
  none: { flexWrap: "nowrap" },
})

const $6 = { end: "start", start: "end" }

const baseRowReact = (props: BaseRowProps, ref: Ref<HTMLDivElement>) => {

  const {
    align,
    children,
    columns,
    direction,
    expanding,
    verticalAlign,
    wrap,
    xstyle,
    ...restProps
  } = props;

  const _align = align === undefined ? "justify" : align;
  const _columns = columns == undefined ? 0 : columns;
  const _direction = direction === undefined ? "forward" : direction;
  const _expanding = expanding === undefined ? false : expanding;
  const _verticalAlign = verticalAlign === undefined ? "stretch" : verticalAlign;
  const _wrap = wrap === undefined ? "none" : wrap;

  const baseRowContext = useMemo(() => {
    return { columns: _columns, wrap: _wrap }
  }, [_columns, _wrap]) // g,s

  return (
    <BaseViewReact
      {...Object.assign({}, restProps, {
        ref,
        xstyle: [
          $1.row,
          _expanding && $1.expanding,
          $2[_direction === "backward" && (_align === "start" || _align === "end") ? $6[_align] : _align],
          $3[_verticalAlign],
          $5[_wrap],
          $4[_direction],
          xstyle,
        ]
      })}>
      <BaseRowContext.Provider value={baseRowContext} children={children} />
    </BaseViewReact >
  );
}

baseRowReact.displayName = `${baseRowReact.name} [from BaseRow.react]`;

const BaseRowReact = React.forwardRef(baseRowReact);
export default BaseRowReact;
export { BaseRowReact };
