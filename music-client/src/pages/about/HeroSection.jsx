import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import heroImage from "../../assets/images/bogomil-mihaylov-ekHSHvgr27k-unsplash.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen max-h-[500px] w-full overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Worship background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Content Overlay - Constrained to max-w-[600px] */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[600px]"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Elevate Your Worship Experience
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-white mb-10 mx-auto leading-relaxed"
          >
            Discover divine music that speaks to your soul and strengthens your
            faith journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => navigate("/catalog/artists")}
              className="px-6 py-3 bg-white text-black rounded-full font-semibold uppercase tracking-wider hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              Explore Artists
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
