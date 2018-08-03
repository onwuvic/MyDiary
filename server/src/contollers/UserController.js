import bcrypt from 'bcrypt';
import db from '../database';
import tokenGenerator from '../helpers/jwt';
import refactorUserData from '../helpers/refactorUserData';


/*import { DH_CHECK_P_NOT_PRIME } from 'constants';
*
 * A function to sign up new users
 * @params req: request [user input request],
 * @params res: response [programs reponses]
 *
 * return web token [which only user to navigate secure part of the app and resources ]
*/
/* eslint-disable consistent-return */
export const signUp = (req, res) => {
  const {
    firstname, lastname, email, password
  } = req.body;

  firstname.trim();
  lastname.trim();
  email.trim();

  /* eslint-disable no-template-curly-in-string */
  db.one('INSERT INTO users(firstname, lastname, email, password)'
  + 'VALUES(${firstname}, ${lastname}, ${email}, ${password}) RETURNING *',
  {
    firstname, lastname, email, password
  })
    .then((user) => {
      const userData = refactorUserData(user);
      const token = tokenGenerator(userData);
      return res.status(201).json({
        status: 'success',
        data: userData,
        message: 'Successfully signup',
        token
      });
    })
    .catch(() => res.status(500).json({
      status: 'error',
      message: 'Can not sign up now. Try again.'
    }));
};

/**
 * A function to login existing users
 * @params req: request [user input request],
 *         res: response [programs reponse]
 *
 * return web token [which only user to navigate secure part of the app and resources ]
*/
export const logIn = (req, res) => {
  const { email, password } = req.body;

  // check if mail exist in the database
  db.one('SELECT * FROM users WHERE email = $1', email)
    .then((user) => {
      const userData = user;
      // refactor the user data to exclude password
      const refactorUser = refactorUserData(user);
      if (userData) {
        // check if user password match
        bcrypt.compare(password, userData.password)
          .then((matched) => {
            if (!matched) {
              return res.status(400).json({
                status: 'error',
                message: 'Invalid email and password.'
              });
            }
          })
          .then(() => {
            const token = tokenGenerator(refactorUser);
            return res.status(200).json({
              status: 'success',
              data: refactorUser,
              message: 'Successfully login',
              token
            });
          })
          .catch(() => res.status(505).json({
            status: 'error',
            message: 'Can not resolve password'
          }));
      }
    })
    .catch(() => res.status(404).send({
      status: 'error',
      message: 'User not found, please sign up.'
    }));
};
