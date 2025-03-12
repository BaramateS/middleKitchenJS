// use userSchema for save register data
const userSchema = require('../models/users.model')

// import bcrypt
const bcrypt = require('bcrypt')

async function CreateNewUser(req, res, next) {
    try {
        let { username, password, email } = req.body
        // check register method if thier already exist.
        let existUser = await userSchema.findOne({ username, email })
        console.log("new user", username)
        console.log("exist user: ", existUser)

        if (existUser) {
            return res.status(400).send({
                status: 400,
                message: "This user already exist.",
            })
        } else {
            console.log("ERR", username)
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
}

module.exports = {
    CreateNewUser
}