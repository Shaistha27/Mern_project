import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "./utils/AuthProvider";
import "./Navbar.css";
import program_1 from "../assets/cancel-icon-png-12.jpg";

const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  // console.log("Current Pathname:", location.pathname);

  const [sticky, setSticky] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const profileName = async () => {
      try {
        const res = await fetch("/profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setUsername(data.name);
      } catch (error) {
        console.error("Error caught:", error);
      }
    };

    profileName();
  }, []);

  const toggleMenu = () => {
    setMobileMenu((prevState) => !prevState);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const isProfilePage = location.pathname === "/profile";
  const isSignInPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  const navbarClass = `container ${sticky ? "dark-nav" : ""} ${
    isProfilePage || isSignInPage || isSignUpPage ? "dark-nav" : ""
  }`;

  return (
    <>
      <nav className={navbarClass}>
        <div className="mainNav">
          <NavLink className="navbar-brand logo" to="/">
            logo
          </NavLink>

          <ul className={mobileMenu ? "" : "hide-mobile-menu"}>
            <li className="nav-item">
              <NavLink
                className="nav-link active homeLink"
                aria-current="page"
                to="/"
                onClick={() => scrollToSection("hero", 100)}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="#program"
                onClick={() => scrollToSection("program", 100)}
              >
                Programs
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li className="nav-item profile">
                <NavLink to="/profile">
                  <img
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    className="user_image"
                    alt="profile"
                  ></img>
                </NavLink>
                <NavLink className="nav-link" to="/profile">
                  {username}
                </NavLink>
              </li>
            ) : (
              <li className="nav-item profile">
                <NavLink to="/profile">
                  <img
                    src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
                    className="user_image"
                    alt="profile"
                  ></img>
                </NavLink>
                <NavLink className="nav-link" to="/profile">
                  Profile
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="#campus"
                onClick={() => scrollToSection("campus", 100)}
              >
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to="#contact"
                onClick={() => scrollToSection("contact", 100)}
              >
                Contact
              </NavLink>
            </li>

            {isLoggedIn ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">
                    Registeration
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <img
            src={program_1}
            alt=""
            className="menu_icon"
            onClick={toggleMenu}
          />
          {/* </div> */}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
