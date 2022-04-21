import React from "react";

interface Props {
  spacingHorizontal: number;
  spacingVertical: number;
}
const CometRowContext = React.createContext<Props | null>(null);
export default CometRowContext;
export { CometRowContext };
