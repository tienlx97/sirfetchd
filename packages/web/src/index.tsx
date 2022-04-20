import React from "react";
// const React = require("react");
const ReactDOM = require("react-dom");

// import { BaseRowItem_Test1 } from "@farfetchd/baserow/__tests__/BaseRowItem.test"

import { performanceNow } from "@farfetchd/utils"
const GlobalDeclare = () => {
  const now = performanceNow()
  return <div>{now}</div>
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<GlobalDeclare />);
