import React, { createContext, useContext } from "react";

const fn = (): void => {};

interface DefaultContext {
  consumeBootload: () => void;
  hold: (...args) => string;
  logHeroRender: () => void;
  logMetadata: () => void;
  logPageletVC: () => void;
  logReactCommit: () => void;
  logReactPostCommit: () => void;
  logReactRender: () => void;
  pageletStack: string[];
  registerPlaceholder: () => void;
  removePlaceholder: () => void;
  suspenseCallback: () => void;
  unhold: (...args) => void;
}

const DEFAULT_CONTEXT_VALUE: DefaultContext = {
  consumeBootload: fn,
  hold: function () {
    return "";
  },
  logHeroRender: fn,
  logMetadata: fn,
  logPageletVC: fn,
  logReactCommit: fn,
  logReactPostCommit: fn,
  logReactRender: fn,
  pageletStack: [],
  registerPlaceholder: fn,
  removePlaceholder: fn,
  suspenseCallback: fn,
  unhold: fn,
};

const Context = createContext(DEFAULT_CONTEXT_VALUE);

const HeroInteractionContext = Object.freeze({
  __proto__: null,
  DEFAULT_CONTEXT_VALUE,
  Context,
});

const HeroTracingPlaceHolder = {
  HeroInteractionContext,
};
export default HeroTracingPlaceHolder;
export { HeroInteractionContext };
