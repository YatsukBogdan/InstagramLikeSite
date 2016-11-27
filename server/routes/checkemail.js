var express = require('express');
var router = express.Router();
var user = require('../databaseutils').user;

const LOG_PREFIX = 'CHECK_EMAIL ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

router.post('/', (req, res) => {
  const req_email = req.body.email;
  logMessage(`Email requested: ${req_email}`);

  user.findOne({
    email: req_email
  }, (err, _user) => {
    if (_user) {
      logMessage(`Email is already using`);
      res.json({emailexist: true});
    } else {
      logMessage(`Email not used`);
      res.json({emailexist: false});
    }
  });
});

module.exports = router;
