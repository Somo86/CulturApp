export const avarage = (values: string[] = []): number => {
  return values.length
    ? Math.round(
        values.reduce((acc, curr) => {
          return acc + parseInt(curr);
        }, 0) / values.length,
      )
    : 0;
};

export const random = (): number =>
  Math.floor(1000000000 + Math.random() * 900000);
