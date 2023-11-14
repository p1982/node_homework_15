import { expressjwt, ExpressJwtRequest } from 'express-jwt';
import express from 'express';

const getTokenFromHeaders = (req: express.Request) => {
  const {
    headers: { authorization },
  } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return undefined; // Return undefined instead of null
};

const auth = {
  required: expressjwt({
    secret: 'QWE123',
    getToken: getTokenFromHeaders,
    algorithms: ['HS256'],
  }),
  optional: expressjwt({
    secret: 'QWE123',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
    algorithms: ['HS256'],
  }),
};

export default auth;
