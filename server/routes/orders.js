const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

// Get user's purchase history
router.get('/history', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.song', 'title artist album coverImage')
      .populate('items.album', 'title artist coverImage')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    res.status(500).json({ message: 'Error fetching purchase history' });
  }
});

// Get specific order details
router.get('/:orderId', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.orderId, 
      user: req.user._id 
    })
    .populate('items.song', 'title artist album coverImage audioUrl')
    .populate('items.album', 'title artist coverImage tracks');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order details:', error);
    res.status(500).json({ message: 'Error fetching order details' });
  }
});

// Create new order (for checkout process)
router.post('/', auth, async (req, res) => {
  try {
    const { items, paymentMethod, billingAddress, notes } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item' });
    }

    const order = new Order({
      user: req.user._id,
      items: items,
      paymentMethod: paymentMethod,
      billingAddress: billingAddress,
      notes: notes
    });

    order.calculateTotals();
    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Update order status (for admin use)
router.patch('/:orderId/status', auth, async (req, res) => {
  try {
    const { status, paymentStatus, transactionId } = req.body;

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (transactionId) order.transactionId = transactionId;

    await order.save();
    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status' });
  }
});

// Get order statistics for user
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({ user: req.user._id });
    const completedOrders = await Order.countDocuments({ 
      user: req.user._id, 
      status: 'completed' 
    });
    const totalSpent = await Order.aggregate([
      { $match: { user: req.user._id, status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    res.json({
      totalOrders,
      completedOrders,
      totalSpent: totalSpent[0]?.total || 0
    });
  } catch (error) {
    console.error('Error fetching order statistics:', error);
    res.status(500).json({ message: 'Error fetching order statistics' });
  }
});

module.exports = router; 