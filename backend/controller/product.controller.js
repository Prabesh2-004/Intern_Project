import productModel from '../model/product.model.js';
import { v2 as cloudinary } from 'cloudinary';
import userModel from '../model/user.model.js';

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

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res
      .status(200)
      .json({ message: ' Fetched Successfully', success: true, product });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ message: 'failed to fetch single data', success: false });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted Successfully', success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'failed to delete data', success: false });
  }
};

export const getCartItem = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('cartItem');

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', success: false });
    }

    res.json({
      success: true,
      cartItem: user.cartItem || {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, color, quantity = 1 } = req.body;

    if (!productId || !color) {
      return res
        .status(400)
        .json({ success: false, message: 'Product Id and color is required' });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (!user.cartItem) {
      user.cartItem = {};
    }

    //This allows the same product in different sizes to be tracked separately
    const cartKey = `${productId}_${color}`;

    if (user.cartItem[cartKey]) {
      user.cartItem[cartKey] += quantity;
    } else {
      user.cartItem[cartKey] = quantity;
    }

    user.markModified('cartItem');
    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: 'Item added to cart',
        cartItem: user.cartItem,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, color, quantity } = req.body;

    if (!productId || !color || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, size, and quantity are required',
      });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const cartKey = `${productId}_${color}`;

    if (!user.cartItem || !user.cartItem[cartKey]) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    if (quantity <= 0) {
      delete user.cartItem[cartKey];
    } else {
      user.cartItem[cartKey] = quantity;
    }

    user.markModified('cartItem');
    await user.save();

    res.json({
      success: true,
      message: 'Cart updated',
      cartItem: user.cartItem,
    });
  } catch (error) {
    console.error('Update cart error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const removeProductCart = async (req, res) => {
  try {
    const { productId, color } = req.body;

    if (!productId || !color) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and size are required',
      });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    const cartKey = `${productId}_${color}`;

    if (user.cartItem && user.cartItem[cartKey]) {
      delete user.cartItem[cartKey];
      user.markModified('cartItem');
      await user.save();
    }

    res.json({
      success: true,
      message: 'Item removed from cart',
      cartItem: user.cartItem,
    });
  } catch (error) {
    console.error('Remove from cart error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const clearCart = async (req,res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.cartItem = {};
    user.markModified('cartItem');
    await user.save();

    res.json({ 
      success: true, 
      message: 'Cart cleared',
      cartItem: {} 
    });
  } catch (error) {
    console.error('Clear cart error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
}

export const syncLocalCart = async (req,res) => {
  try {
    const { localCartItem } = req.body;

    if (!localCartItem || typeof localCartItem !== 'object') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid cart data format' 
      });
    }

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (!user.cartItem) {
      user.cartItem = {};
    }

    Object.keys(localCartItem).forEach((cartKey) => {
      if (user.cartItem[cartKey]) {

        user.cartItem[cartKey] += localCartItem[cartKey];
      } else {
        user.cartItem[cartKey] = localCartItem[cartKey];
      }
    });

    user.markModified('cartItem');
    await user.save();

    res.json({ 
      success: true, 
      message: 'Cart synced successfully',
      cartItem: user.cartItem 
    });
  } catch (error) {
    console.error('Sync cart error:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
}
