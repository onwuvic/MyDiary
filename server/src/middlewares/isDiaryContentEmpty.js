/**
 * A function that check if the title and body is empty.
 *
 * @param {Request: user input request} req
 * @param {Response: programs reponses} res
 * @param {Next: move on to the next middleware } next
 *
 * return boolean: true if valid move to the next middleware
 *  else
 * return status code 400 with 'All fields are required'
 */
const isDiaryContentEmpty = (req, res, next) => {

  const { title, body } = req.body;

  if(!title.trim() || !body.trim()) {
    return res.status(400).json({
      statusCode: 400,
      status: 'error',
      message: 'All fields are required'
    });
  } else {
    return next();
  }
}

export default isDiaryContentEmpty;