/* 
    GET HOME PAGE
*/

exports.homePage = (req , res)=>{
    const locals = {
        title : "Notes App", 
        description : "Free NodeJs Notes App"
    }
    try {
        res.render('index.ejs' , locals);
    } catch (error) {
        console.log(error); 
        res.status(500).json({error : "internal server error"}); 
    }
}; 




/* 
    GET ABOUT PAGE
*/

exports.aboutPage = (req , res)=>{
    const locals = {
        title : "About", 
        description : "Free NodeJs Notes App"
    }
    try {
        res.render('about.ejs' , locals);
    } catch (error) {
        console.log(error); 
        res.status(500).json({error : "internal server error"}); 
    }
}; 







