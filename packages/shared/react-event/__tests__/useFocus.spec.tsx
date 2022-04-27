import ReactFocusEvent_React from '../src/ReactFocusEvent.react';
import { render } from '@testing-library/react'
import React, { createRef } from "react"
const DomTestingLib = require("@farfetchd/dom-event-testing-library");
const Scheduler = require("scheduler")

let useFocus;

const { createEventTarget, setPointerEvent } = DomTestingLib;

function initializeModules(hasPointerEvents) {
  setPointerEvent(hasPointerEvents);
  jest.resetModules();

  useFocus = ReactFocusEvent_React.useFocus;
}

const forcePointerEvents = true;
const table = [[forcePointerEvents], [!forcePointerEvents]];

describe.each(table)(`useFocus hasPointerEvents=%s`, (hasPointerEvents) => {

  beforeEach(() => {
    initializeModules(hasPointerEvents);
  });

  // describe("disabled", () => {
  //   let onBlur, onFocus, ref;

  //   const componentInit = () => {
  //     onBlur = jest.fn();
  //     onFocus = jest.fn();
  //     ref = React.createRef();
  //     const Component = () => {
  //       useFocus(ref, {
  //         disabled: true,
  //         onBlur,
  //         onFocus,
  //       });
  //       return <div ref={ref} />;
  //     };
  //     render(<Component />);
  //     Scheduler.unstable_flushAll();
  //   };

  //   // @gate www
  //   it("does not call callbacks", () => {
  //     componentInit();
  //     const target = createEventTarget(ref.current);
  //     target.focus();
  //     target.blur();
  //     expect(onFocus).not.toBeCalled();
  //     expect(onBlur).not.toBeCalled();
  //   });
  // });


  describe('onFocus', () => {
    const onFocus = jest.fn();
    const ref = createRef<HTMLDivElement>();
    const innerRef = createRef<HTMLAnchorElement>();
    const componentInit = () => {


      const Component = () => {
        useFocus(ref, {
          onFocus,
        });
        return (
          <div ref={ref}>
            <a ref={innerRef} />
          </div>
        );
      };
      render(<Component />);
      Scheduler.unstable_flushAll();
    };

    // @gate www
    it('is called after "focus" event', () => {
      componentInit();
      const target = createEventTarget(ref.current);
      target.focus();
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    // @gate www
    it('is not called if descendants of target receive focus', () => {
      componentInit();
      const target = createEventTarget(innerRef.current);
      target.focus();
      expect(onFocus).not.toBeCalled();
    });
  });

});
