
export const request = (isPassing) => {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => isPassing ? resolve() : reject()
    );
  });
};