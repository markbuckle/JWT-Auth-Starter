const mongoose = require('mongoose');
const router = require('express').Router();   
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// allows us to test whether we did the jwt authentication correctly
// the "passport.authenticate('jwt', { session: false })" should be added to any route that you need to authenticate
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

// Validate an existing user and issue a JWT
router.post('/login', function(req, res, next){
    User.findOne({ username: req.body.username })
    .then((user) => {

        if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
        }
        
        // Function defined at bottom of app.js
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
        
        if (isValid) {

            const tokenObject = utils.issueJWT(user);

            res.status(200).json({ success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {

            res.status(401).json({ success: false, msg: "you entered the wrong password" });

        }

    })
    .catch((err) => {
        next(err);
    });
});

// register a new user
router.post('/register', function(req, res, next){
    // take the plain text password the user has provided
    const saltHash = utils.genPassword(req.body.password);
    
    //create a salt and a hash based on the plain text password
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    // store the salt and hash in the user record of the database
    const newUser = new User({
        username: req.body.username,
        hash: hash,
        salt: salt
    });
    // save user in the database
    newUser.save()
        .then((user) => { // return success message if user is found and issue a jwt

            const jwt = utils.issueJWT(user);

            res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
        })
        .catch (err => next(err));
});

module.exports = router;