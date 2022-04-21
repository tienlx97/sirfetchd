import React, { HTMLAttributes } from "react";

export interface BaseViewProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  suppressHydrationWarning?: boolean;
  xstyle?: any;
  //
}

export interface BaseRowProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  xstyle: any;
  align?: string;
  expanding?: boolean;
  verticalAlign?: string;
  columns?: number;
  direction?: string;
  wrap?: string;
}
