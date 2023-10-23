import React, { useEffect, useState } from "react";
import LandingYkAround from "../components/user/LandingYkAround";
import LandingJabodetabek from "../components/user/LandingJabodetabek";
import LandingUnreachArea from "../components/user/LandingUnreachArea";
import { Box, Button, Flex, Select, Spinner, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
  const [availableAddresses, setAvailableAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const location = useLocation();
  console.log("location", location);
  const params = new URLSearchParams(location.search);
  console.log("params", params);
  const latitude = parseFloat(params.get("latitude")) || 0;
  const longitude = parseFloat(params.get("longitude")) || 0;

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

  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwt_decode(token);
      const userId = decodedToken.id;
        const response = await axios.get(`https://jcwd011003.purwadhikabootcamp.com/api/address/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAvailableAddresses(response.data.data);
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };

    if (userLocation) {
      fetchUserAddresses();
    }
  }, [userLocation]);

  console.log(userLocation);
  if (!userLocation) {
    return (
      <>
   
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

  //   const inYogjakarta =
  //     userLocation.latitude >= -8.206338 &&
  //     userLocation.latitude <= -7.543457 &&
  //     userLocation.longitude >= 110.011482 &&
  //     userLocation.longitude <= 110.843268;

  const inYogjakarta =
    (latitude >= -8.206338 &&
      latitude <= -7.543457 &&
      longitude >= 110.011482 &&
      longitude <= 110.843268) ||
    (userLocation.latitude >= -8.206338 &&
      userLocation.latitude <= -7.843457 &&
      userLocation.longitude >= 110.011482 &&
      userLocation.longitude <= 110.843268);

  const inJabodetabek =
    (latitude >= -6.810784 &&
    latitude <= -5.491429 &&
    longitude >= 106.325163 &&
    longitude <= 107.326882) || 
    (userLocation.latitude >= -6.810784 &&
    userLocation.latitude <= -5.491429 &&
    userLocation.longitude >= 106.325163 &&
    userLocation.longitude <= 107.326882);

  const handleAddressSelect = () => {
    if (selectedAddress) {
      const { latitude, longitude } = selectedAddress;
      const url = `/shop?latitude=${latitude}&longitude=${longitude}`;
      navigate(url);
    } else {
      console.error("No address selected.", selectedAddress);
    }
  };

  return (
    <>
    
      <Box bg={"#c4fff2"} pt={4} display={"flex"} justifyContent={"center"}>
        <Text fontSize={"lg"} fontWeight="semibold">
          Your Current Position
        </Text>
        <Text fontSize={"lg"} fontWeight="bold">
          : {userAddress}
        </Text>
      </Box>

      <Flex bg={"#c4fff2"} pt={4} w={"100%"} px={"20%"}>
        <Text minW={"130px"} fontSize="lg" pt={1} fontWeight={"semibold"}>
          Select Address:
        </Text>
        <Select
          placeholder="Select an address"
          border={"1px solid"}
          onChange={(event) => {
            const selected = availableAddresses.find(
              (address) => address.id === parseInt(event.target.value)
            );
            setSelectedAddress(selected);
          }}
        >
          {availableAddresses.map((address) => (
            <option key={address.id} value={address.id}>
              {address.userName} - {address.userAddress}
            </option>
          ))}
        </Select>
        <Button
          ml={5}
          colorScheme="teal"
          variant="solid"
          onClick={() => handleAddressSelect()}
        >
          Go
        </Button>
      </Flex>

      {selectedAddress && (
        <Box bg={"#c4fff2"} pt={2} display="flex" justifyContent="center">
          
          <Text fontSize="lg" fontWeight="bold" ml={2}>
            {selectedAddress.userName}:
          </Text>
          <Text fontSize="lg"  ml={2}>
            (Latitude: {selectedAddress.latitude} Longitude:{" "}
            {selectedAddress.longitude})
          </Text>
        </Box>
      )}
      

      {inYogjakarta ? (
        (window.location.href = "/shop/yk")
        ) : inJabodetabek ? (
          (window.location.href = "/shop/jkt")
          ) : (
            <Box bg={"#c4fff2"}>
            <LandingUnreachArea />
            </Box>
            )}
    </>
  );
};

export default Shop;