const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} =require('../../controllers/userControllers.js')


// /api/user
router.route('/').get(getUser).post(createUser);

// /api/User/:UserID

router
  .route('/:UserId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;