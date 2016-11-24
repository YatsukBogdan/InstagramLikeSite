var express = require('express');
var router = express.Router();
var userConnection = require('../databaseutils').userConnection;

router.post('/', (req, res) => {
  const uname = req.session.username;

  console.log(uname);
  userConnection.findOne({
    username: uname
  }, function(err, connection) {
    if (connection) {
      console.log('Connection removed');
      connection.remove();
      req.session.destroy();
      res.json({
        loggedOut: true
      });
    } else {
      console.log('Connection not exist');
      res.json({
        loggedOut: false
      });
    }
  });
});

module.exports = router;
