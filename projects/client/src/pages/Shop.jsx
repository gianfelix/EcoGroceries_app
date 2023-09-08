import React, { useEffect, useState } from "react";
import LandingYkAround from "../components/user/LandingYkAround";
import LandingJabodetabek from "../components/user/LandingJabodetabek";
import LandingUnreachArea from "../components/user/LandingUnreachArea";
import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const getReverseGeolocation = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reverse geolocation:", error);
    return null;
  }
};

const Shop = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

          // Fetch reverse geolocation data
          const geolocationData = await getReverseGeolocation(
            latitude,
            longitude
          );

          if (geolocationData && geolocationData.display_name) {
            setUserAddress(geolocationData.display_name);
          }
        },
        (error) => {
          console.error(error);
          navigate("/");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [navigate]);

  console.log(userLocation);
  if (!userLocation) {
    return (
      <>
      <Box>
        <Navbar />
      </Box>
        <Box
          w={"full"}
          h={"100%"}
          mt={{base: "54%",md: "15%"}}
          mb={{base: "53%",md: "15%"}}
          display={"flex"}
          justifyContent={"center"}
        >
          <Spinner size={"xl"} />{" "}
          <Text pr={5}>Wait a moment, we are fetching your location</Text>
        </Box>
      </>
    );
  }

  //   const inYogjakarta =
  //     userLocation.latitude >= -8.206338 &&
  //     userLocation.latitude <= -7.543457 &&
  //     userLocation.longitude >= 110.011482 &&
  //     userLocation.longitude <= 110.843268;

  const inYogjakarta =
    userLocation.latitude >= -8.206338 &&
    userLocation.latitude <= -7.543457 &&
    userLocation.longitude >= 110.011482 &&
    userLocation.longitude <= 110.843268;

  const inJabodetabek =
    userLocation.latitude >= -6.810784 &&
    userLocation.latitude <= -5.491429 &&
    userLocation.longitude >= 106.325163 &&
    userLocation.longitude <= 107.326882;

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Flex
        bg={"whiteAlpha.500"}
        position={"absolute"}
        top={"100px"}
        left={"22%"}
        right={"22%"}
        justify={"center"}
        mb={4}
        color={"black"}
        p={2}
        borderRadius={"xl"}
        alignItems="center" 
      >
        <Text>Your Current Position:</Text>
        <Text fontWeight="bold" ml={2}>
          {userAddress}
        </Text>
      </Flex>
      {inYogjakarta ? (
        <LandingYkAround />
      ) : inJabodetabek ? (
        <LandingJabodetabek />
      ) : (
        <LandingUnreachArea />
      )}
      <Box>
        <Footer/>
      </Box>
    </>
  );
};

export default Shop;
