import React from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

const ContactInfo = () => (
  <div>
    <h2 className="text-2xl font-bold mb-8 border-b border-black pb-2">
      Our Information
    </h2>

    <div className="space-y-8">
      <ContactItem
        icon={<FaMapMarkerAlt />}
        title="Our Location"
        content="Addis Ababa, Ethiopia"
      />

      <ContactItem
        icon={<FaPhone />}
        title="Phone"
        content="(+251) 93 035 7207<br />Mon-Fri, 9am-5pm CST"
      />

      <ContactItem
        icon={<FaEnvelope />}
        title="Email"
        content="labi44347@gmail.com<br />ebbabi98@gmail.com"
      />

      <div className="pt-4">
        <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
        <div className="flex space-x-4">
          <SocialIcon icon={<FaFacebook />} />
          <SocialIcon icon={<FaTwitter />} />
          <SocialIcon icon={<FaInstagram />} />
          <SocialIcon icon={<FaYoutube />} />
        </div>
      </div>
    </div>
  </div>
);

const ContactItem = ({ icon, title, content }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-black text-white p-3 rounded-full">{icon}</div>
    <div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </div>
);

const SocialIcon = ({ icon, url }) => (
  <a
    href={url}
    className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);
  

export default ContactInfo;
