const router = require('express').Router();
const {
    getThoughts,
    getSingleThoughts,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    createReaction,
    deleteReaction,
} =require('../../controllers/thoughtsControllers.js')

// /api/Thoughts
router.route('/').get(getThoughts).post(createThoughts);

// /api/Thoughts/:ThoughtsID

router
  .route('/:ThoughtsId')
  .get(getSingleThoughts)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction)





module.exports = router;