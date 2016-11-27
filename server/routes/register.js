var express = require('express');
var router = express.Router();
var md5 = require('js-md5');
var fs = require('fs');
var path = require('path');
var user = require('../databaseutils').user;

const LOG_PREFIX = 'REGISTER ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

router.post('/', (req, res) => {
  const req_email = req.body.email;
  const req_username = req.body.username;
  const req_passwordHash = req.body.passwordHash;

  var new_user = new user({
    username: req_username,
    passwordHash: req_passwordHash,
    email: req_email,
    age: 20,
    posts: [],
    image_extension: 'png',
    tmp_post_extension: null,
    restriction: 'user'
  });

  fs.writeFileSync(path.join(__dirname, '../public/userimages', md5(req.body.username) + '.png'),
                   fs.readFileSync(path.join(__dirname, '../public', 'default-user-image.png')));

  new_user.save(function(err, resp){
    logMessage(`New user registered: ${req_username}`);
    res.json({
      status: true
    });
  });
});

module.exports = router;
