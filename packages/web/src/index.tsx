import React, { SyntheticEvent } from "react";
// const React = require("react");
const ReactDOMComet = require("react-dom");
const R = require("react");

// import { BaseRowItem_Test1 } from "@farfetchd/base-row/__tests__/BaseRowItem.test"
// import {
//   CometErrorBoundary_Test1
// } from "@farfetchd/errorguard/__tests__/commetErrorBoundary.test"

import { Unstable_Scope_Debug } from "@farfetchd/react-event/__debugs__/useScope"
import { ReactFocusEvent_React } from "@farfetchd/react-event"

const root = ReactDOMComet.createRoot(document.getElementById("root")!);


const OnFocus_Test = () => {

  const onFocus = (e) => {
    console.log(Date.now().toString())
  }

  const ref = React.createRef<HTMLInputElement>();
  const innerRef = React.createRef<HTMLAnchorElement>();

  ReactFocusEvent_React.useFocus(ref, {
    onFocus
  })

  return (
    <>
      {/* <div ref={ref}>
       <a ref={innerRef} />
     </div> */}
      <input ref={ref} />
    </>
  )
}

root.render(<Unstable_Scope_Debug toggle={true} />);


