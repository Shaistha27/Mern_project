import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile.js";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import ErrorPage from "./components/ErrorPage";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Programs from "./components/Programs.js";
import Product from "./components/Product.js";
import VideoUpload from "./components/VideoUpload/VideoUpload.js";
import VideoList from "./components/VideoList/VideoList.js";
import Admin from "./components/Admin.jsx";
const App = () => {
  return (
    <>
      <Navbar />
      {/* <Hero /> */}
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/add-to-cart" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/videoUpload" element={<VideoUpload />} />
        <Route path="/dashboard" element={<Admin />} />
        <Route path="/videoList" element={<VideoList />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default App;

// import { ParentComponent } from "./components/Parent.js";
// const App = () => {
//   return <ParentComponent />;
// };
// export default App;
