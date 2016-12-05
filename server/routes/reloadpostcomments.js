var express = require('express');
var router = express.Router();
var user = require('../databaseutils').user;

const LOG_PREFIX = 'RELOAD_POST_COMMENTS ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

router.post('/', (req, res) => {
  const post_username = req.body.username;
  const post_id = req.body.post_id;

  user.findOne({
    username: post_username
  }, (err, _user) => {
    if (err){
      logMessage('Error on database call');
      res.json({
        data: err
      });
    }
    if (_user) {
      res.json({
        comments: _user.posts[post_id].comments
      })
    }
  });
});

module.exports = router;
