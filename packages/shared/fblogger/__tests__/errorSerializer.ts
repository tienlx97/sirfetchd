import { ErrorProps, Error2 } from "@farfetchd/common";
import ErrorSerializer from "../src/ErrorSerializer";

const error = new Error2(
  "Network request encountered error HTTP HTTP_TRANSPORT_ERROR: "
);

error.messageFormat =
  "Network request encountered error HTTP HTTP_TRANSPORT_ERROR: ";
error.messageParams = [];
error.name = "NetworkTransportError";
error.source = {
  errorCode: "HTTP_TRANSPORT_ERROR",
  errorMsg: "",
  errorRawTransport: "XMLHttpRequest",
  errorRawTransportStatus: 0,
  errorType: "HTTP",
};
error.type = "warn";
error.taalOpcodes = [2, 2];
error.stack = `"NetworkTransportError: Network request encountered error HTTP HTTP_TRANSPORT_ERROR: 
at g (https://static.xx.fbcdn.net/rsrc.php/v3iqsd4/ye/l/en_US/wPeU4KcVpSGwUWGE48wn2IBlIYuoQOCG0JRMLKIe27Taed2lal3T1JE3dXb91mtaI87rw0iT7Guk_mKsu_13OtonDS_LJQllwD8kAwSvAyZvi566lsP4_0qGd0bAtIkwQyPMu8_EK9X8TkTqIgCcDAU2lU.js?_nc_x=DDk_Zn6H8tc:676:239)
at Object.createWarning (https://static.xx.fbcdn.net/rsrc.php/v3iqsd4/ye/l/en_US/wPeU4KcVpSGwUWGE48wn2IBlIYuoQOCG0JRMLKIe27Taed2lal3T1JE3dXb91mtaI87rw0iT7Guk_mKsu_13OtonDS_LJQllwD8kAwSvAyZvi566lsP4_0qGd0bAtIkwQyPMu8_EK9X8TkTqIgCcDAU2lU.js?_nc_x=DDk_Zn6H8tc:676:669)
at Object.createErrorFromXHR (https://static.xx.fbcdn.net/rsrc.php/v3iWMP4/yX/l/en_US/p20vyUww6pQ.js?_nc_x=DDk_Zn6H8tc:85:859)
at https://static.xx.fbcdn.net/rsrc.php/v3iWMP4/yX/l/en_US/p20vyUww6pQ.js?_nc_x=DDk_Zn6H8tc:93:6044
at l (https://static.xx.fbcdn.net/rsrc.php/v3iWMP4/yX/l/en_US/p20vyUww6pQ.js?_nc_x=DDk_Zn6H8tc:81:2791)
at j (https://static.xx.fbcdn.net/rsrc.php/v3iWMP4/yX/l/en_US/p20vyUww6pQ.js?_nc_x=DDk_Zn6H8tc:77:4172)
at Object.applyWithGuard (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10113)
at c (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10817)
at Object.applyWithGuard (https://static.xx.fbcdn.net/rsrc.php/v3/yK/r/69y8SOj2gbA.js?_nc_x=DDk_Zn6H8tc:56:10113)
at XMLHttpRequest.<anonymous> (https://static.xx.fbcdn.net/rsrc.php/v3iWMP4/yX/l/en_US/p20vyUww6pQ.js?_nc_x=DDk_Zn6H8tc:77:6898)"`;

const props = {
  errorName: "NetworkTransportError",
  forcedKey: undefined,
  loggingSource: "FBLOGGER",
  messageFormat: "An error was caught inside `RelayObservable`.",
  messageParams: [],
  project: "relay",
  type: "warn",
} as ErrorProps;

ErrorSerializer.aggregateError(error, props);
