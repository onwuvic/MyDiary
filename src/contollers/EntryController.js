import db from '../database';

// GET ALL ENTRIES
export const findAll = (req, res) => {
  db.any('SELECT * FROM entries WHERE users_id = $1', req.user.id)
  .then((entries) => {
    return res.status(200).json(entries);
  })
  .catch((error) => res.status(500).send('There was a problem finding the diaries.'));
};

// // CREATE A NEW ENTRY
// export const createOne = (req, res) => {
//   Entry.create({
//     title: req.body.title,
//     body: req.body.body,
//     feature_image: req.body.feature_image
//   })
//     .then(entry => res.status(201).json(entry))
//     .catch(() => res.status(500).send('There was a problem creating the entry to the database.'));
// };

// GET A SINGLE ENTRY
export const findOneById = (req, res) => {
  const entryId = parseInt(req.params.id);

  db.one('SELECT * FROM entries WHERE id = $1 AND users_id = $2', [entryId, req.user.id])
    .then((entries) => res.status(200).json(entries))
    .catch(() => res.status(404).send('None of your diaries was found with this ID'));
};

// // UPDATE A SINGLE ENTRY
// export const updateOne = (req, res) => {
//   Entry.findByIdAndUpdate(req.params.id,
//     {
//       title: req.body.title,
//       body: req.body.body,
//       feature_image: req.body.feature_image
//     })
//     .then(entry => res.status(200).json(entry))
//     .catch(() => res.status(500).send('There was a problem updating the entry.'));
// };


// DELETE A SINGLE ENTRY
export const findByIdAndRemove = (req, res) => {
  const entryId = parseInt(req.params.id);

  db.result('DELETE FROM entries WHERE id = $1 AND users_id = $2', [entryId, req.user.id])
    .then((entries) => res.status(200).send('Diary was deleted successfully!!!'))
    .catch(() => res.status(500).send('There was a problem deleting the entry.'));
};
