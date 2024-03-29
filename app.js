//imports
const express = require('express'); 
const expressLayout = require('express-ejs-layouts');




//routes import
const mainRoute = require('./server/routes/index'); 





//main app 
const app = express() ;




//midlleware 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());





//static files 
app.use(express.static('public')); 




//Templating engine
app.use(expressLayout); 
app.set('layout' , './layouts/main'); 
app.set('view engine' , 'ejs');




//routes 
app.use("/" , mainRoute); 





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












