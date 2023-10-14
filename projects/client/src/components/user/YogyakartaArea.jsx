import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Box } from "@chakra-ui/react";
import L from "leaflet";

const YogyakartaArea = () => {
  const position = [-7.782646, 110.374064];
  const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.6/dist/images/marker-icon-2x.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const storeAreaBoundaries = [
    [-8.206338, 110.011482],
    [-7.543457, 110.011482],
    [-7.543457, 110.843268],
    [-8.206338, 110.843268],
  ];

  return (
    <Box id="map" h="330px" >
      <MapContainer
        center={position}
        zoom={9}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors, and Gian Felix R."
        />
        <Polygon
          positions={storeAreaBoundaries}
          color="red"
          fillOpacity={0.1}
        >
            <Popup>Yogyakarta Groceries service area coverage</Popup>
        </Polygon>
        <Marker position={position} icon={customIcon}>
          <Popup>Yogyakarta Groceries Location</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default YogyakartaArea;
