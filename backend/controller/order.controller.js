// controllers/order.controller.js
import orderModel from '../model/order.model.js';
import userModel from '../model/user.model.js';

// Place Order (User)
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    const userId = req.user.id; // or req.user._id - both work

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: paymentMethod || 'COD',
      payment: paymentMethod === 'card',
      status: 'Order Placed',
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: 'Order placed successfully!',
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ success: false, message: 'Order placement failed' });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate('userId', 'username email avatar')
      .sort({ date: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Fetch orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    console.log('Received request body:', req.body);
    const { orderId, status } = req.body;

    // Valid statuses
    const validStatuses = [
      'Order Placed',
      'Processing',
      'Shipped',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
    ];

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: 'Order ID and status required' });
    }

    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid status' });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    res.json({
      success: true,
      message: 'Order status updated',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Update order error:', error);
    res
      .status(500)
      .json({
        success: false,
        message: 'Failed to update order',
        error: error.message,
      });
  }
};

// Get user's orders (User)
export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.user.id })
      .sort({ date: -1 }); // or createdAt if using timestamps

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Fetch user orders error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
};

// Cancel order (User - only if not shipped)
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: 'Order not found' });
    }

    if (order.userId.toString() !== req.user.id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    if (['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel shipped orders',
      });
    }

    order.status = 'Cancelled';
    await order.save();

    res.json({ success: true, message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ success: false, message: 'Failed to cancel order' });
  }
};
