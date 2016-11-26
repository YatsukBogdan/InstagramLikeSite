var express = require('express');
var router = express.Router();
var path = require('path');
var md5 = require('js-md5');
var user = require('../databaseutils').user;
var userConnection = require('../databaseutils').userConnection;

router.post('/', (req, res) => {
  console.log(req.body.username);

  user.findOne({
    username: req.session.username
  }, (err, user_) => {
    if (user_) {
      if (user_.restriction == 'admin') {
        user.findOne({
          username: req.body.username
        }, (err, user_to_delete) => {
          if (user_to_delete) {
            user_to_delete.remove();
            userConnection.findOne({
              username: req.body.username
            }, (err, connection) => {
              connection.remove();
            });
          }
        });
      }
    }
  });
});

module.exports = router;
