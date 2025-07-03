import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const OurStory = () => {
  return (
    <section className="md:py-24" id="our-story">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Music Journey
          </h2>
          <p className="text-lg text-gray-600">
            How worship became my creative expression
          </p>
        </motion.div>

        <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full md:w-1/3"
            >
              <div className="aspect-square bg-gray-200 rounded-full overflow-hidden mx-auto max-w-xs">
                {/* Replace with your photo */}
                <img
                  src="https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2lybHxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Making music"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-full md:w-2/3 text-gray-600 space-y-4"
            >
              <p>
                It all began in my bedroom studio, where I started recording
                worship covers just for personal devotion. What began as simple
                iPhone recordings gradually turned into something more when
                friends kept asking, "Where can I download this?"
              </p>
              <p>
                In 2020, I took the leap and started properly producing my
                arrangements of hymns and original worship songs. The positive
                response from my church community encouraged me to share more
                widely.
              </p>
              <p>
                This platform is my way of giving back - making the music God
                put on my heart available to anyone who finds comfort or
                inspiration in it.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <h3 className="font-bold text-lg text-gray-900 mb-3">
              Why I Create
            </h3>
            <p className="text-gray-700">
              "My prayer is that these melodies would be more than background
              noise - that they might become moments of connection with God,
              just as they've been for me in creating them."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
