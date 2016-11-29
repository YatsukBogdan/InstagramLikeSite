var express = require('express');
var router = express.Router();
var user = require('../databaseutils').user;

const LOG_PREFIX = 'LIKE_POST ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

router.post('/', (req, res) => {
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
    }
    if (_user){
      for (var i = 0; i < _user.posts[post_id].likedBy.length; i++) {
        if (_user.posts[post_id].likedBy[i] == sess_username){
          _user.posts[post_id].likedBy.pull(sess_username);
          _user.posts[post_id].likes--;
          _user.save( (err) => {
            if (err){
              logMessage(`Error on saving like state on database call`);
              res.json({
                data: err
              });
            }
            logMessage(`Post ${post_id} of user ${post_username} unliked by ${sess_username}`);
            res.json({
              data: 'success'
            });
          });
          return;
        }
      }

      _user.posts[post_id].likedBy.push(sess_username);
      _user.posts[post_id].likes++;
      _user.save( (err) => {
        if (err){
          logMessage(`Error on saving like state on database call`);
          res.json({
            data: err
          });
        }
        logMessage(`Post ${post_id} of user ${post_username} liked by ${sess_username}`);
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
