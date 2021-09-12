type ClassCondition = {
  [className: string]: boolean;
};
export const calcClassName = (
  optionalClasses: ClassCondition,
  fixedClasses: string[] = []
): string => {
  const classes: string[] = [...fixedClasses];
  for (const [className, condition] of Object.entries(optionalClasses)) {
    if (condition) {
      classes.push(className);
    }
  }
  return classes.join(" ");
};
