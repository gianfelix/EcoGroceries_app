// JabodetabekStoreArea.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@chakra-ui/react";
import L from "leaflet";
import dataGeoJson from "../../assets/jabodetabek_area.json"

const JabodetabekArea = () => {
  const position = [-6.196267, 106.821776];
  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });


  const storeAreaBoundaries = dataGeoJson

  return (
    <Box id="map" h="330px">
      <MapContainer center={position} zoom={8} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors, and Gian Felix R."
        />
        <GeoJSON data={storeAreaBoundaries} color="red" fillOpacity={0.1}>
          <Popup>Jabodetabek Groceries service area coverage</Popup>
        </GeoJSON>
        <Marker position={position} icon={customIcon}>
          <Popup>Jabodetabek Groceries Location</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default JabodetabekArea;
