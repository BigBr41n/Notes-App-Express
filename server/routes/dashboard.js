const router = require('express').Router(); 
const dashBoardController = require('../controllers/dashboardController'); 



/* 
    dashBoard ROUTES
*/

router.get('/dashboard' , dashBoardController.dashboard );






module.exports = router ; 