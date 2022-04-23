import React from "react";
// const React = require("react");
const ReactDOM = require("react-dom");

// import { BaseRowItem_Test1 } from "@farfetchd/base-row/__tests__/BaseRowItem.test"
// import {
//   CometErrorBoundary_Test1
// } from "@farfetchd/errorguard/__tests__/commetErrorBoundary.test"
const root = ReactDOM.createRoot(document.getElementById("root")!);

interface OwnProp {
  clear: () => any
  setListener: (a, b) => any
}

const App = () => {

  const ref = React.useRef<OwnProp>()
  const onClick = (e) => {
    console.log(e)
    console.log(ref.current)
  }

  return (
    <input type="checkbox" onMouseUp={onClick} />
  )
}

root.render(<App />);


