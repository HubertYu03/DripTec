import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./LoginPage.css"; // Import CSS file for styling

const supabase = createClient(
  "https://qphhyphvmtmijyprcvwj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwaGh5cGh2bXRtaWp5cHJjdndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyNTg2ODUsImV4cCI6MjAyNjgzNDY4NX0.-LYJcIYcElrGzRGjM6jHZDNlff1lu17zEOBHsdLB4X0"
);

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("User logged in:", user);
      // Handle successful login (e.g., redirect user to dashboard)
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login error (e.g., display error message to user)
    }
    // Reset the form after submission
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="login-title">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="EMAIL"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="PASSWORD"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
