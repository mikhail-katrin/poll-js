import pollWrapper from '../index';

beforeAll(() => {
  jest.useFakeTimers();
});

describe('polling', () => {
  test('should be defined', () => {
    const { future, cancel } = pollWrapper({
      request: () => Promise.resolve(),
      pollingPeriod: 1000,
      shouldStop: () => false
    });

    expect(future).toBeDefined();
    expect(cancel).toBeDefined();
  });

  test('should be resolved', async () => {
    const { future } = pollWrapper({
      request: () => Promise.resolve('done'),
      pollingPeriod: 1000,
      shouldStop: response => response === 'done'
    });

    return future.then(data => {
      expect(data).toBe('done');
    });
  });
});
