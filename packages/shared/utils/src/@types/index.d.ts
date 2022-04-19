declare global {
  interface Window {
    msPerformance: any;
    webkitPerformance: any;
    mozPerformance: any;
    _cstart: Date = new Date();
  }
}

export {};
