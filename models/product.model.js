// Require mongoose
const mongoose = require('mongoose')
const {Schema} = mongoose

// create ORM productSchema
const productSchema = new Schema({
    name: {type: String},
    price: {type: Number},
    quantities: {type: Number}
}, {
    timestamps: true
})

// exports products collection
module.exports = mongoose.model('products', productSchema)