exports.isLoggedIn = (req , res , next)=>{
    console.log(req);
    if(req.isUnauthenticated()){ 
        next(); 
    }
    else{
        return res.status(401).redirect('/'); 
    }
}