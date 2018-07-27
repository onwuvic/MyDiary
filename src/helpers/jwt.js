import jwt from 'jsonwebtoken';

const tokenGenerator = (object) => {
  return jwt.sign(object, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRATION
  });
}

export default tokenGenerator;