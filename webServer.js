'use strict';

var express = require('express');
var portno = 3000;
var app = express();

var models = require('./modelData/photoApp.js').models;

app.use(express.static(__dirname));

app.get('/', function (request, response) {
  response.send('Simple web server of files from ' + __dirname);
});

// URL /test/info - Return models.schemaInfo()
app.get('/test/info', function (request, response) {
  var info = models.schemaInfo();
  if (info.length === 0) {
    response.status(500).send('Missing SchemaInfo');
  } else {
    response.status(200).json(info);
  }
});

// URL /user/list - Return all the User objects
app.get('/user/list', function (request, response) {
  var userList = models.userListModel();
  response.status(200).json(userList);
});

// URL /user/:id - Return the information for User (id)
app.get('/user/:id', function (request, response) {
  var id = request.params.id;
  var user = models.userModel(id);
  if (user === null) {
    response.status(400).send('User with _id: ' + id + ' not found');
  } else {
    response.status(200).json(user);
  }
});

// URL /photosOfUser/:id - Return the Photos for User (id)
app.get('/photosOfUser/:id', function (request, response) {
  var id = request.params.id;
  var photos = models.photoOfUserModel(id);
  if (photos.length === 0) {
    response.status(400).send('Photos for user with _id: ' + id + ' not found');
  } else {
    response.status(200).json(photos);
  }
});

var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
