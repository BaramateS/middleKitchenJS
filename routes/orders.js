const express = require('express')
const router = express.Router()

// const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/token.middleware')

// import orderSchema
const orderSchema = require('../models/orders.model')

// GET all order
router.get('/', verifyToken, async function(req, res, next) {
    let orders = await orderSchema.find({})

    try {
        // send all user data
        return res.status(200).send({
          status: 200,
          message: 'สำเร็จ',
          data: orders
        });
      } catch (error) {
        // send error message
        return res.status(500).send({
          status: 500,
          message: "ไม่ทราบสาเหตุ",
        })
      }
})

module.exports = router
