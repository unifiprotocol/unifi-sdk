export const sleep = (sleepTime: number) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), sleepTime);
  });
};
