import { FaMusic } from "react-icons/fa";

// Define some actual data for the products
const digitalProducts = [
  {
    id: 1,
    title: "Album Name",
    artist: "Artist Name",
    price: 9.99,
    formats: ["MP3", "FLAC"],
  },
  // Add more products as needed
];

const ShoppingCart = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
        Shopping Cart
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {digitalProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 p-4 hover:shadow-md transition"
          >
            <div className="bg-gray-100 aspect-square flex items-center justify-center mb-3">
              <FaMusic className="text-3xl text-gray-400" />
            </div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.artist}</p>
            <div className="flex justify-between items-center">
              <span className="font-bold">${product.price}</span>
              <button className="bg-black text-white px-3 py-1 text-sm">
                Add to Cart
              </button>
            </div>
            <div className="mt-2 flex space-x-1 text-xs">
              {product.formats.map((format) => (
                <span key={format} className="bg-gray-100 px-2 py-1">
                  {format}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
