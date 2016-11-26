var express = require('express');
var router = express.Router();
var userConnection = require('../databaseutils').userConnection;

router.post('/', (req, res) => {
  const uname = req.session.username;
  const token = req.session.token;

  console.log('log: isAuthorized:' + uname);
  if (token == undefined){
    res.json({
      isAuthorized: false,
      username: uname,
      restriction: 'guest'
    });
    return;
  }

  userConnection.findOne({
    username: uname
  }, (err, connection) => {
    if (err){
      res.json({
        isAuthorized: false,
        username: uname,
        restriction: connection.restriction
      });
      return;
    }
    if (connection) {
      if (token == connection.token){
        res.json({
          isAuthorized: true,
          username: uname,
          restriction: connection.restriction
        });
      } else {
        res.json({
          isAuthorized: false,
          username: uname,
          restriction: connection.restriction
        });
      }
    } else {
      res.json({
        isAuthorized: false,
        username: uname,
        restriction: connection.restriction
      });
    }
  });

});

module.exports = router;
