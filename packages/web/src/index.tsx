// import React, { useState } from "react";
// import { createRoot } from "react-dom/client"

// function Counter() {
//   const [count, setCount] = useState(0);
//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </>
//   );
// }

// const root = createRoot(document.getElementById("root")!);
// root.render(<Counter />);

import { FBLogger } from "@farfetchd/fblogger";

function NetworkStatusError() {
  const isOnline = false;
  FBLogger("NetworkStatus").warn(
    "Network switched to " + (isOnline ? "online" : "offline")
  );
}

NetworkStatusError();