var express = require('express');
var router = express.Router();
var md5 = require('js-md5');
var user = require('../databaseutils').user;

router.post('/', (req, res) => {
  const email_ = req.body.email;
  const uname = req.body.username;
  const pass = req.body.password;
  var passHash = md5(pass);

  var new_user = new user({
    id: 0,
    username: uname,
    passwordHash: passHash,
    email: email_,
    age: 20,
    posts: null,
    user_image: null
  });

  new_user.save(function(err, resp){
    console.log('cool');
    res.json({
      status: true
    });
  });
});

module.exports = router;