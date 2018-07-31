/**
 * A function that check if login input is empty.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'All fields are required' or move to next middleware
 */
const isLoginEmpty = (req, res, next) => {

  const { email, password } = req.body;

  if(!email.trim() || !password.trim()) {
    return res.status(422).send('You must provide an email and a password.');
  } else {
    return next();
  }
}

export default isLoginEmpty;