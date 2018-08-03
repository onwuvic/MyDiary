import express from 'express';
import { signUp, logIn } from '../contollers/UserController';
import {
  findAll, findOneById, findByIdAndRemove, findByIdAndUpdate, create
} from '../contollers/EntryController';
import isAuth from '../middlewares/isAuth';
import {
  isAnyEmpty,
  isEmail, isPasswordEqual,
  doesUserExist, hashPassword,
  isLoginEmpty, isDiaryContentEmpty,
  isPasswordStrong, isNameLengthLess, isDiaryLengthLess
} from '../middlewares/functions';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});

router.post('/users/signup',
  isAnyEmpty,
  isNameLengthLess,
  isEmail,
  isPasswordStrong,
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
router.post('/entries', isDiaryContentEmpty, isDiaryLengthLess, isAuth, create);

// UPDATE ONE ENTRY
router.put('/entries/:id', isDiaryContentEmpty, isDiaryLengthLess, isAuth, findByIdAndUpdate);

// DELETE ONE ENTRY
router.delete('/entries/:id', isAuth, findByIdAndRemove);

export default router;
