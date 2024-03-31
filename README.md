# Social Network API

ThoughtKeeper is a RESTful API for managing thoughts and reactions between users. It provides endpoints for creating, retrieving, updating, and deleting thoughts, as well as adding and removing reactions to/from thoughts.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Thoughts](#thoughts)
- [Usage](#usage)
- [License](#license)

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation

1. Clone the repository:

```bash
git clone git@github.com:t4-k1/social-network-api.git
```

2. Install dependencies

```bash
npm install
```

3. Set up the MongoDB database and configure the connection in a `.env` file:

```bash
MONGODB_URI=your_mongodb_uri
```

4. Start the server

```bash
npm start
```

## API Endpoints

### Users

`GET /api/users`: Get all users.
`GET /api/users/:id`: Get a user by ID.
`POST /api/users`: Create a new user.
`PUT /api/users/:id`: Update a user by ID.
`DELETE /api/users/:id`: Delete a user by ID.
`POST /api/users/:userId/friends/:friendId`: Add a friend to a user's friend list.
`DELETE /api/users/:userId/friends/:friendId`: Remove a friend from a user's friend list.

### Thoughts

`GET /api/thoughts`: Get all thoughts.
`GET /api/thoughts/:id`: Get a thought by ID.
`POST /api/thoughts`: Create a new thought.
`PUT /api/thoughts/:id`: Update a thought by ID.
`DELETE /api/thoughts/:id`: Delete a thought by ID.
`POST /api/thoughts/:thoughtId/reactions`: Add a reaction to a thought.
`DELETE /api/thoughts/:thoughtId/reactions/:reactionId`: Remove a reaction from a thought.

## Usage

Use a tool like [Insomnia](https://insomnia.rest/) to interact with the API endpoints.

## License

This project is licensed under the MIT License.
