import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FiChevronDown,
  FiChevronUp,
  FiMusic,
  FiGlobe,
  FiHeart,
  FiBook,
  FiUsers,
} from "react-icons/fi";

const MissionVision = () => {
  const [expanded, setExpanded] = useState({
    mission: false,
    vision: false,
    values: false,
  });

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <section className="md:py-24">
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
            Why We Exist
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The foundation upon which we build God's kingdom through music
          </p>
        </motion.div>

        {/* Core Pillars */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="text-black mb-4">
                <FiMusic className="h-10 w-10" />
              </div>
              <button
                onClick={() => toggleExpand("mission")}
                className="text-gray-400 hover:text-black transition-colors"
              >
                {expanded.mission ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-4">
              To create worship music that glorifies God and transforms lives.
            </p>
            {expanded.mission && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 mt-4">
                  We are committed to producing Christ-centered music that
                  exalts Jesus, edifies the Church, and evangelizes the lost.
                  Through excellence in artistry and uncompromising biblical
                  truth, we aim to create resources that facilitate authentic
                  encounters with God.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="text-black mb-4">
                <FiGlobe className="h-10 w-10" />
              </div>
              <button
                onClick={() => toggleExpand("vision")}
                className="text-gray-400 hover:text-black transition-colors"
              >
                {expanded.vision ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 mb-4">
              To see every nation worshipping in spirit and truth.
            </p>
            {expanded.vision && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-gray-600 mt-4">
                  We envision a global worship movement where believers from
                  every culture have access to doctrinally sound, culturally
                  relevant worship music. By equipping local churches and
                  artists, we aim to see a new wave of worship that transcends
                  denominations and unites the Body of Christ worldwide.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Values Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div className="text-black mb-4">
                <FiHeart className="h-10 w-10" />
              </div>
              <button
                onClick={() => toggleExpand("values")}
                className="text-gray-400 hover:text-black transition-colors"
              >
                {expanded.values ? (
                  <FiChevronUp size={24} />
                ) : (
                  <FiChevronDown size={24} />
                )}
              </button>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span>Biblical fidelity</span>
              </li>
              <li className="flex items-start">
                <span className="text-black mr-2">•</span>
                <span>Spiritual authenticity</span>
              </li>
            </ul>
            {expanded.values && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <ul className="space-y-2 text-gray-600 mt-4">
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Kingdom collaboration over competition</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Excellence as worship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Cultural relevance without compromise</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-black mr-2">•</span>
                    <span>Generational discipleship</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Additional Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-black mb-4">
              <FiMusic className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Worship Resources</h3>
            <p className="text-gray-600 text-sm">
              Sheet music, chord charts, and tutorials to equip your worship
              team
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-black mb-4">
              <FiBook className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Devotionals</h3>
            <p className="text-gray-600 text-sm">
              Biblical studies tied to our music for deeper spiritual growth
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-black mb-4">
              <FiUsers className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Connect with other worship leaders and musicians
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="text-black mb-4">
              <FiGlobe className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-lg mb-2">Global Reach</h3>
            <p className="text-gray-600 text-sm">
              Music translated and contextualized for diverse cultures
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
