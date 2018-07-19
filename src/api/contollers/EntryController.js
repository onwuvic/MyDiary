import Entry from './../models/Entry';

export const getAll = (req, res) => {
  Entry.findAll()
    .then(entry => res.status(200).json(entry))
    .catch(error => res.status(500).send('There was a problem finding the entries'));
};