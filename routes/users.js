var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// bring userSchema into this file
const userSchema = require('../models/users.model')

/* GET users listing. */
router.get('/', async function(req, res, next) {

  let user = await userSchema.find({})
  try {
    // send all user data
    return res.status(200).send({
      status: 200,
      message: 'สำเร็จ',
      data: user
    });
  } catch (error) {
    // send error message
    return res.status(200).send({
      status: 500,
      message: "ไม่ทราบสาเหตุ",
    })
  }
});

// POST users login
router.post('/', async function(req, res, next) {
  
  try {    
    // request body
    let { username, email, password } = req.body
    let user = await userSchema.findOne({ username, email })

    console.log("Login user --> ", user)

    // check condition if no username and password
    if (user) {
      console.log("useruser", user)
      let comparePassword = await bcrypt.compare(password, user.password)
      console.log("password", bcrypt.hash(password, 10))
      console.log("hash pass", user.password)
      console.log("compare pass", comparePassword)
      if (comparePassword) {
        if (!user.isApproved) {
          throw "Please Verify your Account."
        }

        let token = jwt.sign({...user}, process.env.JWT_KEY)
        return res.status(201).send({
          status: 201,
          message: "สร้างสำเร็จ",
          token: token,
          data: user
        })
      } else {
        return res.status(400).send({
          status: 400,
          message: "ไม่สำเร็จ"
        })
      }

    } else {
      return res.status(400).send({
        status: 404,
        message: "ไม่พบข้อมูลผู้ใช้",
      })
    }
    
  } catch (error) {
    // send not user not found status
    return res.status(404).send({
      status: 404,
      message: "ไม่พบข้อมูลผู้ใช้",
      error: error
    })
  }
  
});

// Update user approve status
router.put('/:id', async function(req, res, next) {

  try {
    let { username, email, isApproved } = req.body
    let { id } = req.params
  
    let user = await userSchema.findByIdAndUpdate(id, {username, email, isApproved}, {new: true})
  
    return res.status(200).send({
      status: 200,
      message: "สำเร็จ",
      data: user
    })
    
  } catch (error) {
    return res.status(500).send({
      status: 500,
      message: "ไม่ทราบสาเหตุ",
    })
  }

})

module.exports = router;
