const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        producer: {type: String, required: true},
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        cpu: { type: String },
        ram: { type: String },
        rom: { type: String },
        card: { type: String },
        screen: { type: String },
        description: { type: String },
        discount: { type: Number },
        selled: { type: Number }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;