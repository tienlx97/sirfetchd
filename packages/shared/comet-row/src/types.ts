import { Error2 } from "@farfetchd/errorguard";
import React from "react";

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
