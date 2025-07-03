import React from "react";
import HeroSection from "./HeroSection";
import MissionVision from "./MissionVision";
import WhatWeOffer from "./WhatWeOffer";
import SocialProof from "./SocialProof";
import OurStory from "./OurStory";
import AboutCTASection from "./CtaSection";

const About = () => {
  return (
    <div className="min-h-screen">
     
      {/**hero section */}
      <div className="hero">
        <HeroSection />
      </div>
      {/**intro */}
      <div className="intro container mx-auto sm:px-8 py-12">
        <h2 className="text-2xl text-black text-justify mb-2 font-semibold">
          About Us
        </h2>
        <p className="text-gray-600 text-justify ">
          Welcome to TuneDownloader, your ultimate destination for all your
          music needs. Our platform is designed to provide music lovers with an
          extensive library of songs and albums across various genres and
          artists ensuring that you can find your favorite music here. With
          user-friendly interface and personalized music recommendations, we aim
          to make your music journey seamless and enjoyable.
        </p>
      </div>

      {/** mission, vision and values */}
      <div className="mission">
        <MissionVision />
      </div>

      {/** what u offer */}
      <div className="offer">
      <WhatWeOffer/>
      </div>

      {/**our story */}
      <div className="story">
        <OurStory/>
      </div>


      {/** social proof with our status */}
      <div className="social-proof">
        <SocialProof/>
      </div>
      {/**  call to action*/}
      <div className="cta">
        <AboutCTASection/>
      </div>
      

    </div>
  );
};

export default About;
