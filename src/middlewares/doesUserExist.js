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
const doesUserExist = (req, res, next) => {
  db.one('SELECT email FROM users WHERE email = $1', req.body.email)
    .then(email => {
      if(email) return res.status(400).send('User already exist');
    })
    .catch(() => next());
}

export default doesUserExist;