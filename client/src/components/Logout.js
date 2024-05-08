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

// import React, { useEffect } from "react";

// import { useNavigate } from "react-router-dom";

// const Logout = ({ history }) => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const logout = async () => {
//       // Logout logic
//       navigate("/login"); // Navigate to login page
//     };

//     logout();
//   }, [navigate]);

//   return <div>Logging out...</div>;
// };

// export default Logout;
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
