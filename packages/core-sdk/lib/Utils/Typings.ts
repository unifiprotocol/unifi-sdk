export type Opt<T> = T | undefined;
export type Callback<T extends Array<any> = Array<any>> = (...args: T) => void;
