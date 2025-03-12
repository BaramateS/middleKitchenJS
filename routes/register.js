// import lib
const express = require('express')
const router = express.Router()

// import register module function
const registerModule = require('../functions/register.function')

// make registers path
router.post('/', registerModule.CreateNewUser)

module.exports = router