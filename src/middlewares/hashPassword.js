import bcrypt from 'bcrypt';

const hashPassword = (req, res, next) => {
  if(req.body.password) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err) return next(err);
      req.body.password = hash;
      next();
    });
  } else {
    res.json({error: 'password was not supplied'});
  }
}

export default hashPassword;