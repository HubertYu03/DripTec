// import "./LoginPage.css";

// import { useState } from "react";

// const LoginForm = () => {
//   // State for input fields
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Perform validation (e.g., check if email and password are valid)
//     // If validation passes, you can make a request to the server to authenticate the user
//     console.log("Email:", email);
//     console.log("Password:", password);

//     // Reset the form after submission
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className="Login-container">
//       <div className="Form">
//         <div className="Login">Login</div>
//         <form onSubmit={handleSubmit}>
//           <div className="Email">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="Password">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;

import { useState } from "react";
import "./LoginPage.css"; // Import CSS file for styling

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    const handleSubmit = (event) => {
      event.preventDefault();
      // Perform validation (e.g., check if email and password are valid)
      // If validation passes, you can make a request to the server to authenticate the user
      console.log("Email:", email);
      console.log("Password:", password);

      // Reset the form after submission
      setEmail("");
      setPassword("");
    };
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <label htmlFor="email">Email</label> */}
            <input
              type="email"
              placeholder="EMAIL"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="password">Password</label> */}
            <input
              type="password"
              placeholder="PASSWORD"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
