import React, { useEffect, useState } from "react";
// import girl1 from "../images/girl1.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthProvider.js";

const About = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // cookies will reach backend
        credentials: "include",
      });

      if (!res.ok) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();

      setUserData(data);
    } catch (error) {
      console.log("Error caught:", error);
      navigate("/login");
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h4>My About Page</h4>
      {isLoggedIn ? (
        userData && (
          <div>
            <div>Name: {userData.name}</div>
            <div>Email: {userData.email}</div>
            <div>Phone: {userData.phone}</div>
          </div>
        )
      ) : (
        <h5>Please Log in to access the About page</h5>
      )}
    </>
  );
};

export default About;
