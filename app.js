// PACKAGES
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// LIBRARYS
const utils = require('./libs/utils.js');
const spotify = require('./libs/spotify.api.js');
const api = require('./routes/api/v1');

app.use(session({
    secret: 'lob4673990291d2dab8cd40d9131ccc9d5f',
    maxAge: 60 * 60 * 1000,
    resave: true,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, 'dist/css')));
app.use('/js', express.static(path.join(__dirname, 'dist/js')));
app.use('/images', express.static(path.join(__dirname, 'dist/images')));

app.use('/api/v1', api);

app.all('/login', function(req, res, next) {
  res.sendFile('index.html', {root: path.join(__dirname, './dist/')});
});

app.get('/logoff', function(req, res, next) {
  req.session.access_token = null;
  res.redirect('/login');
});

app.all('*', function(req, res, next) {
  if(!req.session.access_token) {
    let redirect_url = (req.originalUrl.indexOf('api') === -1 && req.originalUrl !== '/') ? req.originalUrl : null;
    res.redirect('/login'+(redirect_url ? ('?redirect='+redirect_url) : ''));
  } else {
    res.sendFile('index.html', {root: path.join(__dirname, './dist/')});
  }
});

utils.logToConsole('server', 'Listening on 8888');
app.listen(8888);