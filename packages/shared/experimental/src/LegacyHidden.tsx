import React, { Ref } from "react";
const R = require("react")

interface Props {
  children?: React.ReactNode;
  mode?: string;
  suppressHydrationWarning?: boolean,
  htmlAttributes: any
}

const legacyHidden = (props: Props, ref: Ref<HTMLDivElement>) => {

  const {
    children, mode, suppressHydrationWarning, htmlAttributes
  } = props;

  return (
    <div
      {...Object.assign({}, htmlAttributes, {
        hidden: mode === "hidden" ? true : undefined,
        ref,
        suppressHydrationWarning,
      })}
    >
      <R.unstable_LegacyHidden
        mode={mode === "hidden" ? "unstable-defer-without-hiding" : mode}
      >
        {children}
      </R.unstable_LegacyHidden>
    </div>
  )
}

legacyHidden.displayName = `${legacyHidden.name} [from LegacyHidden]`
legacyHidden.displayName = "LegacyHidden"

const LegacyHidden = React.forwardRef(legacyHidden);

export default LegacyHidden;
export { LegacyHidden }
