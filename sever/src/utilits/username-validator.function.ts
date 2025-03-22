export const usernameValidator = (str: string) => {
  if (!str) return false;
  const regexp = /[a-z]{3,}/gi;
  return regexp.test(str);
};
