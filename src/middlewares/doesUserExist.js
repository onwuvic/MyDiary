import db from '../database';

const doesUserExist = (req, res, next) => {
  db.one('SELECT email FROM users WHERE email = $1', req.body.email)
    .then(email => {
      if(email) return res.status(200).send('User already exist');
    })
    .catch(() => next());
}

export default doesUserExist;