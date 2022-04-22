import { Error2 } from "./Error2";
import ErrorMetadata from "./ErrorMetadata";
import { ErrorProps, LogValue } from "./types";

function toStringParams(args: any[]) {
  const newArgs = args != undefined ? args : [];
  return newArgs.map((arg) => String(arg));
}

function mapParams(msg: string, msgParams: string[]) {
  let i = 0;
  msg = msg.replace(/%s/g, () => {
    return i < msgParams.length ? msgParams[i++] : "NOPARAM";
  });

  if (i < msgParams.length) {
    msg += " PARAMS" + JSON.stringify(msgParams.slice(i));
  }
  return msg;
}

function toReadableMessage(error: Error2): string {
  return mapParams(
    error.messageFormat != undefined ? error.messageFormat : error.message,
    error.messageParams || []
  );
}

function aggregateError(error: Error2, props: ErrorProps) {
  if (Object.isFrozen(error)) return;

  if (
    (props.type && !error.type) ||
    LogValue[error.type!] > LogValue[props.type!]
  ) {
    error.type = props.type;
  }

  const {
    metadata,
    project,
    errorName,
    componentStack,
    deferredSource,
    blameModule,
    loggingSource,
    // "JS loading error [%s] at %s | time: %s | retries: %s | concurrency: %s"
    messageFormat,
    // ['UU9hKKO', 'https://static.xx.fbcdn.net/rsrc.php/v3/y0/r/N_iw-mfxPNB.js?_nc_x=DDk_Zn6H8tc', '31955', '0', '10']
    messageParams,
    forcedKey,
  } = props;

  if (metadata != undefined) {
    const errMetadata =
      error.metadata != undefined ? error.metadata : new ErrorMetadata();

    metadata != undefined && errMetadata.addEntries(...metadata!.getAll());
    error.metadata = errMetadata;
  }

  if (project != undefined) error.project = project;
  if (errorName != undefined) error.errorName = errorName;
  if (componentStack != undefined) error.componentStack = componentStack;
  if (deferredSource != undefined) error.deferredSource = deferredSource;
  if (blameModule != undefined) error.blameModule = blameModule;
  if (loggingSource != undefined) error.loggingSource = loggingSource;

  let errorMessageFormat =
    error.messageFormat != null ? error.messageFormat : error.message;

  const errorMessageParams =
    error.messageParams != null ? error.messageParams! : [];

  if (messageFormat != undefined && messageFormat !== errorMessageFormat) {
    errorMessageFormat += " [Caught in: " + messageFormat + "]";
    // eslint-disable-next-line prefer-spread
    errorMessageParams.push.apply(
      errorMessageParams,
      messageParams != undefined && messageParams
    );
  }

  error.messageFormat = errorMessageFormat;
  error.messageParams = errorMessageParams;

  let errorForcedKey: string | undefined;
  if (forcedKey != undefined && error.forcedKey != undefined) {
    errorForcedKey = forcedKey + "_" + error.forcedKey;
  } else {
    errorForcedKey = forcedKey != undefined ? forcedKey : error.forcedKey;
  }

  error.forcedKey = errorForcedKey;
}

const ErrorSerializer = {
  toStringParams,
  toReadableMessage,
  aggregateError,
};

export default ErrorSerializer;
export { toStringParams, toReadableMessage, aggregateError };
