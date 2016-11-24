var express = require('express');
var router = express.Router();
var userConnection = require('../databaseutils').userConnection;

router.post('/', (req, res) => {
  const uname = req.session.username;
  const token = req.session.token;

  console.log('log: isAuthorized:' + uname);
  if (token == undefined){
    res.json({
      isAuthorized: false
    });
    return;
  }

  userConnection.findOne({
    username: uname
  }, (err, connection) => {
    if (err){
      res.json({
        isAuthorized: false
      });
      return;
    }
    if (connection) {
      if (token == connection.token){
        res.json({
          isAuthorized: true
        });
      } else {
        res.json({
          isAuthorized: false
        });
      }
    } else {
      res.json({
        isAuthorized: false
      });
    }
  });

});

module.exports = router;
