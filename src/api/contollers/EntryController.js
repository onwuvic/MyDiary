import Entry from './../models/Entry';

export const getAll = (req, res) => {
  Entry.findAll()
    .then(entry => res.status(200).json(entry))
    .catch(error => res.status(500).send('There was a problem finding the entries'));
};

export const createOne = (req, res) => {
  Entry.create({title: req.body.title, body: req.body.body, feature_image: req.body.feature_image})
    .then(entry => res.status(201).json(entry))
    .catch(error => res.status(500).send('There was a problem creating the entry to the database.'));
}