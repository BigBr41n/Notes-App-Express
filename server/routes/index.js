const router = require('express').Router(); 
const mainController = require('../controllers/mainController'); 



/* 
    APP routes
*/

router.get('/' , mainController.homePage);
router.get('/about' , mainController.aboutPage);






module.exports = router ; 