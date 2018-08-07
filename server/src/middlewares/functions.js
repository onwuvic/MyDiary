import bcrypt from 'bcrypt';
import db from '../database';

/**
 * A function that check if user already exist in database.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'User already exist' or move to next middleware
 */
export const doesUserExist = (req, res, next) => {
  db.one('SELECT email FROM users WHERE email = $1', req.body.email)
    .then(() => res.status(400).json({ status: 'error', message: 'User already exist' }))
    .catch(() => next());
};

/**
 * A function that hash password.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'User already exist' or move to next middleware
 */
export const hashPassword = (req, res, next) => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return next(err);
      req.body.password = hash;
      return next();
    });
  } else {
    res.status(400).json({
      status: 'error',
      message: 'password was not supplied'
    });
  }
};

/**
 * A function that check if sign up input is empty.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'All fields are required' or move to next middleware
 */
export const isAnyEmpty = (req, res, next) => {
  const {
    firstname, lastname, email, password
  } = req.body;

  if (!firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()) {
    return res.status(400).send({
      status: 'error',
      message: 'All fields are required'
    });
  }
  return next();
};

/**
 * A function that check if the title and body is empty.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return boolean: true if valid move to the next middleware
 *  else
 * return status code 400 with 'All fields are required'
 */
export const isDiaryContentEmpty = (req, res, next) => {
  const { title, body } = req.body;

  if (!title.trim() || !body.trim()) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required'
    });
  }
  return next();
};

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

export const isEmail = (req, res, next) => {
  const { email } = req.body;
  /* eslint-disable no-useless-escape */
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (emailRegex.test(email)) {
    return next();
  }
  return res.status(400).json({
    status: 'error',
    message: 'Invalid Email Address'
  });
};

/**
 * A function that check if login input is empty.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'All fields are required' or move to next middleware
 */
export const isLoginEmpty = (req, res, next) => {
  const { email, password } = req.body;

  if (!email.trim() || !password.trim()) {
    return res.status(422).json({
      status: 'error',
      message: 'You must provide an email and a password.'
    });
  }
  return next();
};

/**
<<<<<<< HEAD
=======
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
export const isPasswordEqual = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (password === confirmPassword) {
    return next();
  }
  return res.status(400).json({
    status: 'error',
    message: 'Password do not match'
  });
};

/**
>>>>>>> 46db5dedc2f82fe86b76ab669f789797b27aa2e1
 * A function that check if user password is less than six character.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'Password is less than six character' or move to next middleware
 */
export const isPasswordStrong = (req, res, next) => {
  const { password } = req.body;

  if (password.trim().length >= 6) {
    return next();
  }
  return res.status(400).json({
    status: 'error',
    message: 'Password is less than six character'
  });
};

/**
 * A function that check if user firstname and lastname is less than 2 character.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request]
 * 'Names should be more than one character' or move to next middleware
 */
export const isNameLengthLess = (req, res, next) => {
  const { firstname, lastname } = req.body;

  if (firstname.trim().length >= 2 && lastname.trim().length >= 2) {
    return next();
  }
  return res.status(400).json({
    status: 'error',
    message: 'First and Last Name should be more than one character'
  });
};

/**
 * A function that check if user title and body is less than 6 character.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request]
 * 'Title and diary content is too small' or move to next middleware
 */
export const isDiaryLengthLess = (req, res, next) => {
  const { title, body } = req.body;

  if (title.trim().length >= 6 && body.trim().length >= 6) {
    return next();
  }
  return res.status(400).json({
    status: 'error',
    message: 'Title and diary content is too small'
  });
};

/**
 * A function that check if user can update an entry.
 * criteria: user can only update entry that was created the same day
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'User already exist' or move to next middleware
 */
// const canUpdateEntry = (req, res, next) => {
//   const entryId = req.params.id;

//   db.one('SELECT created_At FROM entries WHERE id = $1', entryId)
//     .then((createdAt) => {

//     })
//     .catch(() => next());
// };
