export const avarage = (values: number[]): number =>
  values.reduce((acc, curr) => {
    return acc + curr;
  }, 0) / values.length;
