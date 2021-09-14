export const shortAddress = (address: string, pads = 5): string => {
  const firstLetters = address.substr(0, pads);
  const endingLetters = address.substr(-pads, pads);
  return firstLetters + "..." + endingLetters;
};
