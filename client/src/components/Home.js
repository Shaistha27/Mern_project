import React, { useState, useEffect } from "react";
import { useAuth } from "./utils/AuthProvider.js";

const Home = () => {
  const [username, setUsername] = useState("");
  const { isLoggedIn } = useAuth();

  const callHomePage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUsername(data.name);
    } catch (error) {
      console.error("Error caught:", error);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <div className="home-page container">
      <div className="home-div">
        <p className="pt-5">Welcome</p>
        {isLoggedIn ? (
          <h1> {username}</h1>
        ) : (
          <h5> Please log in to access the home page. </h5>
        )}

        <h5>It is a MERN project</h5>
      </div>
    </div>
  );
};

export default Home;

// // components/Home.js

// // import React from "react";

// // const Home = ({ isLoggedIn, username }) => {
// //   return (
// //     <div>
// //       {isLoggedIn ? (
// //         <div>
// //           <p>Welcome, {username}!</p>
// //           {/* Add logout button here */}
// //           <button>logout</button>
// //         </div>
// //       ) : (
// //         <p>Please log in to access the home page.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Home;
