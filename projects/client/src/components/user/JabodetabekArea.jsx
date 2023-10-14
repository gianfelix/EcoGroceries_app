// JabodetabekStoreArea.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@chakra-ui/react";
import L from "leaflet";

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

  // Define the boundaries of the Jabodetabek store area as an array of coordinates
  const storeAreaBoundaries = [
    [-6.810784, 106.325163],
    [-5.491429, 106.325163],
    [-5.491429, 107.326882],
    [-6.810784, 107.326882],
  ];

  return (
    <Box id="map" h="330px" >
      <MapContainer
        center={position}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors, and Gian Felix R."
        />
        <Polygon positions={storeAreaBoundaries} color="red" fillOpacity={0.1}>
          <Popup>Jabodetabek Groceries service area coverage</Popup>
        </Polygon>
        <Marker position={position} icon={customIcon}>
          <Popup>Jabodetabek Groceries Location</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default JabodetabekArea;
