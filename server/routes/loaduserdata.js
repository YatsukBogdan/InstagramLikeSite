var express = require('express');
var router = express.Router();
var user = require('../databaseutils').user;

router.post('/', (req, res) => {
  const req_username = req.body.username;

  user.findOne({
    username: req_username
  }, (err, _user) => {
    if (_user) {
      res.json({
        email: _user.email,
        age: _user.age
      });
    }
  });

});

module.exports = router;
