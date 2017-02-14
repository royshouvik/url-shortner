// server.js
// where your node app starts

// init project
const express = require('express');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const randomize = require('randomatic');
const URL = require('./url');
var app = express();

mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/url', err => {
  if(err) {
    console.error("Error connecting to MongoDB");
    throw err;
  }
});

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/new/*", function (request, response) {
  const requestUrl = request.params[0];
  if(validUrl.isUri(requestUrl)) {

    // Create new URL doc
    const newURL = new URL();
    newURL.url = requestUrl;
    newURL.redirectUrl = getRandomString();
    newURL.save(err => {
      if(err) {
        console.error(err);
        return response.status(500).end();
      }
      response.send({
        original_url : newURL.url,
        short_url : `${process.env.BASE_URL}${newURL.redirectUrl}` 
      });
    })
  }
  else {
    response.status(400).send({
      error: "Invalid URL"
    }); 
  }
});

app.get("/:id", function (request, response) {
  URL.findOne({'redirectUrl': request.params.id}, (err, url) => {
    if(err)
      return response.status(500).end();
    if(url)
      return response.redirect(url.url);
    response.status(404).end();
  });
});


// Generate random 4 character long string of lowercase letters
const getRandomString = function () {
  return randomize('a', 4);
};

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
