import React from 'react';
import { FaGlobe, FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaSpotify, FaSoundcloud } from 'react-icons/fa';

const SocialLinks = ({ artist }) => {
    if (!artist) return null;

    const socialLinks = [
        { name: 'Website', icon: <FaGlobe className="w-5 h-5" />, url: artist.website },
        { name: 'Facebook', icon: <FaFacebook className="w-5 h-5" />, url: artist.socials?.facebook },
        { name: 'Twitter', icon: <FaTwitter className="w-5 h-5" />, url: artist.socials?.twitter },
        { name: 'Instagram', icon: <FaInstagram className="w-5 h-5" />, url: artist.socials?.instagram },
        { name: 'YouTube', icon: <FaYoutube className="w-5 h-5" />, url: artist.socials?.youtube },
        { name: 'Spotify', icon: <FaSpotify className="w-5 h-5" />, url: artist.socials?.spotify },
        { name: 'SoundCloud', icon: <FaSoundcloud className="w-5 h-5" />, url: artist.socials?.soundcloud },
    ].filter(link => link.url);

    if (socialLinks.length === 0) {
        return null;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                    >
                        <span className="text-indigo-600">{link.icon}</span>
                        <span>{link.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default SocialLinks;
