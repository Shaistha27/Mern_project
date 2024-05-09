// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const Logout = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const logout = async () => {
//       try {
//         const response = await fetch("/logout", {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         });
//         console.log(response);
//         if (!response.ok) {
//           throw new Error("Logout request failed");
//         }
//         console.log("logout completed");
//         navigate("/login");
//       } catch (error) {
//         console.error("Logout error:", error);
//       }
//     };

//     logout();
//   }, [navigate]);

//   return <div>Logout</div>;
// };

// export default Logout;

// 2

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./utils/AuthProvider.js";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to={"/login"} />;
};

export default Logout;
