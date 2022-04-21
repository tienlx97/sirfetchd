import React from "react";
import { CometRowProps } from "./types";

const CometRowContext = React.createContext<CometRowProps | undefined>(
  undefined
);
export default CometRowContext;
export { CometRowContext };
