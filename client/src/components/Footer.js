import React from "react";
import "./Footer.css";
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";

const Footer = () => {
  return (
    <>
      <div className="parent_footer">
        <div className="section1">
          <h2 className="footer_heading">EduCity</h2>
          <hr /> <span>Prosper, Power, Progress</span> <hr />
        </div>
        <div className="section2">
          <h3>Navigation</h3>
          <p>About us</p>
          <p>Programs</p>
          <p>Services</p>
        </div>

        <div className="section2">
          <h3>Contacts</h3>
          <p className="contactsChild1">
            <i
              className="fa-solid fa-phone fa-lg"
              style={{ marginRight: "4px" }}
            ></i>
            <p>9967xxxxxx</p>
          </p>
          <p className="contactsChild1">
            <i
              className="fa-solid fa-envelope fa-lg"
              style={{ marginRight: "4px" }}
            ></i>
            <p>@PMahaboobSana.com</p>
          </p>
        </div>

        <div className="section2">
          <h3>
            Social Media
            <div className="socialChild1">
              <p>
                <i class="fa-brands fa-square-facebook"></i>
              </p>
              <p>
                <i class="fa-brands fa-instagram"></i>
              </p>
            </div>
            <div className="socialChild1">
              <p>
                <i class="fa-brands fa-linkedin"></i>
              </p>
              <p>
                <i class="fa-brands fa-github"></i>
              </p>
            </div>
          </h3>
        </div>
      </div>
      <div className="footer2">2024 &copy; All Rights Reserved</div>
    </>
  );
};

export default Footer;
