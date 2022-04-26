import ReactFocusEvent_React from '../src/ReactFocusEvent.react';

const DomTestingLib = require("@farfetchd/dom-event-testing-library");

let React;
let ReactDOM;
let useFocus;
let Scheduler;

const { createEventTarget, setPointerEvent } = DomTestingLib;

function initializeModules(hasPointerEvents) {
  setPointerEvent(hasPointerEvents);
  jest.resetModules();
  React = require("react");
  ReactDOM = require("react-dom");
  Scheduler = require("scheduler");

  // TODO: This import throws outside of experimental mode. Figure out better
  // strategy for gated imports.
  useFocus = ReactFocusEvent_React.useFocus;
}

const forcePointerEvents = true;
const table = [[forcePointerEvents], [!forcePointerEvents]];

describe.each(table)(`useFocus hasPointerEvents=%s`, (hasPointerEvents) => {
  let container;

  beforeEach(() => {
    initializeModules(hasPointerEvents);
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.createRoot(container).render(null);
    document.body.removeChild(container);
    container = null;
  });

  describe("disabled", () => {
    let onBlur, onFocus, ref;

    const componentInit = () => {
      onBlur = jest.fn();
      onFocus = jest.fn();
      ref = React.createRef();
      const Component = () => {
        useFocus(ref, {
          disabled: true,
          onBlur,
          onFocus,
        });
        return <div ref={ref} />;
      };
      ReactDOM.createRoot(container).render(<Component />);
      Scheduler.unstable_flushAll();
    };

    // @gate www
    it("does not call callbacks", () => {
      componentInit();
      const target = createEventTarget(ref.current);
      target.focus();
      target.blur();
      expect(onFocus).not.toBeCalled();
      expect(onBlur).not.toBeCalled();
    });
  });
});
