export const passwordValidator = (str: string) => {
  if (!str) return false;
  const regexp = /(?=.*[a-z])(?=.*[A-Z]){6,}/g;
  return regexp.test(str);
};
