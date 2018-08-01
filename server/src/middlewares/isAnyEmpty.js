/**
 * A function that check if sign up input is empty.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'All fields are required' or move to next middleware
 */
const isAnyEmpty = (req, res, next) => {
  const {
    firstname, lastname, email, password
  } = req.body;

  if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
    return res.status(400).send({
      statusCode: 400,
      status: 'error',
      message: 'All fields are required'
    });
  }
  return next();
};

export default isAnyEmpty;
