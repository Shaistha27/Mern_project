// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./utils/AuthProvider";
// import "./Profile.css";

// const Profile = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const [userData, setUserData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const callProfilePage = async () => {
//     try {
//       const res = await fetch("/profile", {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // Include cookies in the request
//       });

//       if (!res.ok) {
//         throw new Error("Failed to fetch user data");
//       }

//       const data = await res.json();
//       setUserData(data);
//       setIsLoading(false);
//     } catch (error) {
//       setError(error.message);
//       setIsLoading(false);
//       // navigate("/login");
//     }
//   };

//   useEffect(() => {
//     callProfilePage();
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="profileMain">
//       <div className="parent-parent ">
//         <h4>My Profile Page</h4>
//         {isLoggedIn ? (
//           userData && (
//             <div className="userInfo">
//               <div className="userName">Name : {userData.name}</div>
//               <div className="userEmail">Email : {userData.email}</div>
//               <div className="userPhone">Phone : {userData.phone}</div>
//             </div>
//           )
//         ) : (
//           <h5>Please Log in to access the Profile page</h5>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "./utils/AuthProvider";
// // import "./Profile.css";
// // const Profile = () => {
// //   const navigate = useNavigate();
// //   const { isLoggedIn } = useAuth();
// //   const [userData, setUserData] = useState(null);

// //   const callProfilePage = async () => {
// //     try {
// //       const res = await fetch("/profile", {
// //         method: "GET",
// //         headers: {
// //           Accept: "application/json",
// //           "Content-Type": "application/json",
// //         },
// //         // cookies will reach backend
// //         credentials: "include",
// //       });

// //       if (!res.ok) {
// //         const error = new Error(res.error);
// //         throw error;
// //       }
// //       const data = await res.json();
// //       console.log(data);
// //       setUserData(data);
// //     } catch (error) {
// //       console.log("Error caught:", error);
// //       navigate("/login");
// //     }
// //   };
// //   useEffect(() => {
// //     callProfilePage();
// //   }, []);

// //   return (
// //     <>
// //       <div className="profileMain">
// //         <div className="parent-parent ">
// //           <h4>My Profile Page</h4>
// //           {isLoggedIn ? (
// //             userData && (
// //               <div className="userInfo">
// //                 <div className="userName">Name : {userData.name}</div>
// //                 <div className="userEmail">Email : {userData.email}</div>
// //                 <div className="userPhone">Phone : {userData.phone}</div>
// //               </div>
// //             )
// //           ) : (
// //             <h5>Please Log in to access the Profile page</h5>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Profile;

import React, { useEffect, useState } from "react";
import { useAuth } from "./utils/AuthProvider";

const Profile = () => {
  const { token } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setProfileData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <pre>{JSON.stringify(profileData, null, 2)}</pre>
    </div>
  );
};

export default Profile;
