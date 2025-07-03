import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    // Simple validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/newsletter/subscribe',
        { email }
      );
      
      if (response.data.success) {
        setSuccess('Thank you for subscribing to our newsletter!');
        setEmail('');
        toast.success('Successfully subscribed to newsletter!');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0]?.msg || 
                         error.response?.data?.message || 
                         'Failed to subscribe. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      {/* Container with soft shadow */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg shadow-gray-200 overflow-hidden">
        {/* Decorative accent at top */}
        <div className="h-2 bg-gradient-to-r from-gray-700 to-black"></div>
        <div className="p-8 md:p-12">
          {/* Header with black text */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-black mb-3">
              Stay Inspired
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Join our community and receive monthly stories behind meaningful
              music
            </p>
          </div>
          {/* Signup Form */}
          <div className="mb-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className={`w-full px-6 py-4 rounded-full border ${
                    error ? 'border-red-500' : 'border-gray-200'
                  } focus:border-gray-400 focus:ring-2 focus:ring-gray-100 outline-none transition-all placeholder-gray-300`}
                  disabled={isLoading}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1 ml-2">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-sm mt-1 ml-2">{success}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-4 ${
                  isLoading
                    ? 'bg-gray-500 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800'
                } text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all`}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {/* Error or Success Message */}
            {error && (
              <p className="text-xs text-red-500 mt-3 text-center md:text-left">
                {error}
              </p>
            )}
            {success && (
              <p className="text-xs text-green-500 mt-3 text-center md:text-left">
                {success}
              </p>
            )}
            {/* Privacy Note */}
            <p className="text-xs text-gray-500 mt-3 text-center md:text-left">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
          {/* Social Links with optional label */}
          <div className="text-center border-t border-gray-100 pt-8">
            <p className="text-sm text-gray-600 mb-4 font-medium">
              FOLLOW OUR JOURNEY
            </p>
            <div className="flex justify-center gap-5">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-[#1877F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-[#E4405F]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.7-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12.001 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-[#1DA1F2]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors group"
              >
                <svg
                  className="w-5 h-5 text-[#FF0000]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
