export const decode = (token: string) => {
  return JSON.parse(atob(token.split(".")[1]));
};

export const validateExp = (token: string) => {
  const payload = decode(token);
  const now = Math.floor(new Date().getTime() / 1000);

  return payload.exp > now;
};
