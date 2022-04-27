import React, { SyntheticEvent } from "react";
// const React = require("react");
const ReactDOMComet = require("react-dom");
const R = require("react");

// import { BaseRowItem_Test1 } from "@farfetchd/base-row/__tests__/BaseRowItem.test"
// import {
//   CometErrorBoundary_Test1
// } from "@farfetchd/errorguard/__tests__/commetErrorBoundary.test"

import { Unstable_Scope_Debug } from "@farfetchd/react-event/__debugs__/useScope"
import { UseFocus_disabled, UseFocus_onBlur, UseFocus_onFocus } from "@farfetchd/react-event/__debugs__/useFocus"

const root = ReactDOMComet.createRoot(document.getElementById("root")!);


// root.render(<Unstable_Scope_Debug toggle={true} />);
// root.render(<UseFocus_disabled  />);
// root.render(<UseFocus_onBlur />);
root.render(<UseFocus_onFocus example={1} />);