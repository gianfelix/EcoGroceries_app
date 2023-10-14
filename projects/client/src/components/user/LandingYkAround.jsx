import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ListProduct from "../user/ListProductYK";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

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

const LandingYkAround = () => {
  // const imageUrl =
  //   "https://bappeda.jogjaprov.go.id/static/images/background/background.jpg";
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
          onClick={() => navigate("/shop/jkt")}
        >
          Go To Jabodetabek Groceries
        </Button>
      </Flex> */}
      <Box
        // bgImage={`url(${imageUrl})`}
        bg={"teal.400"}
        bgSize="cover"
        bgPosition="center"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
        pb={10}
      >
        <Text fontSize={["md", "2xl"]} fontWeight={"semibold"} textAlign="center">
          Your Current Position:
        </Text>
        <Text bg={"teal.500"} mx={'5'} px={3} py={1} color={"white"}  fontSize={["xs", "xl"]} fontWeight="bold" >
          {userAddress}
        </Text>
        <Heading fontSize={["md", "4xl"]} fontWeight={"bold"} textAlign="center">
          Yogyakarta EcoGroceries
        </Heading>
        <Text fontSize={["xs", "xl"]} fontWeight={"semibold"} mt={1} mb={5} textAlign="center">
          Your One-Stop Shop for Eco-Friendly Products
        </Text>
        <ListProduct />
      </Box>
      <Footer />
    </>
  );
};

export default LandingYkAround;
