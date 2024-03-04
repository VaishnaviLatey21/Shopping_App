const { string } = require('i/lib/util');
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    userId: String
});

module.exports = mongoose.model("cart",  cartSchema);