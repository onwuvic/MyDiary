import jwt from 'jsonwebtoken';
import db from './../database';
import refactorUserData from '../helpers/refactorUserData';

/**
 * A function that check if the token provided is correct and if the user is authenticated.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return boolean: true if valid or status code of specific error if not valid
 */
const isAuth = (req, res, next) => {
  console.log(req.get('authorization'));
  let bearerToken;
  // get the req.header authorization token
  let bearerHeader = req.get('authorization');
  // let bearerHeader = req.header["authorization"];

  if(typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(' ');
    bearerToken = bearer[1];

    // check if the bearer match that of the bearer specified in our env
    if(bearer[0] !== process.env.BEARER) {
      return res.status(400).json({
        statusCode: 400,
        status: 'error',
        message: 'bearer not understood'
      });
    }

    // used jsonwebtoken to decode and very if the token is valid
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decoded) => {
      if(err) {
        if(err.name === 'TokenExpiredError') {
          return res.status(400).json({
            statusCode: 400,
            status: 'error',
            message: 'Session timed out, please login again'
          });
        } else {
          return res.status(400).json({
            statusCode: 400,
            status: 'error',
            message: 'Error authenticating, please login again'
          });
        }
      }

      // get the authenticated user data from the database
      db.one('SELECT * FROM users WHERE id = $1', decoded.id)
        .then((user) => {
          // refactor the user data to exclude user password
          let userData = refactorUserData(user);

          // assign the user data into the req params for used in the next call
          req.user = userData;
          // move to next middleware or function
          next();
        })
        .catch(() =>
          res.status(404).json({
            statusCode: 404,
            status: 'error',
            message: 'User not found'
          })
        );
    });
  } else {
    return res.status(400).json({
      statusCode: 400,
      status: 'error',
      message: 'No token provided'
    });
  }
}

export default isAuth;