import React from "react";
import getReactComponentDisplayName from "./getReactComponentDisplayName";

function getReactElementDisplayName(element: React.ReactElement) {
  if (element == null) return "#empty";
  if (
    typeof element === "string" ||
    typeof element === "number" ||
    typeof element === "boolean"
  )
    return "#text";
  const type = element.type;
  if (type == null) return "ReactComponent";
  return typeof type === "string" ? type : getReactComponentDisplayName(type);
}

export default getReactElementDisplayName;
export { getReactElementDisplayName };
