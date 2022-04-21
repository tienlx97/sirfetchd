import React from "react";
import { CometColumnProps } from "./types";

const CometColumnContext = React.createContext<CometColumnProps | undefined>(
  undefined
);
export default CometColumnContext;
export { CometColumnContext };
