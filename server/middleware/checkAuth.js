exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next(); // Proceed to the next middleware
    } else {
        return res.status(401).redirect('/'); // Redirect to root URL with status code 401
    }
};