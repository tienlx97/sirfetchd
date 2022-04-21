class SimpleHook {
  private __callbacks: any;
  call: any;
  constructor() {
    this.__callbacks = [];
    this.call = this.$2;
  }

  hasCallback(a) {
    const b = this.__callbacks;
    return (
      b.length > 0 &&
      (a == null ||
        b.some(function (b) {
          return b === a || b.$1 === a;
        }))
    );
  }

  add(a, b, ...args) {
    const c = this;
    let d;
    if ((b == null ? undefined : b.once) === true) {
      b = function () {
        c.remove(d);
        // eslint-disable-next-line prefer-spread
        a.apply(null, args);
      };
      b.$1 = a;
      d = b;
    } else d = a;
    this.__callbacks.push(d);
    return d;
  }

  removeLast() {
    return this.__callbacks.pop();
  }

  remove(a) {
    return this.removeIf(function (b) {
      return b === a;
    });
  }

  removeIf(a) {
    const b = this.__callbacks;
    this.__callbacks = b.filter(function (b) {
      return !a(b);
    });
    return b.length > this.__callbacks.length;
  }
  clear() {
    this.__callbacks = [];
  }
  $2(...args) {
    const a = this.__callbacks;
    for (let b = 0, c = a.length; b < c; ++b) {
      const d = a[b];
      // eslint-disable-next-line prefer-spread
      d.apply(null, args);
    }
  }
}

export { SimpleHook };
export default SimpleHook;
