import React, { useState } from "react";
import "./SignUpPage.css"; // Import CSS file for styling

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("User signed up:", user);
      // Handle successful sign-up (e.g., redirect user to login page)
    } catch (error) {
      console.error("Sign-up failed:", error.message);
      // Handle sign-up error (e.g., display error message to user)
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Sign Up</h1>
        <div className="form-group">
          <input
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
