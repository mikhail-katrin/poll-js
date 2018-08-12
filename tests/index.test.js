import { pollWrapper } from '../src/index';

describe('parameters check', () => {
  it('should throw an error if request function is blank', () => {
    expect(() => pollWrapper({
      request: null
    })).toThrow('request function is required');
  });

  it('should throw an error if request is not a function', () => {
    expect(() => pollWrapper({
      request: ''
    })).toThrow('request function is required');
  });

  it('should throw an error if shouldStop is blank', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: null
    })).toThrow('shouldStop function is required');
  });

  it('should throw an error if shouldStop is not a function', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: ''
    })).toThrow('shouldStop function is required');
  });

  it('should throw an error if pollingPeriod is blank', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: null
    })).toThrow('pollingPeriod must be a positive integer');
  });

  it('should throw an error if pollingPeriod is not a positive integer', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: ''
    })).toThrow('pollingPeriod must be a positive integer');
  });

  it('should throw an error if pollingPeriod is not a positive integer', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: -1
    })).toThrow('pollingPeriod must be a positive integer');
  });

  it('should throw an error if pollingPeriod is not a positive integer', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: 0
    })).toThrow('pollingPeriod must be a positive integer');
  });

  it('should throw an error if attempts is not a positive integer or null', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: 1,
      attempts: '',
    })).toThrow('attempts must be a positive integer or null');
  });

  it('should throw an error if attempts is not a positive integer or null', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: 1,
      attempts: -1,
    })).toThrow('attempts must be a positive integer or null');
  });

  it('should throw an error if attempts is not a positive integer or null', () => {
    expect(() => pollWrapper({
      request: () => {},
      shouldStop: () => {},
      pollingPeriod: 1,
      attempts: 0,
    })).toThrow('attempts must be a positive integer or null');
  });
});