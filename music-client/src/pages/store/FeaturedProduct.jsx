const FeaturedProduct = ({ addToCart }) => {
  const featuredProducts = [
    {
      id: 1,
      title: "Premium Worship Album",
      description: "Complete worship experience with 50+ tracks",
      price: 29.99,
      image: "https://via.placeholder.com/300x300?text=Premium+Album",
    },
    {
      id: 2,
      title: "Artist Bundle Pack",
      description: "All albums from your favorite artist",
      price: 59.99,
      image: "https://via.placeholder.com/300x300?text=Artist+Bundle",
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
        Featured
      </h2>
      <div className="grid grid-cols-1 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden"
          >
            <div className="md:w-1/3 bg-gray-100 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 md:h-auto object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <span className="text-xs uppercase tracking-widest text-gray-500">
                Featured
              </span>
              <h3 className="text-2xl font-bold mt-1 mb-3">{product.title}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <span className="font-bold text-xl">${product.price}</span>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition w-full sm:w-auto text-center"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
