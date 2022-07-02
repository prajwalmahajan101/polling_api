// Node Modules
const express = require('express')
// Project Modules

//Controllers
const questionController = require('../controllers/question_controller')
const optionController = require('../controllers/option_controller')
//Variables
const router = express.Router()

//Request Handler  --->


//post
router.post('/create',questionController.create)
router.post('/:id/options/create',optionController.create)
//get
router.get('/:id/delete',questionController.deleteById)
router.get('/:id',questionController.findById)
// Export  Router
module.exports = router