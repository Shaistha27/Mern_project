import React from "react";
import Hero from "./Hero";
import Programs from "./Programs";
import About from "./About";
import Services from "./Services";
import Testimonials from "./Testimonials";
import Contact from "./Contact";
import Footer from "./Footer";
const Home = () => {
  return (
    <div>
      <Hero />
      <Programs />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Home;
