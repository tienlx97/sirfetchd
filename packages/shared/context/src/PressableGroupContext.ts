import React, { createContext } from "react";
import { PressableGroupContextProps } from "./types";

const pressableGroupContext = createContext<
  undefined | PressableGroupContextProps
>(undefined);

export default pressableGroupContext;
export { pressableGroupContext };
