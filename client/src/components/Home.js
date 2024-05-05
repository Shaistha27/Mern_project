import React, { useState, useEffect } from "react";

const Home = () => {
  const [username, setUsername] = useState("");

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
        <h1> {username}</h1>
        <h1>It is a MERN project</h1>
      </div>
    </div>
  );
};

export default Home;

// components/Home.js

// import React from "react";

// const Home = ({ isLoggedIn, username }) => {
//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <p>Welcome, {username}!</p>
//           {/* Add logout button here */}
//           <button>logout</button>
//         </div>
//       ) : (
//         <p>Please log in to access the home page.</p>
//       )}
//     </div>
//   );
// };

// export default Home;
