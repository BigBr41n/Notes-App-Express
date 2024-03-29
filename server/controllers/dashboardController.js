

exports.dashboard = (req , res)=>{
    const locals = {
        title : "Dashboard", 
        description : "Free NodeJs Notes App"
    }
    try {
        res.render('dashboard/index.ejs' , {locals , layout : '../views/layouts/dashboard'});
    } catch (error) {
        console.log(error); 
        res.status(500).json({error : "internal server error"}); 
    }
};