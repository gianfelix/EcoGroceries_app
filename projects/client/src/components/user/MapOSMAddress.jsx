import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapOSMAddress = ({ latitude, longitude, onLocationSelect }) => {
  const [position, setPosition] = useState([latitude, longitude]); 

  useEffect(() => {
    setPosition([latitude, longitude]); 
  }, [latitude, longitude]);

  const handleMarkerDrag = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setPosition([lat, lng]); 
    onLocationSelect(lat, lng);
  };

  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
  return (
    <MapContainer
      center={position}
      zoom={5}
      style={{ width: "100%", height: "300px" }}
      onClick={(e) => setPosition(e.latlng)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker
          position={position}
          icon={customIcon}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDrag }}
        >
          <Popup>
            Selected location: <br /> Latitude: {position[0]} <br/>
            Longitude: {position[1]}
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapOSMAddress;
