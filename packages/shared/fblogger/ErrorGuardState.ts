const y: any[] = [];

const pushGuard = (a: any) => {
  y.unshift(a);
};

const popGuard = () => {
  y.shift();
};

const inGuard = () => {
  return y.length !== 0;
};

function cloneGuardList() {
  return y.map(function (a) {
    return a.name;
  });
}

const findDeferredSource = () => {
  for (let a = 0; a < y.length; a++) {
    const b = y[a];
    if (b.deferredSource != null) return b.deferredSource;
  }
};

export { cloneGuardList, findDeferredSource, inGuard, popGuard, pushGuard };
