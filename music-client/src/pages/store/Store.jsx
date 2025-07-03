import { useState } from "react";
import DigitalDownload from "./DigitalDownload";
import ShoppingCart from "./ShoppingCart";
import FeaturedProduct from "./FeaturedProduct";
import SpecialEdition from "./SpecialEdition";
import { FaShoppingCart } from "react-icons/fa";

const Store = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Sample data moved to respective components

  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 mb-12 rounded-lg py-6">
        <h1 className="text-4xl font-bold mb-2">Music Store</h1>
        <p className="text-gray-300">Worship resources for your journey</p>
      </div>

      {/* Sections */}
      <DigitalDownload addToCart={addToCart} />
      <SpecialEdition addToCart={addToCart} />
      <FeaturedProduct addToCart={addToCart} />

      {/* Shopping Cart Toggle */}
      <button
        onClick={() => setIsCartOpen(!isCartOpen)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-xl hover:bg-gray-800 transition-all z-50"
      >
        <FaShoppingCart className="text-xl" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </button>

      {/* Shopping Cart Panel */}
      {isCartOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white shadow-2xl rounded-lg border border-gray-200 z-50 p-4">
          <h3 className="font-bold text-lg mb-4">
            Your Cart ({cartItems.length})
          </h3>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="max-h-60 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-gray-100"
                  >
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        {item.artist || item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p>${item.price}</p>
                      <button
                        onClick={() =>
                          setCartItems(cartItems.filter((_, i) => i !== index))
                        }
                        className="text-xs text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200">
                <div className="flex justify-between font-bold mb-4">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Store;
