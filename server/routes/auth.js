const express = require('express');
const router = express.Router();
const passport = require('passport');
require('dotenv').config();
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Passport setup
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    scope: ['profile', 'email']
}, async (accessToken, refreshToken, profile, done) => {
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
        console.error(error);
        done(error, false);
    }
}));

// Middleware setup
router.use(passport.initialize());
router.use(passport.session());

// Routes
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard',
}));

router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
});

router.get('/logout', (req, res) => {
    if (req.isAuthenticated()) {
        req.logout(); // Passport.js method to clear session
    }
    res.redirect('/');
});

// Passport serialization and deserialization
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = router;
