import { Error2 } from "./Error2";
import { ErrorMetadata } from "./ErrorMetadata";

type LogTypeString = "debug" | "warn" | "fatal" | "info" | "error";

const LogValue = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5,
};
interface ErrorProps {
  messageFormat?: string;
  messageParams?: string[];
  taalOpcodes?: number[];
  type?: LogTypeString;
  metadata?: ErrorMetadata;
  project?: string;
  errorName?: string;
  componentStack?: string;
  deferredSource?: Error2;
  blameModule?: string;
  loggingSource?: string;
  source?: SourceProps;
  forcedKey?: string;
  framesToPop?: number;
  lineNumber?: number;
  line?: number;
  columnNumber?: number;
  column?: number;
  fileName?: string;
  sourceURL?: string;
  extra?: object;
  fbtrace_id?: string;
  guardList?: [];
  serverHash?: string;
}

interface SourceProps {
  errorCode?: string;
  errorMsg?: string;
  errorRawResponseHeaders?: string;
  errorRawTransport?: string;
  errorRawTransportStatus?: number;
  errorType?: string;
}

interface StackItemProps {
  identifier?: string;
  script?: string;
  line?: number;
  column?: number;
  text?: string;
}

interface NormalizeErrorProps {
  blameModule: string | null;
  column?: string;
  clientTime: number | null;
  componentStackFrames?: StackItemProps[] | null;
  // deferredSource: Error2 | null;
  extra: object;
  fbtrace_id?: string;
  guardList: string[];
  hash: string;
  isNormalizedError: boolean;
  line?: string;
  loggingSource?: string;
  message: string;
  messageFormat: string;
  messageParams: string[];
  metadata?: string[];
  name: string;
  page_time: number;
  project?: string;
  reactComponentStack: string[] | null;
  script?: string;
  serverHash?: string;
  stack: string;
  type?: LogTypeString;
  xFBDebug: string[];
  forcedKey?: string;
  taalOpcodes?: number[];
  windowLocationURL?: string;
  stackFrames: StackItemProps[];
  events?: any[];
  deferredSource?: any;
}

export {
  LogTypeString,
  LogValue,
  ErrorProps,
  SourceProps,
  StackItemProps,
  NormalizeErrorProps,
};
