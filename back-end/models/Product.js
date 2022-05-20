const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Product must have name'], trim: true},
    description: { type: String, required: [true, 'Product must have description'], trim: true},
    price: { type: Number, required: [true, 'Product must have price'], trim: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {type: String},
    cloudinary_id: {type: String}
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)
module.exports = Product 