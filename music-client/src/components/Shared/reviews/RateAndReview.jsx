import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const RateAndReview = ({ 
  averageRating, 
  reviews = [], 
  context = 'general', // 'general', 'album', 'artist', 'playlist'
  contextId = null,
  contextName = ''
}) => {
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  // Configuration for different contexts
  const contextConfig = {
    general: {
      title: "Rate and Review Us",
      emptyMessage: "Be the first to review our platform",
      placeholder: "Share your overall experience...",
    },
    album: {
      title: `Rate and Review: ${contextName}`,
      emptyMessage: `No reviews yet for this album - be the first!`,
      placeholder: "What did you think of this album?",
    },
    artist: {
      title: `Rate and Review: ${contextName}`,
      emptyMessage: `No reviews yet for this artist - be the first!`,
      placeholder: "Share your thoughts about this artist...",
    },
    playlist: {
      title: `Rate This Playlist: ${contextName}`,
      emptyMessage: `This playlist hasn't been rated yet`,
      placeholder: "How does this playlist make you feel?",
    }
  };

  const currentConfig = contextConfig[context] || contextConfig.general;

  // Sort reviews based on selection
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.date) - new Date(a.date);
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'lowest') return a.rating - b.rating;
    return 0;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    console.log(`Submitting review for ${context}:`, { 
      rating: userRating, 
      text: reviewText,
      contextId
    });
    setShowForm(false);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {currentConfig.title}
            </h2>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i} 
                  className={`h-6 w-6 ${i < Math.floor(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-gray-700">
                {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="mt-4 md:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>

        {/* Sorting Controls */}
        {reviews.length > 0 && (
          <div className="flex items-center mb-6 space-x-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <button 
              onClick={() => setSortBy('recent')}
              className={`text-sm px-3 py-1 rounded-full ${sortBy === 'recent' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}
            >
              Most Recent
            </button>
            <button 
              onClick={() => setSortBy('highest')}
              className={`text-sm px-3 py-1 rounded-full ${sortBy === 'highest' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}
            >
              Highest Rated
            </button>
            <button 
              onClick={() => setSortBy('lowest')}
              className={`text-sm px-3 py-1 rounded-full ${sortBy === 'lowest' ? 'bg-purple-100 text-purple-700' : 'text-gray-600'}`}
            >
              Lowest Rated
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.length > 0 ? (
            sortedReviews.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                    <p className="text-sm text-gray-500 mt-2">- {review.author}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                {review.response && (
                  <div className="mt-3 pl-4 border-l-2 border-purple-200 bg-purple-50 p-3 rounded-r-lg">
                    <p className="text-sm font-medium text-purple-700">Response from store:</p>
                    <p className="text-sm text-gray-700">{review.response}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">{currentConfig.emptyMessage}</p>
            </div>
          )}
        </div>

        {/* Review Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-8 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Write Your Review</h3>
            <div className="flex items-center mb-4">
              <span className="mr-2 text-gray-700">Your Rating:</span>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-8 w-8 cursor-pointer ${i < userRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setUserRating(i + 1)}
                />
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-500"
              rows="4"
              placeholder={currentConfig.placeholder}
              required
            />
            <div className="mt-4 flex justify-end">
              <button
                type="submit"
                disabled={userRating === 0}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors disabled:opacity-50"
              >
                Submit Review
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default RateAndReview;