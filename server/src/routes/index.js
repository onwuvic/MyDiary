import express from 'express';
import { signUp, logIn } from '../contollers/UserController';
import isAnyEmpty from '../middlewares/isAnyEmpty';
import doesUserExist from '../middlewares/doesUserExist';
import hashPassword from '../middlewares/hashPassword';
import { findAll, findOneById, findByIdAndRemove } from '../contollers/EntryController';
import isEmail from '../middlewares/isEmail';
import isAuth from '../middlewares/isAuth';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});

router.post('/users/signup',
  isAnyEmpty,
  isEmail,
  doesUserExist,
  hashPassword,
  signUp
);

router.post('/users/login', logIn);

// GET ALL ENTRIES
router.get('/entries', isAuth, findAll);

// GET ONE ENTRY
router.get('/entries/:id', isAuth, findOneById);

// // CREATE NEW ENTRY
// router.post('/entries', createOne);

// // UPDATE ONE ENTRY
// router.put('/entries/:id', updateOne);

// DELETE ONE ENTRY
router.delete('/entries/:id', isAuth, findByIdAndRemove);

export default router;
