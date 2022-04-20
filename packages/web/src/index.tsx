import React from "react";
// const React = require("react");
const ReactDOM = require("react-dom");

import { BaseRowItem_Test1 } from "@farfetchd/baserow/__tests__/BaseRowItem.test"

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<BaseRowItem_Test1 />);
