export const breakpointMap: Record<string, number> = {
  xs: 576,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const breakpoints = Object.values(breakpointMap).map(
  (breakpoint) => `${breakpoint}px`
);

// https://getbootstrap.com/docs/5.0/layout/breakpoints/
export const mediaQueries = {
  xs: `@media (max-width: ${breakpointMap.xs}px)`,
  sm: `@media  (min-width: ${breakpointMap.sm}px)`,
  md: `@media  (min-width: ${breakpointMap.md}px)`,
  lg: `@media  (min-width: ${breakpointMap.lg}px)`,
  xl: `@media  (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media  (min-width: ${breakpointMap.xxl}px)`,
};
