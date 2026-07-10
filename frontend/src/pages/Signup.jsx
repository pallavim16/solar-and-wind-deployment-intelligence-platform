import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.detail || "Registration Failed");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={registerUser}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Signup;