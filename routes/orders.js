const express = require('express')
const router = express.Router()

// const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/token.middleware')

// import orders module function
const orderModule = require('../functions/orders.function')

// GET all order
router.get('/', verifyToken, orderModule.FindAllOrders)

module.exports = router
