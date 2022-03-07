export const timedReject = (time: number) =>
  new Promise((_, reject) => setTimeout(reject, time));
