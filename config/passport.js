const fs = require('fs');
const path = require('path');
const User = require('mongoose').model('User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// more options available as per https://www.passportjs.org/packages/passport-jwt/
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256']
  };


// take the options above, grab the jwt from the auth header, and validate the jwt 
const strategy = new JwtStrategy(options, (payload, done) => {
   // lookup our user in the database by id
    User.findOne({_id: payload.sub})
        // grab the user
        .then((user)=> {
            if (user) { // if theres a user, return user
                return done(null, user);
            } else { // if not, return false
                return done(null, false);
            }
        }) // catch any errors and pass to the callback function
        .catch(err => done(err, null));
});

// passport imported from our app.js file
module.exports = (passport) => {
        passport.use(strategy);
}