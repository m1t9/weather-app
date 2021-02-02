const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Data = new Schema(
  {
    time: Number,
    login: String,
    weatherData: Object
  },
  { collection: 'weather_data' }
);

const toResponse = data => {
  const { id, time, login, weatherData } = data;
  return { id, time, login , weatherData};
};

module.exports = {
  Data: mongoose.model('weather_data', Data),
  toResponse
};