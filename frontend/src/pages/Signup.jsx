import { useState } from "react";
import axios from "axios";
import "../styles/login.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Project Manager");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        {
          full_name: fullName,
          email: email,
          password: password,
          confirm_password: confirmPassword,
          role: role,
        }
      );

      alert("Registration Successful!");

      console.log(response.data);

      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("Project Manager");
    } catch (error) {
      console.log(error.response?.data);

      if (error.response?.data?.detail) {
        if (Array.isArray(error.response.data.detail)) {
          alert(
            error.response.data.detail
              .map((err) => err.msg)
              .join("\n")
          );
        } else {
          alert(error.response.data.detail);
        }
      } else {
        alert("Registration Failed");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={registerUser}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Project Manager">Project Manager</option>
          <option value="Engineer">Engineer</option>
          <option value="Analyst">Analyst</option>
        </select>

        <button type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;