import { ErrorMetadata } from "@farfetch/common/ErrorMetadata";
import { aggregateError, toStringParams } from "./ErrorSerializer";
import { PREVIOUS_DIR, PREVIOUS_FILE, PREVIOUS_FRAME } from "./TAALOpcodes";
import { normalizeError } from "./ErrorNormalizeUtils";
import { LogTypeString, NormalizeErrorProps } from "@farfetch/common/Types";
import { err } from "./Err";
import { Error2 } from "@farfetch/common/Error2";
import { reportNormalizedError } from "ErrorPubSub";

class FBLogMessage {
  project: string;
  events: any[];
  metadata: ErrorMetadata;
  taalOpcodes: number[];
  blameModule?: string;
  forcedKey?: string;
  normalizedError?: NormalizeErrorProps;
  error?: Error2;

  constructor(projectName: string) {
    this.project = projectName;
    this.events = [];
    this.metadata = new ErrorMetadata();
    this.taalOpcodes = [];
  }

  $1(type: LogTypeString, msgFormat: string, ...params) {
    const messageFormat = String(msgFormat);
    const { events, project, metadata, blameModule, forcedKey } = this;
    let error = this.error;
    let normalizeErrorObj: NormalizeErrorProps | null = null;
    if (this.normalizedError) {
      const obj = {
        message:
          this.normalizedError.messageFormat +
          " [Caught in: " +
          messageFormat +
          "]",
        params: ([] as any[]).concat(
          this.normalizedError.messageParams,
          params
        ),
        forcedKey,
      };

      this.normalizedError.message = obj.message;
      this.normalizedError.messageFormat = obj.message;
      this.normalizedError.messageParams = toStringParams(obj.params);
      this.normalizedError.project = project;
      this.normalizedError.type = type;
      this.normalizedError.loggingSource = "FBLOGGER";
    } else if (error) {
      this.taalOpcodes.length > 0 &&
        new FBLogMessage("fblogger")
          .blameToPreviousFrame()
          .blameToPreviousFrame()
          .warn("Blame helpers do not work with catching"),
        aggregateError(error, {
          messageFormat: messageFormat,
          messageParams: toStringParams(params),
          errorName: error.name,
          forcedKey,
          project,
          type,
          loggingSource: "FBLOGGER",
        }),
        (normalizeErrorObj = normalizeError(error));
    } else {
      error = new Error2(messageFormat);
      if (error.stack === undefined) {
        try {
          throw error;
        } catch (error) {}
      }
      error.messageFormat = messageFormat;
      error.messageParams = toStringParams(params);
      error.blameModule = blameModule;
      error.forcedKey = forcedKey;
      error.project = project;
      error.type = type;
      error.loggingSource = "FBLOGGER";
      error.taalOpcodes = [PREVIOUS_FRAME, PREVIOUS_FRAME].concat(
        this.taalOpcodes
      );
      normalizeErrorObj = normalizeError(error);
      normalizeErrorObj.name = "FBLogger";
    }
    metadata.isEmpty() || (normalizeErrorObj!.metadata = metadata.format());
    if (events.length > 0) {
      if (normalizeErrorObj?.events != undefined) {
        let q;
        (q = normalizeErrorObj.events).push.apply(q, events);
      } else normalizeErrorObj!.events = events;
    }
    reportNormalizedError(normalizeErrorObj!);
    return error;
  }

  fatal = (msg: string, ...params) => {
    this.$1("fatal", msg, ...params);
  };

  mustfix = (msg: string, ...params) => {
    this.$1("error", msg, ...params);
  };

  warn = (msg: string, ...params) => {
    this.$1("warn", msg, ...params);
  };

  info = (msg: string, ...params) => {
    this.$1("info", msg, ...params);
  };

  debug(msg) {
    /** */
  }

  mustfixThrow(msg: string, ...params) {
    let error = this.$1("error", msg, params);
    error ||
      ((error = err("mustfixThrow does not support catchingNormalizedError")),
      (error.taalOpcodes = error.taalOpcodes || []),
      error.taalOpcodes.push(PREVIOUS_FRAME));
    throw error;
  }

  //!
  catching(err: Error2) {
    if (!(err instanceof Error)) {
      new FBLogMessage("fblogger")
        .blameToPreviousFrame()
        .warn("Catching non-Error object is not supported");
    } else {
      this.error = err;
    }
    return this;
  }

  catchingNormalizedError(normalErr: NormalizeErrorProps) {
    this.normalizedError = normalErr;
    return this;
  }

  event(event: any) {
    this.events.push(event);
    return this;
  }

  blameToModule(msg: string) {
    this.blameModule = msg;
  }

  blameToPreviousFile() {
    this.taalOpcodes.push(PREVIOUS_FILE);
    return this;
  }

  blameToPreviousFrame() {
    this.taalOpcodes.push(PREVIOUS_FRAME);
    return this;
  }

  blameToPreviousDirectory() {
    this.taalOpcodes.push(PREVIOUS_DIR);
    return this;
  }

  addToCategoryKey(a: string) {
    this.forcedKey = a;
    return this;
  }

  addMetadata(a: string, b: string, c: string) {
    this.metadata.addEntry(a, b, c);
    return this;
  }
}

export default FBLogMessage;