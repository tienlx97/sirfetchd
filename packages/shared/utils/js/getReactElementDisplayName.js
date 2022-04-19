__d(
  "getReactElementDisplayName",
  ["getReactComponentDisplayName", "react"],
  function (a, b, c, d, e, f, g) {
    "use strict";
    d("react");
    function a(a) {
      if (a == null) return "#empty";
      if (
        typeof a === "string" ||
        typeof a === "number" ||
        typeof a === "boolean"
      )
        return "#text";
      a = a.type;
      if (a == null) return "ReactComponent";
      return typeof a === "string" ? a : c("getReactComponentDisplayName")(a);
    }
    g["default"] = a;
  },
  98
);
