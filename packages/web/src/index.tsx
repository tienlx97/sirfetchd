import React from "react";
// const React = require("react");
const ReactDOM = require("react-dom");

// import { BaseRowItem_Test1 } from "@farfetchd/base-row/__tests__/BaseRowItem.test"
// import {
//   CometErrorBoundary_Test1
// } from "@farfetchd/errorguard/__tests__/commetErrorBoundary.test"
const root = ReactDOM.createRoot(document.getElementById("root")!);

const App = () => {

  const onClick = (e) => {
    console.log(e)
  }

  return (
    <input type="checkbox" onMouseUp={onClick} />
  )
}

root.render(<App />);


