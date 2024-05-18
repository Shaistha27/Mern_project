import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "./utils/AuthProvider";

const Login = () => {
  const navigate = useNavigate();

  const { storeTokenInLs } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const LoginUser = async (element) => {
    element.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    // if (data.status === 400) {
    //   window.alert("Invalid Login");
    //   console.log("Invalid Login");
    // } else {
    //   window.alert("Login successful");
    //   console.log("Login successful");

    //   navigate("/");
    // }
    if (res.status === 400) {
      window.alert("Invalid Login");
      console.log("Invalid Login");
    } else if (res.status === 200) {
      window.alert("Login successful");
      console.log("Login successful");
      storeTokenInLs(data.token);
      // localStorage.setItem("token", data.token);
      navigate("/");
    } else if (res.status === 201) {
      window.alert("admin Login sucessfull");
      console.log("admin login sucessfully");
      storeTokenInLs(data.token);
      navigate("/dashboard");
    } else {
      window.alert("Unexpected error occurred");
      console.log("Unexpected error occurred");
    }
  };

  return (
    <>
      <div className="grandParent">
        <div className="parent-parent">
          <div className="parent">
            <h2>Log in</h2>
            <p>Welcome back! Please enter your details</p>
            <form method="POST" onSubmit={LoginUser}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Your Email"
                />
                <div className="smallLine"></div>
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Your Password"
                />
                <div className="smallLine"></div>
              </div>

              <button
                type="submit"
                className="btn "
                value="Log in"
                onSubmit={LoginUser}
              >
                Log In
              </button>
            </form>
          </div>
          <div>
            <p>
              <NavLink
                to="/signup"
                className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Create an account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

// import React, { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useAuth } from "./utils/AuthProvider";
// import "./Login.css";

// const Login = () => {
//   const navigate = useNavigate();
//   const { storeTokenInLs } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const LoginUser = async (element) => {
//     element.preventDefault();
//     const res = await fetch("/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     console.log(res);
//     const data = await res.json();
//     console.log(data);
//     if (res.status === 400) {
//       window.alert("Invalid Login");
//       console.log("Invalid Login");
//     } else if (res.status === 200) {
//       window.alert("Login successful");
//       console.log("Login successful");
//       storeTokenInLs(data.token);
//       navigate("/");
//     } else if (res.status === 201) {
//       window.alert("admin Login sucessfull");
//       console.log("admin login sucessfully");
//       storeTokenInLs(data.token);
//       navigate("/dashboard");
//     } else {
//       window.alert("Unexpected error occurred");
//       console.log("Unexpected error occurred");
//     }
//   };

//   return (
//     <>
//       <form method="POST" onSubmit={LoginUser}>
//         <div className="mb-3">
//           <label htmlFor="exampleInputEmail1" className="form-label">
//             Email address
//           </label>
//           <input
//             type="email"
//             className="form-control"
//             id="exampleInputEmail1"
//             aria-describedby="emailHelp"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//             placeholder="Your Email"
//           />
//           <div id="emailHelp" className="form-text">
//             We'll never share your email with anyone else.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="exampleInputPassword1" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="exampleInputPassword1"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//             placeholder="Your Password"
//           />
//         </div>

//         <button
//           type="submit"
//           className="btn btn-primary"
//           value="Log in"
//           // onSubmit={LoginUser}
//         >
//           Log In
//         </button>
//       </form>
//       <div>
//         <p>
//           <NavLink
//             to="/signup"
//             className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
//           >
//             Create an account
//           </NavLink>
//         </p>
//       </div>
//     </>
//   );
// };

// export default Login;
