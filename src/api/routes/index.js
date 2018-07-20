import express from 'express';
import { getAll, createOne, getOne } from './../contollers/EntryController';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});

// GET ALL ENTRIES
router.get('/entries', getAll);

// GET ONE ENTRY
router.get('/entries/:id', getOne);

// CREATE NEW ENTRY
router.post('/entries', createOne);



export default router;
