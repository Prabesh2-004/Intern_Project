import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    images: {type: Array, required: true},
    sizes: {type: Array, required: true},
    colors: {type: Array, required: true},
    category: {type: String, required: true},
},{timestamps: true})

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;
