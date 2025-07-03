import React from "react";
import { useCart } from "../../contexts/cartContext";
import { FaTrash, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateCartQuantity } = useCart();

  const handleRemove = (trackId) => {
    removeFromCart(trackId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(id, newQuantity);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-20 min-h-screen">
      <div className="flex items-center mb-8">
        <Link 
          to="/" 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <FaArrowLeft className="text-gray-600" />
        </Link>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <FaShoppingCart className="mx-auto text-6xl text-gray-300" />
          </div>
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <p className="text-gray-500 mb-8">Add some amazing music to get started!</p>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-6 border-b border-gray-100 last:border-b-0"
                >
                  <img
                    src={item.image || "/src/assets/images/home/newRelease/default-album.jpg"}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/src/assets/images/home/newRelease/default-album.jpg";
                    }}
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-gray-600">{item.artist}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <span>{formatDuration(item.duration)}</span>
                      {item.genre && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{item.genre}</span>
                        </>
                      )}
                    </div>
                    <div className="flex items-center mt-3">
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
                        className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300 transition-colors"
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 border-t border-b border-gray-200">
                        {item.quantity || 1}
                      </span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 flex items-center justify-end mt-2 transition-colors"
                    >
                      <FaTrash className="mr-1" size={12} />
                      <span className="text-sm">Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({cart.reduce((total, item) => total + (item.quantity || 1), 0)} items)</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-colors mb-4">
                Proceed to Checkout
              </button>
            </Link>
            <Link 
              to="/" 
              className="block w-full text-center text-black border border-black py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;