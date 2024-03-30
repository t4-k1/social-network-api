const { User, Thought } = require('../models')

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  // GET thought by ID
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v',
      })
      .select('-__v')
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this ID!' })
          return
        }
        res.json(thoughtData)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  // POST new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((thoughtData) => {
        const userId = body.userId

        if (!userId) {
          return res.status(400).json({ message: 'User ID not provided.' })
        }

        return Promise.all([
          User.findOneAndUpdate(
            { _id: userId },
            { $push: { thoughts: thoughtData._id } },
            { new: true }
          ),
          thoughtData,
        ])
      })
      .then(([userData, thoughtData]) => {
        res.json({ userData, thoughtData })
      })
      .catch((err) => res.status(400).json(err))
  },

  // PUT update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this ID!' })
          return
        }
        res.json(thoughtData)
      })
      .catch((err) => res.status(400).json(err))
  },

  // DELETE thought by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this ID!' })
          return
        }
        res.json({ message: 'Thought deleted successfully!' }) // Send a custom message as the response
      })
      .catch((err) => res.status(400).json(err))
  },

  // POST reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          res.status(404).json({ message: 'No thought with this ID!' })
          return
        }
        res.json(thoughtData)
      })
      .catch((err) => res.status(400).json(err))
  },

  // DELETE reaction from thought
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((thoughtData) => {
        if (!thoughtData) {
          return res.status(404).json({ message: 'No thought with this ID!' })
        }
        return res.json({ message: 'Reaction deleted successfully!' })
      })
      .catch((err) => res.status(400).json(err))
  },
}

module.exports = thoughtController
