// import lib
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

// use userSchema for save register data
const userSchema = require('../models/users.model')

// make registers path
router.post('/', async function(req, res, next) {
    try {
        let { username, password, email } = req.body
        // check register method if thier already exist.
        let existUser = await userSchema.findOne({ username, email })

        if (existUser) {
            return res.status(400).send({
                status: 400,
                message: "ไม่สำเร็จ",
            })
        } else {
            let register = new userSchema({
                username: username,
                password: await bcrypt.hash(password, 10),
                email: email,
                isApproved: false
            })
    
            await register.save()
            return res.status(201).send({
                status: 201,
                message: "สร้างสำเร็จ",
                data: register
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: "ไม่ทราบสาเหตุ",
            error: error
        })
    }
})

module.exports = router