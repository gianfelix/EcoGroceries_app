import {
  Box,
  Heading,
  Text,
  Flex,
  Spinner,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Products from "../Products";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

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

const LandingJabodetabek = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });

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
          mt={{ base: "54%", md: "15%" }}
          mb={{ base: "53%", md: "15%" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Spinner size={"xl"} />{" "}
          <Text pr={5}>Wait a moment, we are fetching your location</Text>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      {/* <Flex bg={"teal.400"} pt={8} pl={20}>
        <Button
          mr={5}
          color={"black"}
          _hover={{ bg: "teal.100", color: "blue" }}
          onClick={() => navigate("/shop/yk")}
        >
          Go To Yogyakarta Groceries
        </Button>
      </Flex> */}
      <Flex
        bg={"teal.400"}
        backgroundPosition="center"
        minHeight="100vh"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
      >
        <Text fontSize="2xl" fontWeight={"semibold"} textAlign="center">
          Your Current Position:
        </Text>
        <Text
          bg={"teal.500"}
          px={3}
          py={1}
          color={"white"}
          fontWeight="bold"
          mb={5}
        >
          {userAddress}
        </Text>
        <Heading fontSize="4xl" fontWeight={"bold"}  textAlign="center">
          Jabodetabek EcoGroceries
        </Heading>
        <Text fontSize="xl" fontWeight={"semibold"} mt={4} mb={5} textAlign="center">
          Your One-Stop Shop for Eco-Friendly Products
        </Text>
        <Products />
      </Flex>
    </>
  );
};

export default LandingJabodetabek;
