import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function ChangeView({ latitude, longitude }) {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) {
      map.setView([Number(latitude), Number(longitude)], 15);
    }
  }, [latitude, longitude, map]);

  return null;
}

function MapEvents({
  points,
  setPoints,
  setLatitude,
  setLongitude,
  getLocationDetails,
}) {
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      setLatitude(lat.toFixed(6));
      setLongitude(lng.toFixed(6));

      getLocationDetails(lat.toFixed(6), lng.toFixed(6));

      setPoints((prev) => [...prev, [lng, lat]]);
    },
  });

  return null;
}

export default function MapPicker({
  latitude,
  longitude,
  setLatitude,
  setLongitude,
  getLocationDetails,
  setLandArea,
}) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (points.length >= 3) {
      const polygon = turf.polygon([
        [...points, points[0]],
      ]);

      const area = turf.area(polygon);

      const acres = area / 4046.86;

      setLandArea(acres.toFixed(2));
    }
  }, [points, setLandArea]);

  return (
    <>
      <MapContainer
        center={[13.3409, 77.101]}
        zoom={10}
        style={{
          height: "450px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ChangeView
          latitude={latitude}
          longitude={longitude}
        />

        <MapEvents
          points={points}
          setPoints={setPoints}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          getLocationDetails={getLocationDetails}
        />

        {latitude && longitude && (
          <Marker
            position={[Number(latitude), Number(longitude)]}
          />
        )}

        {points.length >= 3 && (
          <Polygon
            positions={points.map(([lng, lat]) => [lat, lng])}
          />
        )}
      </MapContainer>

      <br />

      <button
        onClick={() => {
          setPoints([]);
          setLandArea("");
        }}
      >
        Clear Selected Area
      </button>

      <p>
        Click around the land boundary to draw a polygon.
      </p>
    </>
  );
}