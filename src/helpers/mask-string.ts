export function maskString(str: string): string {
  if (str.length <= 2) {
    return '*'.repeat(str.length);
  }
  return '*'.repeat(str.length - 2) + str.slice(-2);
}

export function maskStringEmail(email: string) {
  const [localPart, domain] = email.split('@');

  if (localPart.length <= 2) {
    return `${'*'.repeat(localPart.length)}@${domain}`;
  }

  const maskedLocalPart =
    localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);

  return `${maskedLocalPart}@${domain}`;
}
