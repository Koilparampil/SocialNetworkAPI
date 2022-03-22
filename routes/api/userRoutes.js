const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    AddFriend,
    DeleteFriend,
} =require('../../controllers/userControllers.js')


// /api/user
router.route('/').get(getUser).post(createUser);

// /api/User/:UserID

router
  .route('/:UserId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/:UserId/friends/:friendId').post(AddFriend).delete(DeleteFriend)



module.exports = router;