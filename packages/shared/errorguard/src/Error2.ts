import { ErrorMetadata } from "./ErrorMetadata";
import { ErrorProps, LogTypeString, SourceProps } from "./types";

class Error2 extends Error implements ErrorProps {
  messageFormat?: string;
  messageParams?: string[];
  taalOpcodes?: number[];
  metadata?: ErrorMetadata;
  type?: LogTypeString;
  project?: string;
  errorName?: string;
  componentStack?: string;
  deferredSource?: Error2;
  blameModule?: string;
  framesToPop?: number;
  loggingSource?: string;
  source?: SourceProps;
  forcedKey?: string;
  lineNumber?: number;
  line?: number;
  columnNumber?: number;
  column?: number;
  fileName?: string;
  sourceURL?: string;
  extra?: object;
  fbtrace_id?: string;
  guardList?: string[];
  serverHash?: string;
  constructor(msg?: string) {
    super(msg);
  }
}

export default Error2;
export { Error2 };
