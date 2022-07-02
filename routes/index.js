// Node Modules
const express = require('express')



// Project Modules

//Controllers
const homeController = require('../controllers/home_controller')
//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/',homeController.home)
router.use('/questions',require('./questions'))
router.use('/options',require('./options'))
router.use('/',homeController.error404)

// Export  Router
module.exports = router