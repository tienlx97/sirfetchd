import React, { HTMLAttributes, Ref, useMemo } from "react";
import BaseViewReact from "./BaseView.react"
import { BaseRowContext } from "@farfetchd/context";
import stylex from "@ladifire-opensource/stylex";

interface Props extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  xstyle: any;
  align?: string;
  expanding?: boolean;
  verticalAlign?: string;
  columns?: number;
  direction?: string
  wrap?: string
}


const rowBaseStyle = {
  expanding: {
    flexBasis: "0px",
    flexGrow: 1,
    flexShrink: "1",
    minWidth: 0,
  },
  row: { display: "flex", flexShrink: 0 },
}

const justifyContentStyle = {
  center: { justifyContent: "center" },
  end: { justifyContent: "flex-end" },
  justify: { justifyContent: "space-between" },
  start: { justifyContent: "flex-start" },
}

const alignItemsStyle = {
  bottom: { alignItems: "flex-end}" },
  center: { alignItems: "center" },
  stretch: { alignItems: "stretch" },
  top: { alignItems: "flex-start" },
}

const flexDirectionStyle = {
  backward: { flexDirection: "row-reverse" },
  forward: { flexDirection: "row" },
}

const flexWrapStyle = {
  backward: { flexWrap: "wrap-reverse" },
  forward: { flexWrap: "wrap" },
  none: { flexWrap: "nowrap" },
}

const endStartReverseStyle = { end: "start", start: "end" }

const baseRowReact = (props: Props, ref: Ref<HTMLDivElement>) => {

  const { children, xstyle, align, columns, direction, expanding, verticalAlign, wrap, ...htmlAtrributes } = props;

  const baseAlign = align === undefined ? "justify" : align;
  const baseColumns = columns == undefined ? 0 : columns;
  const baseDirection = direction === undefined ? "forward" : direction;
  const baseExpanding = expanding === undefined ? false : expanding;
  const baseVerticalAlign = verticalAlign === undefined ? "stretch" : verticalAlign;
  const baseWrap = wrap === undefined ? "none" : wrap;
  const baseRowContext = useMemo(() => {
    return { columns: baseColumns, wrap: baseWrap }
  }, [baseColumns, baseWrap]) // g,s

  return (
    <BaseViewReact
      {...htmlAtrributes}
      ref={ref}
      xstyle={[
        stylex(rowBaseStyle.row),
        baseExpanding && stylex(rowBaseStyle.expanding),
        stylex(justifyContentStyle[baseDirection === "backward" && (baseAlign === "start" || baseAlign === "end") ? endStartReverseStyle[baseAlign] : baseAlign]),
        stylex(alignItemsStyle[baseVerticalAlign]),
        stylex(flexWrapStyle[baseWrap]),
        stylex(flexDirectionStyle[baseDirection]),
        xstyle,
      ]}
    >
      <BaseRowContext.Provider value={baseRowContext} children={children} />
    </BaseViewReact >
  );
}

baseRowReact.displayName = `${baseRowReact.name} [from BaseRow.react]`;

const BaseRowReact = React.forwardRef(baseRowReact);
export default BaseRowReact;
export { BaseRowReact };
