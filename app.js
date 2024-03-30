//imports
const express = require('express'); 
const expressLayout = require('express-ejs-layouts');
const session = require('express-session'); 
const passport = require('passport'); 
const MongoStroe = require('connect-mongo'); 
require('dotenv').config(); 



//import database config
const { db_connect } = require('./server/config/db_config'); 
db_connect(); 







//routes import
const auth = require('./server/routes/auth')
const mainRoute = require('./server/routes/index');
const dashboardRoute = require('./server/routes/dashboard');  





//main app 
const app = express() ;





//passport middleware (auth)
app.use(passport.initialize());
app.use(passport.session()) ;
//midlleware 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//session 
app.use(session({
    secret : 'cat laptop',
    resave : false , 
    saveUninitialized : true , 
    store : MongoStroe.create({
        mongoUrl : process.env.DB_URI
    })
}))




//static files 
app.use(express.static('public')); 




//Templating engine
app.use(expressLayout); 
app.set('layout' , './layouts/main'); 
app.set('view engine' , 'ejs');




//routes 
app.use("/" , mainRoute); 
app.use("/" , dashboardRoute); 
app.use('/' , auth); 





/* 
    handl 404
*/

//handling unexpected routes 
app.use((req , res , next)=>{
    try {
        const error = new Error('Invalid path'); 
        error.status = 404 ; 
        next(error);
    } catch (error) {
        console.log(error); 
        res.status(500).json({error : "Internal server error"}); 
    }
}); 


app.use((err , req , res , next)=>{
    try {
        res.status(err.status).render('404.ejs'); 
    } catch (error) {
        console.log(error); 
        res.status(500).json({error : "Internal server error"}); 
    }
});


module.exports = app ;












