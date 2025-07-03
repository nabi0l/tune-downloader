const SpecialEdition = ({ addToCart }) => {
  const specialEditions = [
    {
      id: 1,
      title: "Collector's Vinyl Box",
      description: "Limited edition vinyl with exclusive artwork",
      price: 89.99,
      image: "https://via.placeholder.com/300x300?text=Vinyl+Box",
    },
    {
      id: 2,
      title: "Deluxe Worship Pack",
      description: "Includes sheet music and bonus tracks",
      price: 49.99,
      image: "https://via.placeholder.com/300x300?text=Deluxe+Pack",
    },
  ];

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
        <h2 className="text-2xl font-bold">Special Editions</h2>
        <a href="#" className="text-sm underline hover:text-gray-600">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialEditions.map((edition) => (
          <div key={edition.id} className="group relative">
            <div className="overflow-hidden rounded-lg">
              <img
                src={edition.image}
                alt={edition.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{edition.title}</h3>
                <span className="bg-black text-white px-2 py-1 text-xs rounded-full">
                  LIMITED
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {edition.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">${edition.price}</span>
                <button
                  onClick={() => addToCart(edition)}
                  className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition-colors"
                >
                  Pre-Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialEdition;
