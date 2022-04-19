import React, { HTMLAttributes, Ref } from "react";
import stylex from "@ladifire-opensource/stylex"
import { LegacyHidden } from "@farfetchd/experimental"

interface Props extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  xstyle: any,
  suppressHydrationWarning?: boolean,
}

const styles = stylex.create({
  hidden: {
    display: "none"
  },
  root: {
    boxSizing: "border-box",
    position: "relative",
    zIndex: "0"
  }
});

const baseViewReact = (props: Props, ref: Ref<HTMLDivElement>) => {

  const { children, xstyle, suppressHydrationWarning, ...htmlAttributes } = props;
  const hidden = htmlAttributes.hidden === true;
  return (
    <LegacyHidden
      mode={hidden ? "hidden" : "visible"}
      suppressHydrationWarning={suppressHydrationWarning}
      ref={ref}
      htmlAttributes={Object.assign(htmlAttributes, {
        className: stylex([styles.root, xstyle, hidden && styles.hidden])
      })}>
      {children}
    </LegacyHidden>
  )
}

baseViewReact.displayName = `${baseViewReact.name} [from BaseView.react]`

const BaseViewReact = React.forwardRef(baseViewReact);
export default BaseViewReact;
export { BaseViewReact };