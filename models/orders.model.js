// import mongoose
const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = new Schema({
    productID: {type: Schema.Types.ObjectId, ref: 'products'},
    ordername: {type: String},
    quantities: {type: Number},
    subTotal: {type: Number}
})

module.exports = mongoose.model('orders', orderSchema)