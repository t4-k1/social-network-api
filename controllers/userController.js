const { User, Thought } = require('../models')

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((userData) => res.json(userData))
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  // GET user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v',
      })
      .populate({
        path: 'friends',
        select: '-__v',
      })
      .select('-__v')
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user with this ID!' })
          return
        }
        res.json(userData)
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json(err)
      })
  },

  // POST new user
  createUser({ body }, res) {
    User.create(body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(400).json(err))
  },

  // PUT user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user with this ID!' })
          return
        }
        res.json(userData)
      })
      .catch((err) => res.status(400).json(err))
  },

  // DELETE user by id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user with this ID!' })
          return
        }
        // Remove user's thoughts
        return Thought.deleteMany({ _id: { $in: userData.thoughts } })
      })
      .then(() => {
        res.json({
          message: 'User and thoughts deleted successfully!',
        })
      })
      .catch((err) => res.status(400).json(err))
  },

  // POST friend to user's friend list
  addFriend({ params }, res) {
    const { userId, friendId } = params
    console.log(`Adding friend with ID ${friendId} to user with ID ${userId}`)

    User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } }, // Use $addToSet to avoid duplicates
      { new: true }
    )
      .then((userData) => {
        console.log('User data after adding friend:', userData)
        if (!userData) {
          return res
            .status(404)
            .json({ message: 'No user found with this ID!' })
        }
        res.json(userData)
      })
      .catch((err) => {
        console.error('Error adding friend:', err)
        res.status(400).json(err)
      })
  },

  // DELETE remove friend from user's friend list
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: 'No user found with this ID!' })
          return
        }
        res.json({ message: 'Friend removed successfully!' }) // Send a success message
      })
      .catch((err) => res.status(400).json(err))
  },
}

module.exports = userController
