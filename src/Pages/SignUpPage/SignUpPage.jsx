import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./SignUpPage.css"; // Import CSS file for styling

const supabase = createClient(
  "https://qphhyphvmtmijyprcvwj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGh5cGh2bXRtaWp5cHJjdndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNTg2ODUsImV4cCI6MjAyNjgzNDY4NX0.-LYJcIYcElrGzRGjM6jHZDNlff1lu17zEOBHsdLB4X0"
);

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match!"); // Set error message in state
        return; // Exit the function early
      }

      // Call Supabase auth.signUp method to create a new user account
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Proceed with next steps upon successful sign-up
      console.log("User signed up successfully:", user);
      // If login successful -> go to homepage
      navigate("/");
    } catch (error) {
      // Handle sign-up error (e.g., display error message to user)
      console.error("Sign-up failed:", error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1 className="signup-title">Sign Up</h1>
        <div className="form-group">
          <input
            type="text"
            placeholder="NAME"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button onClick={handleSignUp}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
