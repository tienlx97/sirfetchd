const maxXFBDebugHeader = 5;

let xFBDebug: string[];

function add(xFbDebugHeader: string) {
  xFBDebug.push(xFbDebugHeader),
    xFBDebug.length > maxXFBDebugHeader && xFBDebug.shift();
}
function addFromXHR(xmlHttpRequest: XMLHttpRequest) {
  let responseHeader = xmlHttpRequest.getAllResponseHeaders() || null;
  if (responseHeader != null && responseHeader.indexOf("X-FB-Debug") >= 0) {
    responseHeader = xmlHttpRequest.getResponseHeader("X-FB-Debug");
    responseHeader && add(responseHeader);
  }
}
function getAll() {
  return xFBDebug;
}

export { getAll, addFromXHR, add };
