import express from 'express';
import { signUp, logIn } from '../contollers/UserController';
import {
  findAll, findOneById, findByIdAndRemove, findByIdAndUpdate, create
} from '../contollers/EntryController';
import isAuth from '../middlewares/isAuth';
import {
  isAnyEmpty,
  isEmail,
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
  doesUserExist,
  hashPassword,
  signUp);

router.post('/users/login', isLoginEmpty, logIn);

// GET ALL ENTRIES
router.get('/entries', isAuth, findAll);

// GET ONE ENTRY
router.get('/entries/:id', isAuth, findOneById);

// CREATE NEW ENTRY
router.post('/entries', isAuth, isDiaryContentEmpty, isDiaryLengthLess, create);

// UPDATE ONE ENTRY
router.put('/entries/:id', isAuth, isDiaryContentEmpty, isDiaryLengthLess, findByIdAndUpdate);

// DELETE ONE ENTRY
router.delete('/entries/:id', isAuth, findByIdAndRemove);

export default router;
