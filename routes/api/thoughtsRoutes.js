const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
} =require('../../controllers/thoughtsControllers.js')

// /api/Thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/Thoughts/:ThoughtsID

router
  .route('/:ThoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;