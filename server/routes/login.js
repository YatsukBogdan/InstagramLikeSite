var express = require('express');
var md5 = require('js-md5');
var router = express.Router();
var jwt =  require('jsonwebtoken');
var user = require('../databaseutils').user;
var userConnection = require('../databaseutils').userConnection;

const superSecret = "asd3tg9*(53lj!@$RG.Shsfh).hsa6261y%&%_)&";

router.post('/', (req, res) => {
  const uname = req.body.username;
  const pass = req.body.password;
  var passHash = md5(pass);

  user.findOne({
    username: uname,
    passwordHash: passHash
  }, function(err, user) {
    if (user){
      userConnection.findOne({
        username: uname
      }, (err, connection) =>{
        var token = jwt.sign(user, superSecret, {
          expiresIn: 60*60*24
        });
        req.session.username = uname;
        req.session.token = token;

        if (connection) {
          userConnection.update({
            username: uname
          }, {
            $set: {
              token: token
            }
          }, (err, resp) => {
            console.log(resp);
          });
        } else {
          var new_user_connection = new userConnection({
            username: uname,
            token: token
          });

          new_user_connection.save((err) => {
            console.log('New connection created.');
          });
        }
        res.json({
          logined: true
        });
      });
    } else {
      console.log('Login failed.');
      res.json({
        logined: false
      });
    }
  });
});

module.exports = router;
