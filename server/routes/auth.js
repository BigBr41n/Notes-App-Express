const router = require('express').Router(); 
const passport = require('passport'); 
require('dotenv').config(); 
const User = require('../models/User'); 

//strategy 
const GoogleStrategy = require('passport-google-oauth20'); 


passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID , 
    clientSecret : process.env.GOOGLE_CLIENT_SECRET , 
    callbackURL : process.env.GOOGLE_CALLBACK 
},

async function(accessToken , refreshToken , profile , done){
    const displayName = `${profile.name.givenName} ${profile.name.familyName}`;
        let newUser = {
            googleId : profile.id , 
            displayName : displayName, 
            firstName : profile.name.givenName ,
            lastName : profile.name.familyName , 
            profileImage : profile.photos[0].value 
        }
        try {
            const user = await User.findOne({googleId : profile.id}); 
            if(user) done(null , user);
            else {
                user = await User.create(newUser); 
                done(null , user); 
            }

        } catch (error) {
            console.log(error); 
        } 
    }
)) ;



// Google Login Route
router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );
  

// Retrieve user data
router.get(
    "/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/login-failure",
      successRedirect: "/dashboard",
    })
);




 // Route if something goes wrong
router.get('/login-failure', (req, res) => {
    res.send('Something went wrong...');
});



///LOGOUT 
// Destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
      if(error) {
        console.log(error);
        res.send('Error loggin out');
      } else {
        res.redirect('/')
      }
    })
  });


// Presist user data after successful authentication
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
  
  // Retrieve user data from session.
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
}); 













module.exports = router ; 