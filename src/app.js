const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));


app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Marcin'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Marcin"
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'This is help message',
    title: 'Help',
    name: 'Marcin'
  });
});

app.get('/weather', (req, res) => {

  const {address} = req.query;

  if(!address){
    return res.send({
      error: 'You must provide search address'
    });
  }

  geocode(address, (error, {location, longitude, latitude} = {}) => {
    if(error) {
      return res.send({ error })
    }

    return forecast(longitude, latitude, (error, forecastData) => {
      if(error){
        return res.send({ error })
      }

      res.send({
        location: location,
        forecastData: forecastData,
        address: address
      })
    })
  })
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Marcin',
    errorMessage: 'Help article not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Marcin',
    errorMessage: '404 Page not found',
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
