var express = require('express');
var router = express.Router();
var path = require('path');
var md5 = require('js-md5');
var user = require('../databaseutils').user;

router.get('/:username', (req, res) => {
  user.findOne({
    username: req.params.username
  }, (err, user) => {
    if (user){
      res.sendFile(path.join(__dirname, '../public/userimages', md5(req.params.username) + '.' + user.image_extension));
    }
  });
});

module.exports = router;
