import express from 'express';
import { getAll } from './../contollers/EntryController';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});

// GET ALL ENTRIES
router.get('/entries', getAll);


export default router;
