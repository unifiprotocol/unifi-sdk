export const breakpointMap: Record<string, number> = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
};

export const breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`
);

export const mediaQueries = {
  xs: `@media (max-width: ${breakpointMap.xs}px)`,
  sm: `@media  (max-width: ${breakpointMap.sm}px)`,
  md: `@media  (max-width: ${breakpointMap.md}px)`,
  lg: `@media  (max-width: ${breakpointMap.lg}px)`,
  xl: `@media  (max-width: ${breakpointMap.xl}px)`,
  xxl: `@media  (max-width: ${breakpointMap.xxl}px)`,
};
