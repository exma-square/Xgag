var express = require('express');
var router = express.Router();

var home = require('./home');

router.route('/')
    .get(home)

module.exports = router;