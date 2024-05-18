import React, { useState, useEffect } from "react";
import { useAuth } from "./utils/AuthProvider.js";
import "./Hero.css";

const Hero = () => {
  const [username, setUsername] = useState("");
  const { isLoggedIn } = useAuth();

  // const callHomePage = async () => {
  //   try {
  //     const res = await fetch("/profile", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data);
  //       setUsername(data.name);
  //     } else {
  //       console.error(`Error: ${res.status} ${res.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Error caught:", error);
  //   }
  // };

  // useEffect(() => {
  //   callHomePage();
  // }, []);

  return (
    <div className="hero container" id="hero">
      <div className="hero-text">
        <div className="home-page container">
          <div className="home-div">
            <p className="welcome">Welcome</p>
            {/* {isLoggedIn ? (
              <h1 className="name">
                {username &&
                  username.charAt(0).toUpperCase() + username.slice(1)}
              </h1>
            ) : (
              <h5> Please log in to access the Home page. </h5>
            )} */}
          </div>
        </div>
        <p>
          Through innovative technology and a commitment to excellence, we
          strive to make learning accessible, engaging, and impactful. Join us
          in our journey to ensure that every individual has the opportunity to
          reach their full potential and contribute positively to society.
        </p>
        <button className="btn">
          Explore more{" "}
          <i class="fa-solid fa-arrow-right" style={{ margin: "10px" }}></i>
        </button>
      </div>
    </div>
  );
};

export default Hero;
