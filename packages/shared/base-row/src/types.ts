import React, { HTMLAttributes } from "react";
import { Error2 } from "@farfetchd/errorguard";

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

export interface CometRowItemProps {
  children?: React.ReactNode;
  expanding?: boolean;
  xstyle?: any;
  fallback?: (error?: Error2, moduleName?: string) => any;
  placeholder?: string;
  useDeprecatedStyles?: boolean;
}

export interface CometRowReactProps {
  children?: React.ReactNode;
  paddingHorizontal?: number;
  paddingVertical?: number;
  paddingTop?: number;
  spacing?: number;
  spacingHorizontal?: number;
  spacingVertical?: number;
  xstyle?: any;
  expanding?: boolean;
}

export interface CometColumnItemReactProps {
  children?: React.ReactNode;
  paddingTop?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  expanding?: boolean;
  verticalAlign?: string;
  placeholder?: any;
  fallback?: any;
  align?: any;
  xstyle?: any;
}
