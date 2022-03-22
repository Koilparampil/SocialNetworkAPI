const { User, Thoughts } = require('../models');

module.exports = {
// Get all Thoughts
getThoughts(req, res) {
    Thoughts.find()
      .then((Thoughtsdata) => res.json(Thoughtsdata))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Thoughts
  getSingleThoughts(req, res) {
    Thoughts.findOne({ _id: req.params.ThoughtsId })
      .select('-__v')
      .then((thoughtsdata) =>
        !thoughtsdata
          ? res.status(404).json({ message: 'No thoughts with that ID' })
          : res.json(thoughtsdata)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create A Thoughts
  createThoughts(req, res) {
    Thoughts.create(req.body)
      .then((thoughtsdata)=> {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thoughtsdata._id } },
          { runValidators: true, new: true }
        ).then((userdata) => console.log(userdata))
        return thoughtsdata})
      .then((thoughtsdata) => res.json(thoughtsdata))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Thoughts
  deleteThoughts(req, res) {
    Thoughts.findOneAndDelete({ _id: req.params.ThoughtsId })
      .then((thoughtsdata) => {
        if(!thoughtsdata){
          res.status(404).json({ message: 'No thoughts with that ID' })}})
      .then(() => res.json({ message: 'Thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a Thoughts
  updateThoughts(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.ThoughtsId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thoughtsdata) =>
        !thoughtsdata
          ? res.status(404).json({ message: 'No Thoughts with this id!' })
          : res.json(thoughtsdata)
      )
      .catch((err) => res.status(500).json(err));
  },




}
