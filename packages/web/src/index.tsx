import { ErrorPubSub, ErrorBrowserConsole, ErrorSetup } from "@farfetchd/fblogger";
import React, { useState } from "@farfetchd-lib/react";
import { createRoot } from "@farfetchd-lib/react-dom";

ErrorPubSub.addListener(ErrorBrowserConsole.errorListener)
ErrorSetup.preSetup();

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

const root = createRoot(document.getElementById("root")!);
root.render(<Counter />);
