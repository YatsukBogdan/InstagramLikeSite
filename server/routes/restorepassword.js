var express = require('express');
var router = express.Router();
var md5 = require('js-md5');
var user = require('../databaseutils').user;

router.get('/:key', (req, res) => {
  if (req.session.restorepasskey == req.params.key)
    res.json({
      admited: true
    });
  else
    res.json({
      admited: false
    });
});

router.post('/', (req, res) => {
  const pass = req.body.password;
  const uname = req.session.username;
  var passHash = md5(pass);

  user.update({
    username: uname
  },{
    $set: { passwordHash: passHash }
  }, (err, user) =>{
    console.log(user);
  });
  res.json({
    status: 'done'
  });
});

module.exports = router;
