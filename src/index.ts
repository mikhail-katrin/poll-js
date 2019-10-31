type RequestFunc = () => Promise<any>;

type ShouldStopFunc = (response: unknown) => boolean;

export const pollWrapper = ({
  request,
  pollingPeriod,
  shouldStop
}: {
  request: RequestFunc;
  pollingPeriod: number;
  shouldStop: ShouldStopFunc;
}) => {
  let canceled = false;
  const cancel = () => {
    canceled = true;
  };

  const poll = (
    resolve: (value?: unknown) => void,
    reject: (reason?: any) => void
  ) => {
    if (canceled) {
      reject(new Error('Polling has been manually canceled'));
      return;
    }

    request()
      .then((response: any) => {
        if (shouldStop(response)) {
          resolve(response);
        } else {
          setTimeout(() => {
            poll(resolve, reject);
          }, pollingPeriod);
        }
      })
      .catch(error => reject(error));
  };

  return { future: new Promise(poll), cancel };
};

export default pollWrapper;
export { RequestFunc, ShouldStopFunc };
