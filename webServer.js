/* jshint node: true */

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var async = require('async');

var express = require('express');
var app = express();

var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

mongoose.connect('mongodb://localhost/project6', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname));

app.get('/', function (request, response) {
  response.send('Simple web server of files from ' + __dirname);
});

app.get('/test/:p1', function (request, response) {
  console.log('/test called with param1 = ', request.params.p1);

  var param = request.params.p1 || 'info';

  if (param === 'info') {
    SchemaInfo.find({}, function (err, info) {
      if (err) {
        console.error('Doing /user/info error:', err);
        response.status(500).send(JSON.stringify(err));
        return;
      }
      if (info.length === 0) {
        response.status(500).send('Missing SchemaInfo');
        return;
      }

      console.log('SchemaInfo', info[0]);
      response.end(JSON.stringify(info[0]));
    });
  } else if (param === 'counts') {
    var collections = [
      { name: 'user', collection: User },
      { name: 'photo', collection: Photo },
      { name: 'schemaInfo', collection: SchemaInfo }
    ];
    async.each(collections, function (col, done_callback) {
      col.collection.countDocuments({}, function (err, count) {
        col.count = count;
        done_callback(err);
      });
    }, function (err) {
      if (err) {
        response.status(500).send(JSON.stringify(err));
      } else {
        var obj = {};
        for (var i = 0; i < collections.length; i++) {
          obj[collections[i].name] = collections[i].count;
        }
        response.end(JSON.stringify(obj));
      }
    });
  } else {
    response.status(400).send('Bad param ' + param);
  }
});

app.get('/user/list', function (request, response) {
  User.find({}, function (err, users) {
    let newUsers = users;
    async.forEachOf(users, function (user, index, done_callback) {
      let { _id, first_name, last_name } = user;
      newUsers[index] = { _id, first_name, last_name };
      done_callback();
    }, function (err1) {
      if (err1) {
        response.status(500).send(JSON.stringify(err1));
      } else {
        response.status(200).send(newUsers);
      }
    });
  });
});

app.get('/user/:id', function (request, response) {
  var id = request.params.id;

  // Check if the provided ID is valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(400).send('Invalid user ID');
  }

  User.findOne({ _id: id }, function (err, user) {
    if (err) {
      console.error('Error fetching user:', err);
      return response.status(500).send('Internal Server Error');
    }

    // Check if user exists
    if (!user) {
      return response.status(404).send('User not found');
    }

    // User found, send the response
    let { _id, first_name, last_name, location, description, occupation } = user;
    let newUser = { _id, first_name, last_name, location, description, occupation };
    response.status(200).send(newUser);
  });
});


app.get('/photosOfUser/:id', function (request, response) {
  var id = request.params.id;
  // Original query for fetching user photos
  Photo.aggregate([
    {
      "$match": {
        "user_id": { "$eq": new mongoose.Types.ObjectId(id) }
      }
    },
    {
      "$addFields": {
        "comments": { "$ifNull": ["$comments", []] }
      }
    },
    {
      "$lookup": {
        "from": "users",
        "localField": "comments.user_id",
        "foreignField": "_id",
        "as": "users"
      }
    },
    {
      "$addFields": {
        "comments": {
          "$map": {
            "input": "$comments",
            "in": {
              "$mergeObjects": [
                "$$this",
                {
                  "user": {
                    "$arrayElemAt": [
                      "$users",
                      {
                        "$indexOfArray": [
                          "$users._id",
                          "$$this.user_id"
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    },
    {
      "$project": {
        "users": 0,
        "__v": 0,
        "comments.__v": 0,
        "comments.user_id": 0,
        "comments.user.location": 0,
        "comments.user.description": 0,
        "comments.user.occupation": 0,
        "comments.user.__v": 0
      }
    }
  ]).exec((err, photosWithComments) => {
    if (err) {
      console.error('Error fetching photos with comments:', err);
      response.status(500).send('Internal Server Error');
    } else {
      response.status(200).send(photosWithComments);
    }
  });
});

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
