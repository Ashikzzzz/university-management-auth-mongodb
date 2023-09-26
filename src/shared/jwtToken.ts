import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: object,
  secret: Secret,
  option: object,
): string => {
  return jwt.sign(payload, secret, option);
};

export const jwtToken = {
  createToken,
};
