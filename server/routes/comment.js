var express = require('express');
var router = express.Router();
var user = require('../databaseutils').user;

const LOG_PREFIX = 'COMMENT_POST ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

router.post('/', (req, res) => {
  const comment = req.body.comment;
  const sess_username = req.session.username;
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
      return;
    }
    if (_user){
      _user.posts[post_id].comments.push({
        username: sess_username,
        date: new Date(),
        text: comment
      });
      _user.save( (err) => {
        if (err){
          logMessage(`Error on saving like state on database call`);
          logMessage(err);
          res.json({
            data: err
          });
          return;
        }
        logMessage(`Post ${post_id} of user ${post_username} commented by ${sess_username}`);
        res.json({
          data: 'success'
        });
      });
    } else {
      logMessage(`There is no ${post_username} in the database`);
      res.json({
        data: 'suck'
      });
    }
  });
});

module.exports = router;
