var express = require('express');
var router = express.Router();
var path = require('path');
var md5 = require('js-md5');
var user = require('../databaseutils').user;

router.get('/:word', (req, res) => {
  console.log(req.params.word);
  user.find({
    username: {
      $regex: req.params.word
    }
  }, (err, users) => {
    if (users) {
      var users_res = [];
      for (var i = 0; i < users.length; i++){
        users_res.push({
          username: users[i].username
        });
      }
      console.log(users_res);
      res.json(users_res);
    }
  });
});

module.exports = router;
