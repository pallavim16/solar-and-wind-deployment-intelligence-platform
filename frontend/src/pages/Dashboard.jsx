import { Link, useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);
  const [sites, setSites] = useState([]);

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/projects/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch Sites
  // Fetch Sites
const fetchSites = async () => {
  try {
    const res = await axios.get(
      "http://127.0.0.1:8000/sites/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSites(res.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    fetchProjects();
    fetchSites();
  }, []);

  return (
    <div className="dashboard">

      {/* Navbar */}

      <div className="navbar">
        <h2>🌞 Solar & Wind Deployment Intelligence Platform</h2>

        <button className="logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="layout">

        {/* Sidebar */}

        <div className="sidebar">
          <Link to="/dashboard">🏠 Dashboard</Link>

          <Link to="/projects">📁 Projects</Link>

          <Link to="/sites">📍 Sites</Link>

          <Link to="/change-password">🔒 Change Password</Link>
        </div>

        {/* Main */}

        <div className="main">

          <h1>Welcome 👋</h1>

          <p>
            <strong>Email:</strong> {email}
          </p>

          <p>
            <strong>Role:</strong> {role}
          </p>

          <div className="cards">

            {/* Projects */}

            <div className="card">
              <h2>📁 Projects</h2>

              <h1>{projects.length}</h1>

              <p>Total Renewable Projects</p>

              <br />

              <button onClick={() => navigate("/projects")}>
                Open Projects
              </button>
            </div>

            {/* Sites */}

            <div className="card">
              <h2>📍 Sites</h2>

              <h1>{sites.length}</h1>

              <p>Total Renewable Sites</p>

              <br />

              <button onClick={() => navigate("/sites")}>
                Open Sites
              </button>
            </div>

            {/* Security */}

            <div className="card">
              <h2>🔒 Security</h2>

              <p>Update your account password securely.</p>

              <br />

              <button
                onClick={() => navigate("/change-password")}
              >
                Change Password
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;