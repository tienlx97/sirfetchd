import React, { createContext, createRef } from "react";
const R = require("react"); // for experimental
import { render } from '@testing-library/react'

describe('ReactDOMComet', () => {

  const TestScope = R.unstable_Scope

  it("DO_NOT_USE_queryAllNodes() works as intended", () => {
    const testScopeQuery = (type, props) => true;
    const scopeRef = createRef<any>();
    const divRef = createRef<HTMLDivElement>();
    const spanRef = createRef<HTMLSpanElement>();
    const aRef = createRef<HTMLAnchorElement>();


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

    const { rerender } = render(<Test toggle={true} />)
    let nodes = scopeRef.current?.DO_NOT_USE_queryAllNodes(testScopeQuery);
    expect(nodes).toEqual([divRef.current, spanRef.current, aRef.current]);

    rerender(<Test toggle={false} />)
    nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(testScopeQuery);
    expect(nodes).toEqual([aRef.current, divRef.current, spanRef.current]);

    rerender(<></>)
    expect(scopeRef.current).toBe(null);
  });

  it('DO_NOT_USE_queryAllNodes() works as intended', () => {
    const testScopeQuery = (type, props) => type === 'div';
    const scopeRef = createRef<any>();
    const divRef = createRef<HTMLDivElement>();
    const spanRef = createRef<HTMLSpanElement>();
    const aRef = createRef<HTMLAnchorElement>();

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

    //
    const { rerender } = render(<Test toggle={true} />)
    let nodes = scopeRef.current?.DO_NOT_USE_queryAllNodes(testScopeQuery);
    expect(nodes).toEqual([divRef.current]);

    let filterQuery = (type, props, instance) =>
      instance === spanRef.current || testScopeQuery(type, props);

    //
    nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(filterQuery);
    expect(nodes).toEqual([divRef.current, spanRef.current]);

    filterQuery = (type, props, instance) =>
      [spanRef.current, aRef.current].includes(instance) ||
      testScopeQuery(type, props);

    // 
    nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(filterQuery);
    expect(nodes).toEqual([divRef.current, spanRef.current, aRef.current]);

    rerender(<Test toggle={false} />)
    filterQuery = (type, props, instance) =>
      [spanRef.current, aRef.current].includes(instance) ||
      testScopeQuery(type, props);
    nodes = scopeRef.current.DO_NOT_USE_queryAllNodes(filterQuery);
    expect(nodes).toEqual([aRef.current, divRef.current, spanRef.current]);

    rerender(<></>)
    expect(scopeRef.current).toBe(null);

  });

  // @gate www
  it('DO_NOT_USE_queryFirstNode() works as intended', () => {
    const testScopeQuery = (type, props) => true;
    const scopeRef = createRef<any>();
    const divRef = createRef<HTMLDivElement>();
    const spanRef = createRef<HTMLSpanElement>();
    const aRef = createRef<HTMLAnchorElement>();

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

    const { rerender } = render(<Test toggle={true} />);
    let node = scopeRef.current.DO_NOT_USE_queryFirstNode(testScopeQuery);
    expect(node).toEqual(divRef.current);

    rerender(<Test toggle={false} />);
    node = scopeRef.current.DO_NOT_USE_queryFirstNode(testScopeQuery);
    expect(node).toEqual(aRef.current);

    rerender(<></>);
    expect(scopeRef.current).toBe(null);
  });


  it('containsNode() works as intended', () => {
    const scopeRef = createRef<any>();
    const divRef = createRef<HTMLDivElement>();
    const spanRef = createRef<HTMLSpanElement>();
    const aRef = createRef<HTMLAnchorElement>();

    const outerSpan = createRef<HTMLSpanElement>();
    const emRef = createRef<HTMLElement>();

    function Test({ toggle }) {
      return toggle ? (
        <div>
          <span ref={outerSpan}>SPAN</span>
          <TestScope ref={scopeRef}>
            <div ref={divRef}>DIV</div>
            <span ref={spanRef}>SPAN</span>
            <a ref={aRef}>A</a>
          </TestScope>
          <em ref={emRef}>EM</em>
        </div>
      ) : (
        <div>
          <TestScope ref={scopeRef}>
            <a ref={aRef}>A</a>
            <div ref={divRef}>DIV</div>
            <span ref={spanRef}>SPAN</span>
            <em ref={emRef}>EM</em>
          </TestScope>
          <span ref={outerSpan}>SPAN</span>
        </div>
      );
    }

    const { rerender } = render(<Test toggle={true} />);
    expect(scopeRef.current.containsNode(divRef.current)).toBe(true);
    expect(scopeRef.current.containsNode(spanRef.current)).toBe(true);
    expect(scopeRef.current.containsNode(aRef.current)).toBe(true);
    expect(scopeRef.current.containsNode(outerSpan.current)).toBe(false);
    expect(scopeRef.current.containsNode(emRef.current)).toBe(false);

    rerender(<Test toggle={false} />);
    expect(scopeRef.current.containsNode(divRef.current)).toBe(true);
    expect(scopeRef.current.containsNode(spanRef.current)).toBe(true);
    expect(scopeRef.current.containsNode(aRef.current)).toBe(true);
    expect(scopeRef.current.containsNode(outerSpan.current)).toBe(false);
    expect(scopeRef.current.containsNode(emRef.current)).toBe(true);

    rerender(<Test toggle={true} />);
    expect(scopeRef.current.containsNode(emRef.current)).toBe(false);
  });

  it('getChildContextValues() works as intended', () => {
    const TestContext = createContext<number | null>(null);
    const scopeRef = React.createRef<any>();

    function Test({ toggle }) {
      return toggle ? (
        <TestScope ref={scopeRef}>
          <TestContext.Provider value={1} />
        </TestScope>
      ) : (
        <TestScope ref={scopeRef}>
          <TestContext.Provider value={1} />
          <TestContext.Provider value={2} />
        </TestScope>
      );
    }

    const { rerender } = render(<Test toggle={true} />);
    let nodes = scopeRef.current.getChildContextValues(TestContext);
    expect(nodes).toEqual([1]);

    rerender(<Test toggle={false} />);
    nodes = scopeRef.current.getChildContextValues(TestContext);
    expect(nodes).toEqual([1, 2]);

    rerender(<></>);
    expect(scopeRef.current).toBe(null);
  });

});
