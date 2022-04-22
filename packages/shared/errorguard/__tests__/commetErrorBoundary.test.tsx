import React, { useCallback, useEffect, useState } from "react"
import { CometErrorBoundaryReact } from "../src/CometErrorBoundary.react"
import Error2 from "../src/Error2"
import ErrorBrowserConsole from "../src/ErrorBrowserConsole";
import ErrorPubSub from "../src/ErrorPubSub";
import ErrorSetup from "../src/ErrorSetup";
import FBLogger from "../src/FBLogger";
import unrecoverableViolation from "../src/unrecoverableViolation";


ErrorPubSub.addListener(ErrorBrowserConsole.errorListener)
ErrorSetup.preSetup();

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function ComponentPropalyThrowError() {

  const [counter, setCounter] = useState(0)

  const buttonHandler = (event: React.MouseEvent<HTMLHeadingElement>) => {
    event.preventDefault();
    setCounter(counter + 1)
  };

  useEffect(() => {
    if (counter === 5) {
      const rndInt = randomIntFromInterval(0, 2)
      if (rndInt == 0) {
        unrecoverableViolation("ComponentPropalyThrowError has counter > 5", "comet_feed")
      } else {
        throw new Error2('I crashed!');
      }
    }

  }, [counter])



  return <h1 onClick={buttonHandler}>{counter}</h1>;
}


function CometErrorBoundary_Test1() {

  const b = useCallback((a) => {
    FBLogger("CometErrorBoundary_Test1").catching(a).warn("Failed to render next counter because it equal 5")
  }, []);

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
        fallback={() => <div>Fail, counter = 5</div>}
      >
        <p>These two counters are inside the same error boundary. If one crashes, the error boundary will replace both of them.</p>
        <ComponentPropalyThrowError />
        <ComponentPropalyThrowError />
      </CometErrorBoundaryReact>
      <hr />

      <p>These two counters are each inside of their own error boundary. So if one crashes, the other is not affected.</p>
      <CometErrorBoundaryReact fallback={() => <div>Fail 3</div>}>
        <ComponentPropalyThrowError />
      </CometErrorBoundaryReact>
      <CometErrorBoundaryReact
        fallback={() => <div>Fail 3</div>}
      ><ComponentPropalyThrowError />
      </CometErrorBoundaryReact>

      <hr />

      <p>Log Error at fallback() function</p>
      <CometErrorBoundaryReact
        fallback={(e) => {
          return e != null ? <div>{e.stack}</div> : <div>Nothing fallback because e is null</div>
        }}
      >
        <ComponentPropalyThrowError />
      </CometErrorBoundaryReact>

      <hr />

      <p>Log sth at onError() function</p>
      <CometErrorBoundaryReact
        onError={b}
      >
        <ComponentPropalyThrowError />
      </CometErrorBoundaryReact>


    </div >
  );
}




export {
  CometErrorBoundary_Test1
}