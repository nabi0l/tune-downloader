import React from "react";
import { useState } from "react";
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I submit my worship music?",
      answer:
        "Email submissions to submissions@christianmusic.com with details about your ministry.",
    },
    {
      question: "Do you offer prayer support?",
      answer: "Yes, email prayer requests to prayer@christianmusic.com.",
    },
    {
      question: "Can I license music for my church?",
      answer: "Contact our licensing team at licensing@christianmusic.com.",
    },
  ];

  return (
    <div className="mt-24">
      <h2 className="text-2xl font-bold mb-8 border-b border-black pb-2">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              className="flex justify-between items-center w-full text-left"
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            >
              <h3 className="font-bold text-lg">{faq.question}</h3>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
