import React from "react";
import ContactHero from "./ContactHero";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import FAQSection from "./FAQSection";

const Contact = () => (
  <div className="min-h-screen bg-white text-black">
    <ContactHero />
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <ContactForm/>
        <ContactInfo/>
    </div>
    <FAQSection/>
    </div>
    
  </div>
);

export default Contact;
