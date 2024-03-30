const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
}, async function (accessToken, refreshToken, profile, done) {
    try {
        const displayName = `${profile.name.givenName} ${profile.name.familyName}`;
        let newUser = {
            googleId: profile.id,
            displayName: displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            profileImage: (profile.photos && profile.photos.length > 0) ? profile.photos[0].value : null
        };
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
            done(null, user);
        } else {
            user = await User.create(newUser);
            done(null, user);
        }
    } catch (error) {
        console.log(error);
        done(error, false);
    }
}));

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard',
}));

router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
});



router.get('/logout', (req, res) => {
    req.logout(); // Passport.js method to clear session
    res.redirect('/');
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = router;
