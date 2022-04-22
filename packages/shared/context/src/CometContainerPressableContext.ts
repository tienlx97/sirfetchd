import React from "react";
import { CometContainerPressableProp } from "./types";
const CometContainerPressableContext = React.createContext<
  CometContainerPressableProp | undefined
>(undefined);

export default CometContainerPressableContext;
export { CometContainerPressableContext };
