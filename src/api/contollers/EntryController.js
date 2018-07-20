import Entry from './../models/Entry';

// GET ALL ENTRIES IN MEMORY
export const getAll = (req, res) => {
  Entry.findAll()
    .then(entry => res.status(200).json(entry))
    .catch(error => res.status(500).send('There was a problem finding the entries'));
};

// CREATE A NEW ENTRY
export const createOne = (req, res) => {
  Entry.create({title: req.body.title, body: req.body.body, feature_image: req.body.feature_image})
    .then(entry => res.status(201).json(entry))
    .catch(error => res.status(500).send('There was a problem creating the entry to the database.'));
};

// GET A SINGLE ENTRY IN MEMORY
export const getOne = (req, res) => {
  Entry.findOne(req.params.id)
    .then(entry => res.status(200).json(entry))
    .catch(error => res.status(404).send('No entry found'));
};

// UPDATE A SINGLE ENTRY IN MEMORY
export const updateOne = (req, res) => {
  Entry.findByIdAndUpdate(req.params.id, {title: req.body.title, body: req.body.body, feature_image: req.body.feature_image})
    .then(entry => res.status(200).json(entry))
    .catch(error => res.status(500).send('There was a problem updating the entry.'));
}