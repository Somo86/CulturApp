export const minutesToHours = (minutes: number | undefined): number => {
  return minutes ? minutes / 60 : 0;
};
