// frontend/src/components/LocationSelector/MapView.jsx
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

/* fix default icon urls (Leaflet + CRA) */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Recenter = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.flyTo([lat, lon], 6, { duration: 1.2 });
    }
  }, [lat, lon, map]);
  return null;
};

const MapView = ({ coords, label }) => {
  if (!coords || coords.length < 2) return null;
  const [lat, lon] = coords; // note order lat,lng expected

  return (
    <div style={{ marginTop: 16 }}>
      <MapContainer center={[lat, lon]} zoom={5} style={{ height: 360, borderRadius: 8 }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>{label}</Popup>
        </Marker>
        <Recenter lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
};

export default MapView;
