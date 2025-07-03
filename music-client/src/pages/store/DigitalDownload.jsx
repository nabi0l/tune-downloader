import { FaPlus } from "react-icons/fa";

import amazing from "../../assets/images/home/mood/amazing grace.jpeg";
import beautifulName from "../../assets/images/home/mood/beautiful name.jpg";

const DigitalDownload = ({ addToCart }) => {
  const digitalProducts = [
    {
      id: 1,
      title: "Amazing Grace",
      artist: "Hillsong Worship",
      price: 1.29,
      formats: ["MP3", "FLAC", "WAV"],
      cover: amazing,
    },
    {
      id: 2,
      title: "What A Beautiful Name",
      artist: "Brooke Ligertwood",
      price: 1.49,
      formats: ["MP3", "FLAC"],
      cover: beautifulName,
    },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-200 pb-2">
        Digital Downloads
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {digitalProducts.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-gray-300"
          >
            <div className="aspect-square mb-3 rounded-lg overflow-hidden">
              <img
                src={product.cover}
                alt={`${product.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium text-gray-900">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.artist}</p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-gray-900">${product.price}</span>
              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
              >
                <FaPlus />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-1 text-xs">
              {product.formats.map((format) => (
                <span
                  key={format}
                  className="bg-gray-100 px-2 py-1 rounded text-gray-700"
                >
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

export default DigitalDownload;
