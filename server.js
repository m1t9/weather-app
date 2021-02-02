const mongoose = require('mongoose');
const { User } = require('./resources/user/user.model');
const PORT = process.env.PORT || 5000;

const app = require('./app');
const { hashPass } = require('./utils/hashHelper');

// const admin = async () => {
//   const password = await hashPass('admin');
//   User.create({ name: 'admin', login: 'admin', password });
// };

const MONGO_CONNECTION_STRING = 'mongodb+srv://admin:admin@cluster0.gbyz1.mongodb.net/cluster0-shard-00-00?retryWrites=true&w=majority';

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.once(
  'open',
  () => {
    console.log('Successfully connect to DB');
    // admin();
  }
);
