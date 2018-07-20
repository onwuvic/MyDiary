import express from 'express';
import { getAll, createOne, getOne, updateOne } from './../contollers/EntryController';

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

// UPDATE ONE ENTRY
router.put('/entries/:id', updateOne);

export default router;
