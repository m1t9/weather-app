const jwt = require('jsonwebtoken');
const { User } = require('../user/user.model');
const JWT_SECRET_KEY = 'secret-key';
const { checkPass } = require('../../utils/hashHelper');
const { hashPass } = require('../../utils/hashHelper');

const login = async (login, password) => {
  const user = await User.findOne({ login });
  if (!user) {
    return false;
  }

  const { password: hashPassword } = user;
  const comparRes = await checkPass(password, hashPassword);
  if (!comparRes) {
    return false;
  }

  const { id } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
    expiresIn: '30min'
  });

  return token;
};

const signup = async (name, email, login, password) => {
  if (await User.findOne({ login }) || await User.findOne({ email })) {
    return false;
  }

  const newUser = User.create({ name, email, login, password: await hashPass(password) });

  const { id } = newUser;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
    expiresIn: '30min'
  });

  return token;
}

module.exports = {
  login,
  signup
};
