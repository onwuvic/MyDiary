// The regex email pattern is gotten from http://emailregex.com/

/**
 * A function that check if the email is a valid email or not.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return boolean: true if valid move to the next middleware
 *  else
 * return status code 400 with 'Invalid Email Address'
 */
const isEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(emailRegex.test(email)) {
    next();
  } else {
    return res.status(400).send('Invalid Email Address');
  }
}

export default isEmail;