
const defaultConfig = {
  pollingPeriod: 1000,
  shouldStop: () => {},
  attempts: null
};

export const pollWrapper = ({
  request,
  pollingPeriod = defaultConfig.pollingPeriod,
  shouldStop = defaultConfig.shouldStop,
  attempts = defaultConfig.attempts
}) => {
  let canceled = false;
  const cancel = () => { canceled = true; };

  if (!request || typeof request !== 'function') {
    throw new Error('request function is required');
  }

  if (!shouldStop && typeof shouldStop !== 'function') {
    throw new Error('shouldStop function is required');
  }

  if (!pollingPeriod || !Number.isInteger(pollingPeriod) || pollingPeriod <= 0) {
    throw new Error('pollingPeriod must be a positive integer');
  }

  if (attempts && !Number.isInteger(attempts) || attempts <= 0) {
    throw new Error('attempts must be a positive integer or null');
  }

  let retries = 0;
  const poll = (resolve, reject) => {
    if (canceled) {
      reject(new Error('Polling has been manually canceled'));
      return;
    }

    if (!!attempts && retries === attempts) {
      reject(new Error('attempts exceeded'));
      return;
    }

    retries++;
    request()
      .then(response => {
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

  return { future: new Promise(poll), cancel: cancel, retries: retries };
};

export default pollWrapper;
