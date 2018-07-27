const isAnyEmpty = (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  if(!firstname || !lastname || !email || !password) {
    return res.status(422).send('All fields are required');
  } else {
    return next();
  }
}

export default isAnyEmpty;