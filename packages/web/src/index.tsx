import React from "react";
// const React = require("react");
const ReactDOMComet = require("react-dom");
const R = require("react");

// import { BaseRowItem_Test1 } from "@farfetchd/base-row/__tests__/BaseRowItem.test"
// import {
//   CometErrorBoundary_Test1
// } from "@farfetchd/errorguard/__tests__/commetErrorBoundary.test"
const root = ReactDOMComet.createRoot(document.getElementById("root")!);


interface OwnProp {
  clear: () => any
  setListener: (a, b) => any
}

const App = () => {

  const testScopeQuery = (type, props) => true;
  const TestScope = R.unstable_Scope;
  const scopeRef = R.createRef();
  const divRef = R.createRef();
  const spanRef = R.createRef();
  const aRef = R.createRef();

  function Test({ toggle }) {
    return toggle ? (
      <TestScope ref={scopeRef}>
        <div ref={divRef}>DIV</div>
        <span ref={spanRef}>SPAN</span>
        <a ref={aRef}>A</a>
      </TestScope>
    ) : (
      <TestScope ref={scopeRef}>
        <a ref={aRef}>A</a>
        <div ref={divRef}>DIV</div>
        <span ref={spanRef}>SPAN</span>
      </TestScope>
    );
  }

  return (
    <Test toggle={true} />
  )
}

root.render(<App />);


