import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaMusic,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black mt-12">
      <div className="container mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Socials */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FaMusic className="text-white text-2xl" />
              <h1 className="text-white text-2xl font-bold">TuneDownloader</h1>
            </div>
            <p className="text-gray-300 mb-4">
              Your premier destination for high-quality music downloads and
              streaming.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition text-xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <NavLink
                to="/contact"
                className="text-gray-300 hover:text-white transition text-xl"
                aria-label="Email"
              >
                <FaEnvelope />
              </NavLink>
            </div>
          </div>

          {/* Explore Links */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 hover:text-gray-300 transition">
              Explore
            </h2>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/catalog/artists"
                  className="text-gray-300 hover:text-white transition"
                >
                  Artists
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/catalog/singles"
                  className="text-gray-300 hover:text-white transition"
                >
                  Songs
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/catalog/albums"
                  className="text-gray-300 hover:text-white transition"
                >
                  Albums
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 hover:text-gray-300 transition">
              Info
            </h2>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact
                </NavLink>
              </li>
              
              <li>
                <NavLink
                  to="/privacy"
                  className="text-gray-300 hover:text-white transition"
                >
                  Privacy Policy
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} TuneDownloader. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <NavLink
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Terms of Service
              </NavLink>
              <NavLink
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition"
              >
                Privacy Policy
              </NavLink>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
