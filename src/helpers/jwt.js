import jwt from 'jsonwebtoken';

/**
 * A function that generate web token.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return a JsonWebToken string
 */
const tokenGenerator = (object) => {
  return jwt.sign(object, process.env.SECRET_KEY, {
    expiresIn: process.env.TOKEN_EXPIRATION
  });
}

export default tokenGenerator;