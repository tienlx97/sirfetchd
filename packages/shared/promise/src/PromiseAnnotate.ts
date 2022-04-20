function setDisplayName(a, b) {
  a.displayName = b;
  return a;
}

function getDisplayName(a) {
  a = a.displayName;
  if (typeof a === "string") return a;
  else return null;
}

const PromiseAnnotate = {
  getDisplayName,
  setDisplayName,
};

export default PromiseAnnotate;
export { getDisplayName, setDisplayName };
