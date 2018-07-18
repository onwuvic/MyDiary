import express from 'express';

const router = express.Router();

// HOME PAGE
router.get('/', (req, res) => {
  res.send('Home Page');
});


export default router;
