import React from "react";
import HeroSection from "../components/home/HeroSection";
import ContactBanner from "../components/home/ContactBanner";
import ReservationForm from "../components/home/ReservationForm";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div>
        <ContactBanner />
        <div>
          <ReservationForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
