const generateMediaQueries = (breakpoints: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  Object.keys(breakpoints).reduce((acc: Record<string, unknown>, label) => {
    acc[label] = `(min-width: ${breakpoints[label]}px)`;
    acc[`${label}Max`] = `(max-width: ${breakpoints[label]}px)`;
    return acc;
  }, {});

export { generateMediaQueries };
