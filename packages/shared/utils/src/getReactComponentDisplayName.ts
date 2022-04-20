import React from "react";

function getReactComponentDisplayName(comp: any): string {
  const displayName = comp.displayName;
  return (
    (displayName != null ? displayName : "") || comp.name || "ReactComponent"
  );
}

export default getReactComponentDisplayName;
export { getReactComponentDisplayName };
