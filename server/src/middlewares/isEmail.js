// The regex email pattern is gotten from http://emailregex.com/

/**
 * A function that check if the email is correct.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return boolean: true if valid or status code of specific error if not valid
 */

const isEmail = (req, res, next) => {
  const { email } = req.body;
  /* eslint-disable no-useless-escape */
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) {
    return next();
  }
  return res.status(400).json({
    statusCode: 400,
    status: 'error',
    message: 'Invalid Email Address'
  });
};

export default isEmail;
