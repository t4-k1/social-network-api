const mongoose = require('mongoose')
const { Schema } = mongoose
const { dateFormat } = require('../utils/date')

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
)

const Reaction = mongoose.model('Reaction', reactionSchema)

module.exports = Reaction
