const express = require('express')
const router = express.Router()

// const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/token.middleware')

// import productSchema
const productSchema = require('../models/product.model')
const orderSchema = require('../models/orders.model')
// const { verify } = require('jsonwebtoken')

// GET all product
router.get('/', verifyToken, async function (req, res, next) {
    let products = await productSchema.find({})

    try {
        // send all user data
        return res.status(200).send({
            status: 200,
            message: 'สำเร็จ',
            data: products
        });
    } catch (error) {
        // send error message
        return res.status(500).send({
            status: 500,
            message: "ไม่ทราบสาเหตุ",
        })
    }
})

// GET findOne product
router.get('/:id', verifyToken, async function (req, res, next) {

    let { id } = req.params
    let products = await productSchema.findById(id)

    try {
        // send all user data
        return res.status(200).send({
            status: 200,
            message: 'สำเร็จ',
            data: products
        });
    } catch (error) {
        // send error message
        return res.status(500).send({
            status: 500,
            message: "ไม่ทราบสาเหตุ",
        })
    }
})

// POST create new product
router.post('/', verifyToken, async function (req, res, next) {
    try {
        let { name, price, quantities } = req.body
        let existProduct = await productSchema.findOne({ name })

        if (existProduct) {
            throw "This Product already exist."
        }

        let product = new productSchema({
            name: name,
            price: price,
            quantities: quantities
        })

        product.save()

        return res.status(201).send({
            status: 201,
            message: "สร้างสำเร็จ",
            data: product
        })

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "ไม่ทราบสาเหตุ",
            error: error
        })
    }
})

// PUT update product
router.put('/:id', verifyToken, async function (req, res, next) {
    try {
        let { name, price, quantities } = req.body
        let { id } = req.params
        let product = await productSchema.findByIdAndUpdate(id, { name, price, quantities }, { new: true })

        // เช็คว่ามี product ไหม
        if (!product) {
            throw "ไม่ทราบสาเหตุ"
        }

        return res.status(200).send({
            status: 200,
            message: "สำเร็จ",
            data: product
        })

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: error
        })
    }
})

// Delete Product by ID
router.delete('/:id', verifyToken, async function (req, res, next) {
    try {
        let { id } = req.params
        let product = await productSchema.findByIdAndDelete(id)

        if (!product) {
            throw "ไม่ทราบสาเหตุ"
        }

        return res.status(200).send({
            status: 200,
            message: "สำเร็จ",
            data: product
        })

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: error
        })
    }
})

// GET all orders in product
router.get('/:id/orders', verifyToken, async function (req, res, next) {

    try {
        let { id } = req.params
        let ordersInProduct = await orderSchema.find({ productID: id })

        return res.status(200).send({
            status: 200,
            message: "สำเร็จ",
            data: ordersInProduct
        })
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "ไม่ทราบสาเหตุ"
        })
    }

})

// POST create new order
router.post("/:id/orders", verifyToken, async function (req, res, next) {
    try {
        
        let { id } = req.params
        let { ordername, quantities, subTotal } = req.body
        let productQuantities = await productSchema.findById(id)

        let newOrder = new orderSchema({
            productID: id,
            ordername: ordername,
            quantities: quantities,
            subTotal: subTotal
        })

        // throw err เมื่อจำนวนสินค้าน้อยกว่าในคลัง
        if (quantities > productQuantities.quantities) {
            throw "จำนวนสินค้าในคลังไม่เพียงพอ"
        }

        // ค้นหาและลบจำนวนสินค้าหลังสั่ง
        await productSchema.findByIdAndUpdate(id, {quantities: productQuantities.quantities - quantities}, {new: true})
        await newOrder.save()
        return res.status(200).send({
            status: 201,
            message: "สร้างสำเร็จ",
            data: newOrder
        })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            message: "ไม่สำเร็จ",
            error: error
        })
    }
})

module.exports = router