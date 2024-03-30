const mongoose = require('mongoose')
const Chance = require('chance')
const User = require('./models/User')
const Thought = require('./models/Thought')
const { formatTime } = require('./utils/date')

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/social-network-api',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const generateRandomUserData = () => {
  const chance = new Chance()
  return {
    username: chance.name(),
    email: chance.email(),
  }
}

const generateRandomThoughtData = (users) => {
  const chance = new Chance()
  const thoughtText = chance.sentence()
  const createdAt = formatTime(new Date())
  const randomUser = chance.pickone(users)
  const username = randomUser.username
  return {
    thoughtText,
    createdAt,
    username,
  }
}

const seedDatabase = async () => {
  try {
    await User.deleteMany({})
    await Thought.deleteMany({})

    const users = []
    for (let i = 0; i < 10; i++) {
      const userData = generateRandomUserData()
      const user = await User.create(userData)
      users.push(user)
    }

    // Generate thoughts after creating users
    for (let i = 0; i < 20; i++) {
      const thoughtData = generateRandomThoughtData(users)
      await Thought.create(thoughtData)
    }

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedDatabase()
