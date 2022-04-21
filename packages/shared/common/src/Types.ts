// import { Error2 } from "@farfetchd/errorguard/src/Error2";
// import { ErrorMetadata } from "./ErrorMetadata";

// type LogTypeString = "debug" | "warn" | "fatal" | "info" | "error";

// const LogValue = {
//   debug: 1,
//   info: 2,
//   warn: 3,
//   error: 4,
//   fatal: 5,
// };
// interface ErrorProps {
//   messageFormat?: string;
//   messageParams?: string[];
//   taalOpcodes?: number[];
//   type?: LogTypeString;
//   metadata?: ErrorMetadata;
//   project?: string;
//   errorName?: string;
//   componentStack?: string;
//   deferredSource?: Error2;
//   blameModule?: string;
//   loggingSource?: string;
//   source?: SourceProps;
//   forcedKey?: string;
//   framesToPop?: number;
//   lineNumber?: number;
//   line?: number;
//   columnNumber?: number;
//   column?: number;
//   fileName?: string;
//   sourceURL?: string;
//   extra?: object;
//   fbtrace_id?: string;
//   guardList?: string[];
//   serverHash?: string;
// }

// interface SourceProps {
//   errorCode?: string;
//   errorMsg?: string;
//   errorRawResponseHeaders?: string;
//   errorRawTransport?: string;
//   errorRawTransportStatus?: number;
//   errorType?: string;
// }

// interface StackItemProps {
//   identifier?: string;
//   script?: string;
//   line?: number;
//   column?: number;
//   text?: string;
// }

// interface NormalizeErrorProps {
//   blameModule: string | null;
//   column?: string;
//   clientTime: number | null;
//   componentStackFrames: StackItemProps[] | null;
//   // deferredSource: Error2 | null;
//   extra: object;
//   fbtrace_id?: string;
//   guardList: string[];
//   hash: string;
//   isNormalizedError: boolean;
//   line?: string;
//   loggingSource?: string;
//   message: string;
//   messageFormat: string;
//   messageParams: string[];
//   metadata?: string[];
//   name: string;
//   page_time: number;
//   project?: string;
//   reactComponentStack: string[] | null;
//   script?: string;
//   serverHash?: string;
//   stack: string;
//   type?: LogTypeString;
//   xFBDebug: string[];
//   forcedKey?: string;
//   taalOpcodes?: number[];
//   windowLocationURL?: string;
//   stackFrames: StackItemProps[];
//   events?: any[];
//   deferredSource?: any;
//   loadingUrls?: string[];
//   errorType?: string;
// }

// interface ErrorPubSubProps {
//   addListener: (
//     listener: (nError: NormalizeErrorProps) => void,
//     check?: any
//   ) => void;
//   history: NormalizeErrorProps[];
//   removeListener: (a: any) => void;
//   reportError: (error: Error2) => void;
//   reportNormalizedError: (nError: NormalizeErrorProps) => boolean;
//   unshiftListener: (a: any) => void;
// }

// interface ErrorPosterProp {
//   loggingFramework?: string;
//   script_path?: string;
//   appId?: string;
//   access_token?: string;
//   ancestor_hash?: string;
//   clientTime?: string;
//   column?: string;
//   line?: string;
//   componentStackFrames: StackItemProps[] | null;
//   events?: any[] | undefined;
//   extra: object;
//   frontend_env?: string;
//   site_category?: string;
//   forcedKey?: string;
//   guardList?: string[];
//   messageFormat?: string;
//   messageParams?: string[];
//   name?: string;
//   script?: string;
//   stackFrames?: StackItemProps[];
//   type?: LogTypeString;
//   project?: string;
//   taalOpcodes?: number[];
//   version: string;
//   xFBDebug?: string[];
//   blameModule?: string;
//   metadata?: string[];
//   loadingUrls?: string[];
//   serverHash?: string;
//   windowLocationURL?: string;
//   loggingSource?: string;
// }

// export {
//   LogTypeString,
//   LogValue,
//   ErrorProps,
//   SourceProps,
//   StackItemProps,
//   NormalizeErrorProps,
//   ErrorPubSubProps,
//   ErrorPosterProp,
// };
