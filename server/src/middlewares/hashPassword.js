import bcrypt from 'bcrypt';

/**
 * A function that hash password.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'User already exist' or move to next middleware
 */
const hashPassword = (req, res, next) => {
  if(req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err) return next(err);
      req.body.password = hash;
      next();
    });
  } else {
    res.status(400).json({
      statusCode: 400,
      status: 'error',
      message: 'password was not supplied'
    });
  }
}

export default hashPassword;