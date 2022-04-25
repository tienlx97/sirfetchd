import React from "react";

const R = require("react");

describe('ReactDOM', () => {
  let ReactDOMComet;
  let container;

  beforeEach(() => {
    ReactDOMComet = require('react-dom');
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it("DO_NOT_USE_queryAllNodes() works as intended", () => {
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

    ReactDOMComet.render(<Test toggle={true} />, container);
    let nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(testScopeQuery);
    expect(nodes).toEqual([divRef.current, spanRef.current, aRef.current]);
    ReactDOMComet.render(<Test toggle={false} />, container);
    nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(testScopeQuery);
    expect(nodes).toEqual([aRef.current, divRef.current, spanRef.current]);
    ReactDOMComet.render(null, container);
    expect(scopeRef.current).toBe(null);
  });

});
