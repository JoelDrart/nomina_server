export const generateUniqueEmail = (
  baseEmail: string,
  attempt: number = 0,
): string => {
  const [localPart, domain] = baseEmail.split('@');
  return attempt === 0 ? baseEmail : `${localPart}${attempt}@${domain}`;
};

export const generateUniqueCedula = (
  baseCedula: string,
  attempt: number = 0,
): string => {
  return attempt === 0 ? baseCedula : `${baseCedula}-${attempt}`;
};
