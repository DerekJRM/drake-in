import React from "react";
import ContactBanner from "../components/home/ContactBanner";
import ReservationForm from "../components/home/ReservationForm";

const Home = () => {
  return (
    <div>
      <ContactBanner />
      <div>
        <ReservationForm />
      </div>
    </div>
  );
};

export default Home;
