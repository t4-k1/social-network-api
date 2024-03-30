const mongoose = require('mongoose')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB!')
})

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB!')
})

module.exports = mongoose.connection
