export declare function pollWrapper(
  request: (...args: any) => Promise<any>,
  pollingPeriod: number,
  shouldStop: (...args: any) => boolean
): { future: Promise<any>; cancel: () => void };
