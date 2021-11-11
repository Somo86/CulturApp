export const avarage = (values: number[] = []): number => {
  return values.length
    ? values.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / values.length
    : 0;
};
