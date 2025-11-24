import productModel from '../model/product.model.js';
import { v2 as cloudinary } from 'cloudinary';

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, sizes, colors } = req.body;
    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image',
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      sizes: req.body['sizes[]'] || req.body.sizes,
      images: imageUrl,
      colors: req.body['colors[]'] || req.body.colors,
    };

    const product = new productModel(productData);
    await product.save();

    res.status(201).json({ message: 'Product Added', success: true });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: 'error while fetching data', success: false });
  }
};

export const getProduct = async (req,res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id);
        res.status(200).json({message: ' Fetched Successfully', success: true, product});

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'failed to fetch single data', success: false})
    }
}

export const deleteProduct = async (req,res) => {
    try {
        const { id } = req.params;
        await productModel.findByIdAndDelete(id);
        res.status(200).json({message: 'Deleted Successfully', success: true})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: 'failed to delete data', success: false})
    }
}