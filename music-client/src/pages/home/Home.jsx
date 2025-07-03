import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import HeroSection from "./HeroSection";
import TrendingNow from "./TrendingNow";
import NewRelease from "./NewRelease";
import NewsletterSignup from "./NewsletterSignup";


const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#newsletter") {
      const el = document.getElementById("newsletter");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen ">
      {/**Hero */}
      <div className="hero">
        <HeroSection />
      </div>


      {/**trending now */}
      <div className="trending now ">
        <TrendingNow />
      </div>

      {/**latest singles and albums */}
      <div className="new release">
        <NewRelease />
      </div>

      {/**newsletter signup + social links */}
      <div className="newsletter">
        <NewsletterSignup />
      </div>
    </div>
  );
};

export default Home;
