import { ErrorPubSub, ErrorBrowserConsole, ErrorSetup } from "@farfetchd/fblogger";
const React = require("react");
const ReactDOM = require("react-dom");

ErrorPubSub.addListener(ErrorBrowserConsole.errorListener)
ErrorSetup.preSetup();

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Counter />);
