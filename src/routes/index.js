import express from 'express';
import { signUp, logIn } from '../contollers/UserController';
import isAnyEmpty from './../middlewares/isAnyEmpty';
import doesUserExist from './../middlewares/doesUserExist';
import hashPassword from './../middlewares/hashPassword';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});

router.post('/users/signup',
  isAnyEmpty,
  doesUserExist,
  hashPassword,
  signUp
);

router.post('/users/login', logIn);

// // GET ALL ENTRIES
// router.get('/entries', getAll);

// // GET ONE ENTRY
// router.get('/entries/:id', getOne);

// // CREATE NEW ENTRY
// router.post('/entries', createOne);

// // UPDATE ONE ENTRY
// router.put('/entries/:id', updateOne);

export default router;
