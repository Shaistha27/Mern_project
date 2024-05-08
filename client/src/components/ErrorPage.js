import React from "react";
import { useNavigate } from "react-router-dom";
import "./Error.css";
const ErrorPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/"); // Redirects to the home page
  };
  return (
    <>
      <div className="notfound container">
        <h1>404</h1>
        <h2>Something went wrong!</h2>
        <p>
          The requested URL cannot be found or might be temporary unavailable.
        </p>
      </div>
      {/* <button className="btn">
        <NavLink to="/"> Back to Home Page</NavLink>
      </button> */}
      <button onClick={handleClick} className="btn">
        Return Home
      </button>
    </>
  );
};

export default ErrorPage;
