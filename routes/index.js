const router = require('express').Router();

// to add a route, copy and paste below and change the users name
router.use('/users', require('./users'));
// For example,
// router.use('/physicians', require('./physicians'));

module.exports = router;