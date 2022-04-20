// https://stackoverflow.com/questions/52242847/ts-cannot-find-name-with-typeroots-specified-explicity

export interface Window {
  msPerformance: any;
  webkitPerformance: any;
  mozPerformance: any;
  _cstart: Date;
  attachEvent(event: string, listener: EventListener): boolean;
}

// https://fossies.org/linux/TypeScript/lib/lib.webworker.d.ts
declare const WorkerGlobalScope: {
  prototype: WorkerGlobalScope;
  new (): WorkerGlobalScope;
};

// need for addEventListener
export interface WindowEventMap extends ServiceWorkerGlobalScopeEventMap {}
