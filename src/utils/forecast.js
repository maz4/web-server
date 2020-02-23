const request = require('request');

const forecast = (latitude, longitude, callback) => {

  const url = `https://api.darksky.net/forecast/60b4eb4e63052dfa291f430326161c2a/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback('Unable to connect to weather services', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      const {temperature, precipProbability } = body.currently
      const {summary} = body.daily.data[0]
      const message = `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain`;

      callback(undefined, message)
    }
  });
}

module.exports = forecast;