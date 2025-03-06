// import mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose

// create ORM userSchema
const userSchema = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String},
    isApproved: {type: Boolean}
}, {
    timestamps: true
})

// exports users collection
module.exports = mongoose.model('users', userSchema)