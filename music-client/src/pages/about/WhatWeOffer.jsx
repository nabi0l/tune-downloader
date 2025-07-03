import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiMusic,
  FiHeadphones,
  FiDownload,
  FiMic,
  FiUser,
  FiAward,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const WhatWeOffer = () => {
  const navigate = useNavigate();

  const offerings = [
    {
      icon: <FiMusic className="h-8 w-8" />,
      title: "Christian Music Store",
      description:
        "Thousands of worship songs, hymns, and contemporary Christian music",
      color: "text-black",
    },
    {
      icon: <FiHeadphones className="h-8 w-8" />,
      title: "Exclusive Releases",
      description: "First access to new albums from top Christian artists",
      color: "text-black",
    },
    {
      icon: <FiDownload className="h-8 w-8" />,
      title: "Digital Downloads",
      description: "Instant access to purchased music in multiple formats",
      color: "text-black",
    },
    {
      icon: <FiMic className="h-8 w-8" />,
      title: "Artist Features",
      description: "Discover emerging and established Christian musicians",
      color: "text-black",
    },
    {
      icon: <FiUser className="h-8 w-8" />,
      title: "Personalized Recommendations",
      description: "Music suggestions based on your preferences",
      color: "text-black",
    },
    {
      icon: <FiAward className="h-8 w-8" />,
      title: "Premium Membership",
      description: "Unlimited streaming and exclusive discounts",
      color: "text-black",
    },
  ];

  return (
    <section className="md:py-24 bg-white" id="what-we-offer">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Music Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover, purchase, and enjoy Christian music from around the world
          </p>
        </motion.div>

        {/* Offerings Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offerings.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className={`${item.color} mb-4`}>{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button
            onClick={() => navigate("/catalog/albums")}
            className="inline-block px-8 py-4 bg-black text-white rounded-full font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Browse Music Catalog
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeOffer;
