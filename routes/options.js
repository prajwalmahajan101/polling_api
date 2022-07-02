// Node Modules
const express = require('express')
// Project Modules

//Controllers
const optionController = require('../controllers/option_controller')
//Variables
const router = express.Router()

//Request Handler  --->
// get
router.get('/:id/add-vote',optionController.addVote)
router.get('/:id/delete',optionController.deleteById)

// Export  Router
module.exports = router