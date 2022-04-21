import React, { useEffect, useState } from "react"
import { CometErrorBoundaryReact } from "../src/CometErrorBoundary.react"
import Error2 from "../src/Error2"
import ErrorBrowserConsole from "../src/ErrorBrowserConsole";
import ErrorPubSub from "../src/ErrorPubSub";
import ErrorSetup from "../src/ErrorSetup";


ErrorPubSub.addListener(ErrorBrowserConsole.errorListener)
ErrorSetup.preSetup();

function BuggyCounter() {

  const [counter, setCounter] = useState(0)

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCounter(counter + 1)
  };

  useEffect(() => {
    if (counter === 5) {
      throw new Error2('I crashed!');
    }

  }, [counter])



  return <button onClick={buttonHandler}>{counter}</button>;
}


function CometErrorBoundary_Test1() {
  return (
    <div>
      <p>
        <b>
          This is Error boundaries in React 18 experimental.
          <br /><br />
          Click on the numbers to increase the counters.
          <br />
          The counter is programmed to throw when it reaches 5. This simulates a JavaScript error in a component.
        </b>
      </p>
      <hr />
      <CometErrorBoundaryReact
        fallback={() => <div>Fail 1</div>}
      >
        <BuggyCounter />
      </CometErrorBoundaryReact>
      <hr />

      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <CometErrorBoundaryReact fallback={() => <div>Fail 2</div>}><BuggyCounter /></CometErrorBoundaryReact>
      <CometErrorBoundaryReact fallback={() => <div>Fail 3</div>}><BuggyCounter /></CometErrorBoundaryReact>

    </div>
  );
}




export {
  CometErrorBoundary_Test1
}