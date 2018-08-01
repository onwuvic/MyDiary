/**
 * A function that check if the password and confirm password are the same.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return boolean: true if valid move to the next middleware
 *  else
 * return status code 400 with 'Password do not match'
 */
const isPasswordEqual = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if(password === confirmPassword) {
    next();
  } else {
    return res.status(400).send('Password do not match');
  }
}

export default isPasswordEqual;