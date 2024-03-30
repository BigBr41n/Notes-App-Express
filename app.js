//imports
const express = require('express'); 
const expressLayout = require('express-ejs-layouts');
const session = require('express-session'); 
const passport = require('passport'); 
const MongoStroe = require('connect-mongo'); 
const cookieParser = require('cookie-parser'); 
require('dotenv').config(); 



//main app 
const app = express() ;


//midlleware 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


//import database config
const { db_connect } = require('./server/config/db_config'); 
db_connect(); 





/* app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store : MongoStroe.create({
        mongoUrl : process.env.DB_URI
    }),
    cookie: { secure: true }
  })); */




//passport middleware (auth)
/* app.use(passport.initialize()); 
app.use(passport.session()); */



//routes import
//const auth = require('./server/routes/auth')
const mainRoute = require('./server/routes/index');
const dashboardRoute = require('./server/routes/dashboard');  




//static files 
app.use(express.static('public')); 




//Templating engine
app.use(expressLayout); 
app.set('layout' , './layouts/main'); 
app.set('view engine' , 'ejs');




//routes 
app.use("/" , mainRoute); 
app.use("/" , dashboardRoute); 
//app.use('/' , auth); 





/* 
    handl 404
*/

//handling unexpected routes 
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  app.use((err, req, res, next) => {
    res.locals.error = err;
    const status = err.status || 500;
    res.status(status);
    res.render('404');
});
  


module.exports = app ;












