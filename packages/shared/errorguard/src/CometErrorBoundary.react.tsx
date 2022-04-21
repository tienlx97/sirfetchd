import React, { forwardRef, useContext } from "react";
import { ErrorBoundaryProps, ErrorBoundaryReact } from "./ErrorBoundary.react";
import { CometHeroInteractionContext } from "@farfetchd/context"
import ErrorMetadata from "./ErrorMetadata";

const cometErrorBoundary = (props: ErrorBoundaryProps, ref: any) => {
  const context = useContext(CometHeroInteractionContext.Context);
  const { pageletStack } = context
  props.context = props.context || {}
  const metadata = (props.context == null ? undefined : props.context.metadata) || new ErrorMetadata()
  if (pageletStack != null) {
    metadata.addEntries(["COMET_INFRA", "INTERACTION_PAGELET_STACK", pageletStack.join(",")])
  }
  props.context.metadata = metadata

  // const { children, ...rest } = props;
  return (
    <ErrorBoundaryReact
      {...Object.assign({}, props, {
        fallback: props.fallback,
        ref
      })}
    />
  )
}

cometErrorBoundary.displayName = `${cometErrorBoundary.name} [from CometErrorBoundary.react]`

const CometErrorBoundaryReact = forwardRef(cometErrorBoundary)

export {
  CometErrorBoundaryReact
}
export default CometErrorBoundaryReact
