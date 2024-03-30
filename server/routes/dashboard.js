const router = require('express').Router(); 
const dashBoardController = require('../controllers/dashboardController');
const {isLoggedIn} = require('../middleware/checkAuth'); 



/* 
    dashBoard ROUTES
*/

router.get('/dashboard' , isLoggedIn , dashBoardController.dashboard );






module.exports = router ; 