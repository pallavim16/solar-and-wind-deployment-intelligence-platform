import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState("Tumkur");

  // Fetch all projects
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

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create Project
  const createProject = async () => {

    if (
      name.trim() === "" ||
      description.trim() === "" ||
      region.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {

      await axios.post(
        "http://127.0.0.1:8000/projects/",
        {
          name,
          description,
          region,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created Successfully");

      setName("");
      setDescription("");
      setRegion("Tumkur");

      fetchProjects();

    } catch (err) {

      console.log(err);

      alert("Failed to create project");

    }

  };

  // Delete Project
  const deleteProject = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://127.0.0.1:8000/projects/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Deleted");

      fetchProjects();

    } catch (err) {

      console.log(err);

      alert("Unable to delete project");

    }

  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Create Project</h1>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      >
        <option value="Tumkur">Tumkur</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Mysore">Mysore</option>
        <option value="Bellary">Bellary</option>
      </select>

      <br />
      <br />

      <button onClick={createProject}>
        Create Project
      </button>

      <hr
        style={{
          margin: "40px 0",
        }}
      />

      <h2>Available Projects</h2>

      {projects.length === 0 ? (

        <p>No Projects Found.</p>

      ) : (

        projects.map((project) => (

          <div
            key={project.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{project.name}</h3>

            <p>{project.description}</p>

            <p>
              <strong>Region:</strong> {project.region}
            </p>

            <button
              onClick={() => deleteProject(project.id)}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                padding: "10px 18px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Delete Project
            </button>

          </div>

        ))

      )}
    </div>
  );
}