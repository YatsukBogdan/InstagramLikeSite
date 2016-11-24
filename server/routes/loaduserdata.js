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
      res.json({
        email: user.email,
        age: user.age,
        posts: user.posts
      });
    }
  });

});

module.exports = router;
