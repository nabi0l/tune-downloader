import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // Added Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import hero1 from "../../assets/images/home/hero/heroHome.jpg";
import hero2 from "../../assets/images/home/hero/heroHome2.jpg";
import hero3 from "../../assets/images/home/hero/heroHome4.jpg";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: hero1,
      alt: "home hero banner one",
      headline: "Lift Your Spirit Through Sound",
      subheadline:
        "Discover worship songs that inspire, restore, and connect you to God.",
      
    },
    {
      id: 2,
      image: hero2,
      alt: "home hero banner two",
      headline: "Fuel the Mission, Support the Music",
      subheadline:
        "Shop directly from the artists who make Christian music with purpose.",
     
    },
    {
      id: 3,
      image: hero3,
      alt: "home hero banner three",
      headline: "What's New in Christian Music",
      subheadline:
        "Stream the latest releases, curated just for your faith journey.",
    
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]} // Added Autoplay to modules
        spaceBetween={0} // Changed from 30 to 0 for full-width slides
        slidesPerView={1}
        navigation={false}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false, // Continues autoplay after user interaction
          pauseOnMouseEnter: true, // Optional: pauses on hover
        }}
        speed={800}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[600px] mx-auto">
              {" "}
              {/* Added responsive height */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                loading="eager" // Optional: for above-the-fold images
              />
              <div className="absolute inset-0 bg-black/50 rounded-lg"></div>
              <div className="container mx-auto relative h-full flex items-center px-6">
                <div className="max-w-4xl">
                  <p className="text-xl md:text-2xl font-medium mb-4 text-gray-200 animate-fadeInUp">
                    {slide.subheadline}
                  </p>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 text-white animate-fadeInUp delay-100">
                    {slide.headline}
                  </h1>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;
