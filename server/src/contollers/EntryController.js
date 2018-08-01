import db from '../database';

// GET ALL ENTRIES
export const findAll = (req, res) => {
  db.any('SELECT * FROM entries WHERE users_id = $1', req.user.id)
  .then((entries) => {
    return res.status(200).json(entries);
  })
  .catch((error) => res.status(500).send('There was a problem finding the diaries.'));
};

// CREATE A NEW ENTRY
export const create = (req, res) => {
  req.body.users_id = req.user.id;

  // remember to change db.query to db.none and update it to upload images and validation of entry
  db.one('INSERT INTO entries(title, body, users_id)' +
  'VALUES(${title}, ${body}, ${users_id}) RETURNING *',
    req.body)
    .then((entry) => {
      return res.status(201).json(entry);
    })
    .catch((err) => res.status(500).send('There was a problem adding the diary to the database.'));
};

// GET A SINGLE ENTRY
export const findOneById = (req, res) => {
  const entryId = parseInt(req.params.id);

  db.one('SELECT * FROM entries WHERE id = $1 AND users_id = $2', [entryId, req.user.id])
    .then((entries) => res.status(200).json(entries))
    .catch(() => res.status(404).send('None of your diaries was found with this ID'));
};

// UPDATE A SINGLE ENTRY
export const findByIdAndUpdate = (req, res) => {
  const entryId = parseInt(req.params.id);

  db.one('UPDATE entries SET title=$1, body=$2 WHERE id=$3 AND users_id = $4 RETURNING *',
    [req.body.title, req.body.body, entryId, req.user.id])
    .then((entry) => res.status(200).json(entry))
    .catch(() => res.status(500).send('There was a problem updating the entries.'));
};


// DELETE A SINGLE ENTRY
export const findByIdAndRemove = (req, res) => {
  const entryId = parseInt(req.params.id);

  db.result('DELETE FROM entries WHERE id = $1 AND users_id = $2', [entryId, req.user.id])
    .then((entries) => res.status(200).send('Diary was deleted successfully!!!'))
    .catch(() => res.status(500).send('There was a problem deleting the entry.'));
};
