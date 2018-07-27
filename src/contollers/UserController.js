import db from '../database';
import tokenGenerator from '../helpers/jwt';
import bcrypt from 'bcrypt';

export const signUp = (req, res) => {
  db.one('insert into users(firstname, lastname, email, password)' +
  'values(${firstname}, ${lastname}, ${email}, ${password}) returning *',
    req.body)
    .then((result) => {
      const token = tokenGenerator(result);
      return res.status(201).send({token: token});
    })
    .catch(function (err) {
      return res.send(err.message);
    });
};

// export const login = (req, res) => {
//   const { email, password } = req.body;
//   if(!email || !password) {
//     return res.status(422).send('You must provide an email and a password.');
//   }

//   db.one('SELECT * FROM users WHERE email = $1', email)
//     .then(user => {
//       bcrypt.compare(password, user.password)
//         .then((res) => {
//           if (!res) return res.status(400).send('Invalid password.');
//         })
//         .catch((error) => res.status(505).send('Can not resolve password'));
//     })
//     // })
//     // .then(user => {
//     //   const token = tokenGenerator(user);
//     //   return res.status(200).json(token);
//     // })
//     .catch((error) => res.status(404).send('User not found, please sign up.'));
// }