# Cart Functionality Implementation

## Overview
This document describes the cart functionality implemented for the music platform, which allows users to add songs to their cart, manage quantities, and view their cart items.

## Features

### 1. Cart Management
- **Add to Cart**: Users can add songs from various sections (Trending Now, Singles, etc.)
- **Remove from Cart**: Users can remove items from their cart
- **Update Quantities**: Users can increase/decrease item quantities
- **Cart Persistence**: Cart data is saved to MongoDB for authenticated users and localStorage for guests

### 2. User Experience
- **Cart Badge**: Navigation bar shows cart count with total quantity
- **Cart Page**: Dedicated cart page with order summary
- **Guest Support**: Non-authenticated users can use cart with localStorage
- **Data Sync**: Guest cart data syncs to user account upon login

## Technical Implementation

### Backend (MongoDB)

#### Cart Model (`server/models/Cart.js`)
```javascript
const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    song: { type: mongoose.Schema.Types.ObjectId, ref: 'Song', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true },
    addedAt: { type: Date, default: Date.now }
  }],
  total: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});
```

#### Cart Routes (`server/routes/cart.js`)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Frontend (React)

#### Cart Context (`music-client/src/contexts/cartContext.jsx`)
- Manages cart state globally
- Handles both authenticated and guest users
- Provides cart operations (add, remove, update quantity)
- Syncs guest data after login

#### Cart Page (`music-client/src/pages/cart/Cart.jsx`)
- Displays cart items with details
- Quantity controls
- Order summary with tax calculation
- Remove item functionality

#### Integration Points
- **TrendingNow Component**: Add to cart from trending songs
- **TrendingSongs Component**: Add to cart from singles catalog
- **Navbar**: Cart badge with total quantity
- **Other Components**: Cart functionality available throughout the app

## Usage Examples

### Adding to Cart
```javascript
import { useCart } from '../../contexts/cartContext';

const { addToCart } = useCart();

const handleAddToCart = (song) => {
  const songData = {
    id: song._id,
    title: song.title,
    artist: song.artist,
    image: song.coverImage,
    price: song.price || 1.29,
    duration: song.duration,
    genre: song.genre
  };
  addToCart(songData);
};
```

### Cart Badge
The navbar automatically shows the cart count:
```javascript
{cart.length > 0 && (
  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
    {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
  </span>
)}
```

## Database Schema Updates

### Song Model
Added `price` field to Song model:
```javascript
price: {
  type: Number,
  default: 1.29,
  min: 0
}
```

## API Endpoints

### Cart Operations
- **Get Cart**: `GET /api/cart` (requires auth)
- **Add Item**: `POST /api/cart` with `{ trackId, quantity }`
- **Update Quantity**: `PUT /api/cart/:itemId` with `{ quantity }`
- **Remove Item**: `DELETE /api/cart/:itemId`
- **Clear Cart**: `DELETE /api/cart`

## Security
- All cart operations require authentication
- User can only access their own cart
- Input validation on all endpoints
- Error handling for failed operations

## Future Enhancements
- Wishlist functionality
- Save for later feature
- Cart sharing
- Bulk operations
- Discount codes
- Multiple currency support 