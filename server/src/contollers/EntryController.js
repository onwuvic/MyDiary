import db from '../database';

// GET ALL ENTRIES
export const findAll = (req, res) => {
  db.any('SELECT * FROM entries WHERE users_id = $1', req.user.id)
    .then(entries => res.status(200).json({
      status: 'success',
      data: entries,
      message: 'successfully fetch all diary entries'
    }))
    .catch(() => res.status(500).json({
      status: 'error',
      message: 'There was a problem finding the diaries.'
    }));
};

// CREATE A NEW ENTRY
export const create = (req, res) => {
  const { title, body } = req.body;

  title.trim();
  body.trim();

  const users_id = req.user.id;

  // remember to change db.query to db.none and update it to upload images and validation of entry
  /* eslint-disable no-template-curly-in-string */
  db.one('INSERT INTO entries(title, body, users_id)'
  + 'VALUES(${title}, ${body}, ${users_id}) RETURNING *',
  {title, body, users_id})
    .then(entry => res.status(201).json({
      status: 'success',
      data: entry,
      message: 'successfully created the diary entry'
    }))
    .catch(() => res.status(500).json({
      status: 'error',
      message: 'There was a problem adding the diary to the database.'
    }));
};

// GET A SINGLE ENTRY
/* eslint-disable radix */
export const findOneById = (req, res) => {
  const entryId = parseInt(req.params.id);
  db.one('SELECT * FROM entries WHERE id = $1 AND users_id = $2', [entryId, req.user.id])
    .then(entry => res.status(200).json({
      status: 'success',
      data: entry,
      message: 'successfully fetch one diary entry'
    }))
    .catch(() => res.status(404).json({
      status: 'error',
      message: 'None of your diaries was found with this ID'
    }));
};

// UPDATE A SINGLE ENTRY
export const findByIdAndUpdate = (req, res) => {
  const entryId = parseInt(req.params.id);

  const { title, body } = req.body;

  title.trim();
  body.trim();

  db.one('UPDATE entries SET title=$1, body=$2 WHERE id=$3 AND users_id = $4 RETURNING *',
    [title, body, entryId, req.user.id])
    .then(entry => res.status(200).json({
      status: 'success',
      data: entry,
      message: 'successfully update the diary entry'
    }))
    .catch(() => res.status(500).json({
      status: 'error',
      message: 'There was a problem updating the entry.'
    }));
};


// DELETE A SINGLE ENTRY
export const findByIdAndRemove = (req, res) => {
  const entryId = parseInt(req.params.id);
  db.one('DELETE FROM entries WHERE id=$1 AND users_id = $2 RETURNING *', [entryId, req.user.id])
    .then(() => res.status(200).json({
      status: 'success',
      message: 'Diary was deleted successfully!!!'
    }))
    .catch(() => res.status(404).json({
      status: 'error',
      message: 'None of your diaries was found with this ID'
    }));
};
