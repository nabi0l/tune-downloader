import React, { useState, useEffect } from "react";
import { FaChurch, FaUsers, FaDonate } from "react-icons/fa";

const SocialProof = () => {
  // Testimonial data
  const testimonials = [
    {
      id: 1,
      quote:
        "This platform helped me reach 10K new listeners—finally sustaining my ministry full-time!",
      author: "Sarah K., Worship Leader",
      type: "artist",
    },
    {
      id: 2,
      quote:
        "I found my battle with anxiety eased through your 'Peaceful Praise' playlists. God bless your work!",
      author: "Michael T., 2-Year Subscriber",
      type: "listener",
    },
    {
      id: 3,
      quote:
        "Our youth group uses your curated playlists every week. Theologically sound and culturally relevant!",
      author: "Pastor James L., New Life Church",
      type: "ministry",
    },
  ];

  // State for testimonial carousel
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [stats, setStats] = useState({
    listeners: 0,
    churches: 0,
    donations: 0,
  });

  // Animate stats counting up
  useEffect(() => {
    const targetStats = {
      listeners: 50000,
      churches: 200,
      donations: 10,
    };

    const duration = 2000; // Animation duration in ms
    const steps = 50;
    const increment = targetStats.listeners / steps;

    let current = { listeners: 0, churches: 0, donations: 0 };
    const timer = setInterval(() => {
      current.listeners = Math.min(
        current.listeners + increment,
        targetStats.listeners
      );
      current.churches = Math.min(
        current.churches + targetStats.churches / steps,
        targetStats.churches
      );
      current.donations = Math.min(
        current.donations + targetStats.donations / steps,
        targetStats.donations
      );

      setStats({
        listeners: Math.floor(current.listeners),
        churches: Math.floor(current.churches),
        donations: current.donations.toFixed(1),
      });

      if (current.listeners >= targetStats.listeners) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          <span className="border-b-4 border-black pb-2">
            Join Thousands Uplifted
          </span>
        </h2>

        {/* Testimonials Carousel */}
        <div className="mb-16 relative">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-opacity duration-500 ${
                index === activeTestimonial
                  ? "opacity-100"
                  : "opacity-0 absolute top-0 left-0"
              }`}
            >
              <blockquote className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-center">
                <p className="text-lg italic text-gray-600 mb-4">
                  "{testimonial.quote}"
                </p>
                <cite className="font-semibold text-gray-900">
                  {testimonial.author}
                </cite>
              </blockquote>
            </div>
          ))}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  index === activeTestimonial ? "bg-black" : "bg-gray-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

       

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FaUsers className="text-black text-4xl mx-auto mb-4" />
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {stats.listeners.toLocaleString()}+
            </div>
            <p className="text-gray-600">Monthly Listeners</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FaChurch className="text-black text-4xl mx-auto mb-4" />
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {stats.churches}+
            </div>
            <p className="text-gray-600">Churches Served</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow text-center">
            <FaDonate className="text-black text-4xl mx-auto mb-4" />
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {stats.donations}%
            </div>
            <p className="text-gray-600">Profits Donated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
