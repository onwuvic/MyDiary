import db from '../database';

/**
 * A function that check if user can update an entry.
 * criteria: user can only update entry that was created the same day
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return status: 400 [bad request] 'User already exist' or move to next middleware
 */
const canUpdateEntry = (req, res, next) => {
  let entryId = req.params.id;

  db.one('SELECT created_At FROM entries WHERE id = $1', entryId)
    .then(createdAt => {
      
    })
    .catch(() => next());
}

export default doesUserExist;