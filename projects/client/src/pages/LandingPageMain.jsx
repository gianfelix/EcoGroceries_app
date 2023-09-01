import React, { useState, useEffect } from "react";


import { Box, Text } from "@chakra-ui/react";

import LandingUnreachArea from "./LandingUnreachArea";
import LandingJabodetabek from "./LandingJabodetabek";
import LandingYkAround from "./LandingYkAround";

const LandingPageMain = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  console.log(userLocation);
  if (!userLocation) {
    return <div>Mengambil lokasi...</div>;
  }

  const inYogjakarta =
    userLocation.latitude >= -8.206338 &&
    userLocation.latitude <= -7.543457 &&
    userLocation.longitude >= 110.011482 &&
    userLocation.longitude <= 110.843268;

  // const inJawaTimur =
  //   userLocation.latitude >= -8.307721 &&
  //   userLocation.latitude <= -6.687675 &&
  //   userLocation.longitude >= 111.041809 &&
  //   userLocation.longitude <= 114.52089;

    const inJabodetabek =
    userLocation.latitude >= -6.810784 &&
    userLocation.latitude <= -5.491429 &&
    userLocation.longitude >= 106.325163 &&
    userLocation.longitude <= 107.326882;


  return (
    <>
      {inYogjakarta ? (
        <LandingYkAround />
      ) : inJabodetabek ? (
        <LandingJabodetabek />
      ) : (
        <LandingUnreachArea />
      )}

      <Box mt={5} display={"flex"} justifyContent={"center"}>
        <Box>
          <Text>For Check Your Coordinate Location</Text>
          <Text>Latitude: {userLocation.latitude}</Text>
          <Text>Longitude: {userLocation.longitude}</Text>
          <Text>
            Coordinat: {userLocation.latitude}, {userLocation.longitude}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default LandingPageMain;
