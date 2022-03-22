const { User, Thoughts } = require('../models');

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .then((User) => res.json(User))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.UserId })
      .select('-__v')
      .then((userdata) =>
        !userdata
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(userdata)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create A User
  createUser(req, res) {
    User.create(req.body)
      .then((userdata) => res.json(userdata))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId })
      .then((userdata) =>
        !userdata
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thoughts.deleteMany({ _id: { $in: User.thoughts } })
      )
      .then(() => res.json({ message: 'User and Thoughts deleted!' }))
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userdata) =>
        !userdata
          ? res.status(404).json({ message: 'No User with this id!' })
          : res.json(userdata)
      )
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
  AddFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
    .then((userdata) =>
    !userdata
      ? res.status(404).json({ message: 'No User with this id!' })
      : res.json(userdata)
  )
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)});
  },
  DeleteFriend(req,res) {
    User.findOneAndUpdate(
      { _id: req.params.UserId },
      { $pull: { friends: req.params.friendId }},
      { runValidators: true, new: true }
    )
    .then((userdata) =>
    !userdata
      ? res.status(404).json({ message: 'No User with this id!' })
      : res.json(userdata)
  )
  .catch((err) => {
    console.log(err)
    res.status(500).json(err)});
  }

}