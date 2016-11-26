var express = require('express');
var router = express.Router();
var md5 = require('js-md5');
var fs = require('fs');
var path = require('path');
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
    posts: [],
    image_extension: 'png',
    tmp_post_extension: null,
    restriction: 'user'
  });

  fs.writeFileSync(path.join(__dirname, '../public/userimages', md5(req.body.username) + '.png'),
                   fs.readFileSync(path.join(__dirname, '../public', 'default-user-image.png')));
  new_user.save(function(err, resp){
    console.log('cool');
    res.json({
      status: true
    });
  });
});

module.exports = router;
