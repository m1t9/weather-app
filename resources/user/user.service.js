const { User } = require('./user.model');
const { hashPass } = require('../../utils/hashHelper');

const create = async user => {
  const { name, login } = user;
  let { password } = user;

  password = await hashPass(password);

  return User.create({ name, login, password });
}

const get = async login => {
  return user = await User.findOne({ login : login }).exec(); 
}

module.exports = { create, get };
