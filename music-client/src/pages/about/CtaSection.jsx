import React from "react";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AboutCTASection = () => {
  const navigate = useNavigate();

  const handleSubscribe = () => {
    navigate("/#newsletter");
  };

  return (
    <section className="py-16 px-6 text-center">
      {/* Call to Action */}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Join the Movement of Meaningful Worship
        </h2>
        <p className="mt-4 text-gray-600">
          Be part of our growing community of believers and artists creating
          music with purpose.
        </p>
        <div className="mt-6 flex justify-center flex-wrap gap-4">
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Browse Music
          </button>
          <button
            className="border border-black text-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Contact Info */}
      <div className="max-w-2xl mx-auto border-t border-gray-300 pt-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Get in Touch
        </h3>
        <p className="text-gray-600 mb-4">
          Have questions or want to collaborate? Reach out to us.
        </p>

        <div className="flex justify-center gap-6 text-2xl text-black mb-4">
          <a
            href="mailto:support@evara.com"
            aria-label="Email"
            className="hover:text-gray-600 transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://t.me/yourtelegram"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="hover:text-gray-600 transition"
          >
            <FaTelegram />
          </a>
          <a
            href="https://wa.me/251900000000"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-gray-600 transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://instagram.com/evara_music"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-gray-600 transition"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="text-sm text-gray-500">Addis Ababa, Ethiopia</p>
      </div>
    </section>
  );
};

export default AboutCTASection;
