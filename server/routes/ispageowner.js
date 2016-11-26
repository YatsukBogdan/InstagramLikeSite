var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
  const uname_sess = req.session.username;
  const uname_req = req.body.username;

  if (uname_sess == uname_req){
    res.json({isOwner: true});
  } else {
    res.json({isOwner: false});
  }
});

module.exports = router;
