import { useEffect, useState } from "react";
import axios from "axios";
import MapPicker from "../components/MapPicker";

export default function Sites() {
  const token = localStorage.getItem("token");

  const [sites, setSites] = useState([]);

  const [siteName, setSiteName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [landArea, setLandArea] = useState("");
  const [elevation, setElevation] = useState("");
  const [infrastructure, setInfrastructure] = useState("");
  const [ownership, setOwnership] = useState("");
  const [projectId, setProjectId] = useState("1");

  const [district, setDistrict] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [prediction, setPrediction] = useState("");
  const [location, setLocation] = useState("");
  const [taluk, setTaluk] = useState("");

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
    fetchSites();
  }, []);

  const getLocationDetails = async (lat, lon) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/location/details?lat=${lat}&lon=${lon}`
    );

    const data = response.data;
    console.log("Location API Response:", data);

    setLocation(data.location || "");
setTaluk(data.taluk || "");
setDistrict(data.district || "");
setStateName(data.state || "");
setCountry(data.country || "");
    setElevation(data.elevation || "");
    setInfrastructure(data.infrastructure || "");
    setOwnership(data.ownership || "");

  } catch (err) {
    console.log(err);
    alert("Unable to fetch location details");
  }
};
const searchPlace = async () => {
  if (!searchLocation.trim()) {
    alert("Please enter a location");
    return;
  }

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}`
    );

    if (response.data.length === 0) {
      alert("Location not found");
      return;
    }

    const place = response.data[0];

    const lat = Number(place.lat).toFixed(6);
    const lon = Number(place.lon).toFixed(6);

    setLatitude(lat);
    setLongitude(lon);

    await getLocationDetails(lat, lon);

    alert("Location Found Successfully!");
  } catch (err) {
    console.log(err);
    alert("Unable to search location");
  }
};
const predictSuitability = async () => {

  console.log({
    latitude,
    longitude,
    landArea,
    elevation
  });

  if (!latitude || !longitude || !landArea || !elevation) {
    alert("Please select a location and enter land area and elevation.");
    return;
  }

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/predict/",
      {
        latitude: Number(latitude),
        longitude: Number(longitude),
        land_area: Number(landArea),
        elevation: Number(elevation),
      }
    );

    setPrediction(res.data.prediction);
  } catch (err) {
    console.log(err);
    alert("Prediction failed");
  }
};
const createSite = async () => {
    if (
      !siteName ||
      !latitude ||
      !longitude ||
      !landArea ||
      !elevation ||
      !infrastructure ||
      !ownership ||
      !projectId
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/sites/",
        {
          site_name: siteName,
          latitude: Number(latitude),
          longitude: Number(longitude),
          land_area: Number(landArea),
          elevation: Number(elevation),
          infrastructure,
          land_ownership: ownership,
          project_id: Number(projectId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Site Created Successfully");

      setSiteName("");
      setLatitude("");
      setLongitude("");
      setLandArea("");
      setElevation("");
      setInfrastructure("");
      setOwnership("");

      setLocation("");
setTaluk("");
setDistrict("");
setStateName("");
setCountry("");

      fetchSites();
    } catch (err) {
      console.log(err);
      alert("Failed to create site");
    }
  };

  return (
  <div style={{ maxWidth: "900px", margin: "auto", padding: "30px" }}>
    <h1>🌍 Sites Management</h1>

    <h2>🔍 Search Location</h2>

    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search city, village or district"
        value={searchLocation}
        onChange={(e) => setSearchLocation(e.target.value)}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={searchPlace}
        style={{
          background: "#0f766e",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Search
      </button>
    </div>

    <input
  placeholder="Site Name"
  value={siteName}
  onChange={(e) => setSiteName(e.target.value)}
/>

<br /><br />

<input
  placeholder="Land Area (Acres)"
  value={landArea}
  readOnly
/>
      <br /><br />

      <button
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position);

    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);

    console.log("Current Latitude:", lat);
    console.log("Current Longitude:", lon);

    setLatitude(lat);
    setLongitude(lon);

    getLocationDetails(lat, lon);
  },
  (error) => {
    console.log(error);
    alert(error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  }
);
        }}
      >
        📍 Use My Current Location
      </button>

      <br /><br />

      <MapPicker
  latitude={latitude}
  longitude={longitude}
  setLatitude={setLatitude}
  setLongitude={setLongitude}
  getLocationDetails={getLocationDetails}
  setLandArea={setLandArea}
/>

      <br /><br />

      <input
        placeholder="Latitude"
        value={latitude}
        readOnly
      />

      <br /><br />

      <input
        placeholder="Longitude"
        value={longitude}
        readOnly
      />

      <br /><br />
      <input
  placeholder="Exact Location"
  value={location}
  readOnly
/>

<br /><br />

      <input
  placeholder="Taluk"
  value={taluk}
  readOnly
/>

<br /><br />

      <input
        placeholder="District"
        value={district}
        readOnly
      />

      <br /><br />

      <input
        placeholder="State"
        value={stateName}
        readOnly
      />

      <br /><br />

      <input
        placeholder="Country"
        value={country}
        readOnly
      />

      <br /><br />

      <br /><br />

      <input
  placeholder="Elevation (Meters)"
  value={elevation}
  readOnly
/>

<br /><br />

<button
  onClick={predictSuitability}
  style={{
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  🤖 Predict Suitability
</button>

<br /><br />

{prediction && (
  <div
    style={{
      background: "#dcfce7",
      color: "#166534",
      padding: "15px",
      borderRadius: "10px",
      fontWeight: "bold",
      marginBottom: "20px",
    }}
  >
    AI Prediction: {prediction}
  </div>
)}

<input
  placeholder="Infrastructure"
  value={infrastructure}
  readOnly
/>
      <br /><br />

      <input
  placeholder="Land Ownership"
  value={ownership}
  readOnly
/>

      <br /><br />

      <input
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />

      <br /><br />

      <button onClick={createSite}>
        Create Site
      </button>

      <hr />

      <h2>Existing Sites</h2>

      {sites.length === 0 ? (
        <p>No Sites Found</p>
      ) : (
        sites.map((site) => (
          <div
            key={site.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "12px",
            }}
          >
            <h3>{site.site_name}</h3>

            <p><strong>Latitude:</strong> {site.latitude}</p>

            <p><strong>Longitude:</strong> {site.longitude}</p>

            <p><strong>Land Area:</strong> {site.land_area}</p>

            <p><strong>Elevation:</strong> {site.elevation}</p>

            <p><strong>Infrastructure:</strong> {site.infrastructure}</p>

            <p><strong>Ownership:</strong> {site.land_ownership}</p>

            <p><strong>Project ID:</strong> {site.project_id}</p>
          </div>
        ))
      )}
    </div>
  );
}