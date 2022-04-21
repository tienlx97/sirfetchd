import React from "react";

export interface LegacyHiddenProps {
  children?: React.ReactNode;
  mode?: string;
  suppressHydrationWarning?: boolean;
  htmlAttributes: any;
}
