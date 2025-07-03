const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
    sparse: true
  },
  guestId: {
    type: String,
    required: false,
    sparse: true
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure either user or guestId is present
cartSchema.pre('save', function(next) {
  if (!this.user && !this.guestId) {
    return next(new Error('Cart must have either user or guestId'));
  }
  this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.updatedAt = new Date();
  next();
});

// Method to add item to cart
cartSchema.methods.addItem = async function(songId, price, quantity = 1) {
  const existingItem = this.items.find(item => item.song.toString() === songId.toString());
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    this.items.push({
      song: songId,
      price: price,
      quantity: quantity
    });
  }
  
  return this.save();
};

// Method to remove item from cart
cartSchema.methods.removeItem = async function(songId) {
  this.items = this.items.filter(item => item.song.toString() !== songId.toString());
  return this.save();
};

// Method to update item quantity
cartSchema.methods.updateQuantity = async function(songId, quantity) {
  const item = this.items.find(item => item.song.toString() === songId.toString());
  if (item) {
    item.quantity = quantity;
    return this.save();
  }
  throw new Error('Item not found in cart');
};

// Method to clear cart
cartSchema.methods.clearCart = async function() {
  this.items = [];
  return this.save();
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart; 