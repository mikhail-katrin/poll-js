import pollWrapper from "../index";

beforeAll(() => {
  jest.useFakeTimers();
});

describe('polling', () => {
  test('should be defined', () => {
    jest.useFakeTimers();
    const { future, cancel } = pollWrapper({
      request: () => {},
      pollingPeriod: 1000,
      shouldStop: () => {}
    });

    expect(future).toBeDefined();
    expect(cancel).toBeDefined();
  });

  test('should be stopped', () => {
    const { future } = pollWrapper({
      request: () => {
        return Promise.resolve('done');
      },
      pollingPeriod: 1000,
      shouldStop: response => response === 'done'
    });

    return future.then(data => {
      expect(data).toBe('done');
    });
  });
});
