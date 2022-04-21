import React, { HTMLAttributes, Ref } from "react";
import stylex from "@ladifire-opensource/stylex"
import { LegacyHidden } from "@farfetchd/experimental"

interface Props extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  suppressHydrationWarning?: boolean,
  xstyle?: any,
  // 
}

type style = "root" | "hidden"

const styles = stylex.create<style>({
  hidden: {
    display: "none"
  },
  root: {
    boxSizing: "border-box",
    position: "relative",
    zIndex: 0
  }
});

const baseViewReact = (props: Props, ref: Ref<HTMLDivElement>) => {

  const { children, xstyle, suppressHydrationWarning, ...restProps } = props;

  const hidden = restProps.hidden === true;
  return (
    <LegacyHidden
      htmlAttributes={Object.assign({}, restProps, {
        className: stylex([styles.root, xstyle, hidden && styles.hidden]),
        mode: hidden ? "hidden" : "visible",
        ref,
        suppressHydrationWarning,
        children
      })}
    />
  )
}

baseViewReact.displayName = `${baseViewReact.name} [from BaseView.react]`

const BaseViewReact = React.forwardRef(baseViewReact);
export default BaseViewReact;
export { BaseViewReact };