const express = require('express')
const router = express.Router()

// const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/token.middleware')

// const { verify } = require('jsonwebtoken')

// import product module function
const productModule = require('../functions/products.function')

// GET all product
router.get('/', verifyToken, productModule.FindAllProduct)

// GET findOne product
router.get('/:id', verifyToken, productModule.FindOneProduct)

// POST create new product
router.post('/', verifyToken, productModule.CreateNewProduct)

// PUT update product
router.put('/:id', verifyToken, productModule.UpdateProduct)

// Delete Product by ID
router.delete('/:id', verifyToken, productModule.DeleteProduct)

// GET all orders in product
router.get('/:id/orders', verifyToken, productModule.FinOrdersInProduct)

// POST create new order
router.post("/:id/orders", verifyToken, productModule.CreateNewOrder)

module.exports = router