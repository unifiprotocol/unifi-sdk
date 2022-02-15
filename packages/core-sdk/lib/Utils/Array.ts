export const randomItem = <T>(items: Array<T>): T => {
  return items[Math.floor(Math.random() * items.length)];
};

export const onlyUnique = (value: any, index: number, self: any[]) => {
  return self.indexOf(value) === index;
};
