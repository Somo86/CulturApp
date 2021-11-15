export const validateEmail = (email: string): boolean =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const validateMinLength = (text: string, lenght: number): boolean =>
  text.length >= lenght;
