// PACKAGES
var express = require('express');
var router = express.Router();
var axios = require('axios');

// LIBRARYS
const utils = require('../../../libs/utils.js');
const spotify = require('../../../libs/spotify.api.js');

router.post('/auth', function(req, res) {
  let credentials = null;
  utils.logToConsole('form auth', JSON.stringify(req.body));
  if(req.body.login_type == 'client_id') {
    credentials = {
      client_id: req.body.client_id,
      client_secret: req.body.client_secret
    }
  } else if(req.body.login_type == 'hash') {
    credentials = {
      hash: req.body.hash
    }
  } else if(req.body.login_type == 'token') {
    req.session.access_token = req.body.token;
    if(req.body.redirect) {
      res.redirect(req.body.redirect);
    } else {
      res.redirect('/');
    }
    return;
  }

  spotify.auth(credentials).then(function (response) {
    if (response.status === 200) {
      utils.logToConsole('spotify auth', JSON.stringify(response.data));
      req.session.access_token = response.data.access_token;
      if(req.body.redirect) {
        res.redirect(req.body.redirect);
      } else {
        res.redirect('/');
      }
    } else {
      utils.logToConsole('error', response.statusText);
      res.send('Error: '+response.statusText);
    }
    
  }).catch(function (error) {
    utils.logToConsole('error', error);
    res.send('Error: '+JSON.stringify(error));
  });
});

router.get('/search/recents', function(req, res) {
  if(req.session.search_recents) {
    res.json(req.session.search_recents);
  } else {
    res.json({});
  }
});

router.get('/search/:query', function(req, res) {
  spotify.search(req.session.access_token, req.params.query, req.query.limit).then(function (response) {
    if(response.data.artists) {
      response.data.artists.items.map((item) => {
        item.chave = utils.slugify(item.name);
      });
    }
    if(response.data.albums) {
      response.data.albums.items.map((item) => {
        item.chave = utils.slugify(item.name);
      });
    }
    req.session.search_recents = response.data;
    res.json(response.data);
  }).catch(function (error) {
    utils.logToConsole('error', error);
    res.json(error);
  });
});

router.get('/artists/:key/albums/', function(req, res) {
  spotify.search(req.session.access_token, req.params.key.split('-').join(' ')).then(function (response) {
    let artists = response.data.artists.items.find((item) => {
      return utils.slugify(item.name) == req.params.key;
    });
    let artist = Array.isArray(artists) ? artists[0] : artists;
    spotify.artists_albums(req.session.access_token, artist.id, req.query.limit).then(function (response) {
      if(response.data.items) {
        response.data.items.map((item) => {
          //item.chave = utils.slugify(item.name);
          item.chave = req.params.key;
        });
      }
      res.json({artist: artist, albums: response.data});
    }).catch(function (error) {
      utils.logToConsole('error', error);
      res.json(error);
    });
  }).catch(function (error) {
    utils.logToConsole('error', error);
    res.json(error);
  });
});

router.get('/albums/:id', function(req, res) {
  spotify.albums(req.session.access_token, req.params.id).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    utils.logToConsole('error', error);
    res.json(error);
  });
});

module.exports = router;