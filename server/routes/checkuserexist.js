var express = require('express');
var router = express.Router();
var user = require('../databaseutils').user;

router.post('/', (req, res) => {
  const uname = req.body.username;
  console.log(uname);
  user.findOne({
    username: uname
  }, (err, user) => {
    if (user) {
      console.log('cool');
      res.json({
        userexist: true
      });
    } else {
      console.log('shit');
      res.json({
        userexist: false
      });
    }
  });

});

module.exports = router;
