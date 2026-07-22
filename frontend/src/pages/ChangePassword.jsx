import { useState } from "react";
import axios from "axios";

export default function ChangePassword() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const changePassword = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/auth/change-password",
        {
          current_password: current,
          new_password: newPass,
          confirm_new_password: confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Password Changed Successfully");
    } catch (err) {
      alert(err.response?.data?.detail);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Change Password</h1>

      <input
        type="password"
        placeholder="Current Password"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="New Password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />

      <br />
      <br />

      <button onClick={changePassword}>
        Change Password
      </button>
    </div>
  );
}