import SimpleHook from "./SimpleHook";
let h: any = [];
const SHook = new SimpleHook();

const BanzaiLazyQueue = {
  onQueue: SHook,
  queuePost: function (name: string, obj: any, c?) {
    h.push([name, obj, c]);
    SHook.call(name, obj, c);
  },
  flushQueue: function () {
    const a = h;
    h = [];
    return a;
  },
};
export default BanzaiLazyQueue;
