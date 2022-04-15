import { LogTypeString, NormalizeErrorProps } from "@farfetch/common/Types";

let j = false;
const console = window.console;

const errorListener = (nError: NormalizeErrorProps) => {
  let logType = (
    console[nError.type!] ? nError.type : "error"
  ) as LogTypeString;
  if (nError.type === "fatal" || (logType === "error" && !j)) {
    console.error(
      "ErrorUtils caught an error:\n\n" +
        nError.message +
        "\n\nSubsequent non-fatal errors won't be logged; see https://fburl.com/debugjs."
    );
    j = true;
  }
};

export { errorListener };
