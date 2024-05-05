// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Login from "./components/Login";
// import Logout from "./components/Logout";
// import Signup from "./components/Signup";
// import ErrorPage from "./components/ErrorPage";
// import "./App.css";

// const ParentComponent = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");

//   const handleLogin = (user) => {
//     setUsername(user.username);
//     setIsLoggedIn(true);
//   };

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={<Home isLoggedIn={isLoggedIn} username={username} />}
//         />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/login" element={<Login onLogin={handleLogin} />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="*" element={<ErrorPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default ParentComponent;
