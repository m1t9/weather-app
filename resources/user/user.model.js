const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    name: String,
    email: String,
    login: String,
    password: String
  },
  { collection: 'users' }
);

const toResponse = user => {
  const { id, name, email, login } = user;
  return { id, name, email, login };
};

module.exports = {
  User: mongoose.model('users', User),
  toResponse
};