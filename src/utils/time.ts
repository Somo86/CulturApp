export const minutesToHours = (minutes: number | undefined): number => {
  return minutes ? parseInt((minutes / 60).toFixed(1)) : 0;
};
