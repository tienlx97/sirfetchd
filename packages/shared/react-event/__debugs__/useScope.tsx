import React, { createRef } from "react";
const R = require("react");

type OwnProps = {
  toggle: boolean
}
const Unstable_Scope_Debug = (props: OwnProps) => {
  const testScopeQuery = (type, props) => true;
  const scopeRef = createRef<any>();
  const divRef = createRef<HTMLDivElement>();
  const spanRef = createRef<HTMLSpanElement>();
  const aRef = createRef<HTMLAnchorElement>();

  const onClick = () => {
    console.log(scopeRef)
    const nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(testScopeQuery);
    console.log(nodes)
  }


  return props.toggle ? (
    <R.unstable_Scope ref={scopeRef}>
      <div onClick={onClick} ref={divRef}>DIV</div>
      <span ref={spanRef}>SPAN</span>
      <a ref={aRef}>A</a>
    </R.unstable_Scope>
  ) : (
    <R.unstable_Scope ref={scopeRef}>
      <a ref={aRef}>A</a>
      <div ref={divRef}>DIV</div>
      <span ref={spanRef}>SPAN</span>
    </R.unstable_Scope>
  );

}

export { Unstable_Scope_Debug }