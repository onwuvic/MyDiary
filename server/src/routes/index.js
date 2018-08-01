import express from 'express';
import { signUp, logIn } from '../contollers/UserController';
import isAnyEmpty from '../middlewares/isAnyEmpty';
import doesUserExist from '../middlewares/doesUserExist';
import hashPassword from '../middlewares/hashPassword';
import {
  findAll, findOneById, findByIdAndRemove, findByIdAndUpdate, create
} from '../contollers/EntryController';
import isEmail from '../middlewares/isEmail';
import isAuth from '../middlewares/isAuth';
import isPasswordEqual from '../middlewares/isPasswordEqual';
import isLoginEmpty from '../middlewares/isLoginEmpty';
import isDiaryContentEmpty from '../middlewares/isDiaryContentEmpty';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});

router.post('/users/signup',
  isAnyEmpty,
  isEmail,
  isPasswordEqual,
  doesUserExist,
  hashPassword,
  signUp);

router.post('/users/login', isLoginEmpty, logIn);

// GET ALL ENTRIES
router.get('/entries', isAuth, findAll);

// GET ONE ENTRY
router.get('/entries/:id', isAuth, findOneById);

// CREATE NEW ENTRY
router.post('/entries', isDiaryContentEmpty, isAuth, create);

// UPDATE ONE ENTRY
router.put('/entries/:id', isAuth, findByIdAndUpdate);

// DELETE ONE ENTRY
router.delete('/entries/:id', isAuth, findByIdAndRemove);

export default router;
