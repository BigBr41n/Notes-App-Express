const mongoose = require('mongoose'); 
require('dotenv').config(); 


module.exports.db_connect = ()=>{
    try {
        mongoose.connect(process.env.DB_URI); 
        const db = mongoose.connection ; 
        db.on('error' , ()=> console.log('connection broke')); 
        db.once('open' , ()=> console.log('connection success')); 
    } catch (error) {
        console.log('database connection error : ' + error); 
    }
}; 