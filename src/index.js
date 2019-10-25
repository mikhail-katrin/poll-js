export const pollWrapper = ({ request, pollingPeriod, shouldStop }) => {
  let canceled = false;
  const cancel = () => {
    canceled = true;
  };

  const poll = (resolve, reject) => {
    if (canceled) {
      reject(new Error('Polling has been manually canceled'));
      return;
    }

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

  return { future: new Promise(poll), cancel: cancel };
};

export default pollWrapper;
