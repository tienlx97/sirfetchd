const g = "abcdefghijklmnopqrstuvwxyz012345";

function getSimpleHash(...args: any[]) {
  let a = 0;
  for (var b = args.length, c = new Array(b), d = 0; d < b; d++) c[d] = args[d];
  for (let e = 0; e < c.length; e++) {
    const f = c[e];
    if (f != null) {
      const h = f.length;
      for (let i = 0; i < h; i++) a = (a << 5) - a + f.charCodeAt(i);
    }
  }
  let j = "";
  for (let k = 0; k < 6; k++) (j = g.charAt(a & 31) + j), (a >>= 5);
  return j;
}

export { getSimpleHash };
