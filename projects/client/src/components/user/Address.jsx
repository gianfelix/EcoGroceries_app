// UserAddress.js

import React, { useState, useEffect, useCallback } from "react";
import jwt_decode from "jwt-decode";
import {
  Button,
  FormControl,
  Stack,
  useColorModeValue,
  Box,
  Flex,
  Text,
  Divider,
} from "@chakra-ui/react";
import EditAddress from "./EditAddress";
import AddNewAddress from "./AddNewAddress";
import DeletedAddress from "./DeletedAddress";
import SetDefaultAddress from "./SetDefaultAddress";
import axios from "axios";

export default function UserAddress() {
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const openEditAddressModal = (item) => {
    setSelectedAddress(item);
    setIsEditAddressModalOpen(true);
  };
  const closeEditAddressModal = () => setIsEditAddressModalOpen(false);

  const openAddAddressModal = () => setIsAddAddressModalOpen(true);
  const closeAddAddressModal = () => setIsAddAddressModalOpen(false);

  const id = jwt_decode(localStorage.getItem("token")).id;

  // Define a callback function to update user data when a new address is added
  const updateUserAddressList = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:8000/api/address/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(res.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleSetDefault = (addressId) => {
    // Create a copy of userData to avoid mutating state directly
    const updatedUserData = [...userData];
    
    // Find the index of the address with the given addressId
    const addressIndex = updatedUserData.findIndex((item) => item.id === addressId);
    
    if (addressIndex !== -1) {
      // Update the isMain property for the selected address
      updatedUserData[addressIndex].isMain = true;
      
      // Update the state with the new userData
      setUserData(updatedUserData);
    }
  };

  return (
    <Box
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("white", "gray.800")}
    >
      <Stack
        spacing={2}
        w={"full"}
        maxW={"xl"}
        bg={useColorModeValue("white", "grey.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        maxH={"450px"}
        overflowY={"scroll"}
      >
        <FormControl align={"left"}>
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Address</Text>
            <Button
              size={"xs"}
              variant={"ghost"}
              textColor={"green"}
              onClick={openAddAddressModal}
            >
              Add New Address
            </Button>
          </Flex>
          <AddNewAddress
            isOpen={isAddAddressModalOpen}
            onClose={closeAddAddressModal}
            updateUserData={updateUserAddressList} // Pass the callback here
          />
          {userData.map((item) => (
            <Box
              key={item.id}
              bg={item.isMain ? "gray.100" : "transparent"} // Set background color to grey for the default address
              p={item.isMain ? 3 : 0} // Add padding for the default address
              rounded={item.isMain ? "md" : "none"} // Add rounded corners for the default address
            >
              {item.isMain && (
                <Text fontWeight={"bold"} color="blue.500">
                  Default Address
                </Text>
              )}
              <Text fontWeight={"hairline"}>Label Address</Text>
              <Text>{item.userName}</Text>
              <Text fontWeight={"hairline"}>Full Address</Text>
              <Text>{item.userAddress}</Text>
              <Divider />
              <Flex>
                <Button
                  size={"xs"}
                  variant={"ghost"}
                  textColor={"green"}
                  onClick={() => openEditAddressModal(item)}
                >
                  Edit
                </Button>
                <DeletedAddress addressId={item.id} updateAddressCallback={updateUserAddressList} />
                <SetDefaultAddress addressId={item.id} isDefault={item.isMain} setDefaultCallback={handleSetDefault} updateAddressCallback={updateUserAddressList} />
              </Flex>
              <Divider />
            </Box>
          ))}

          <EditAddress
            isOpen={isEditAddressModalOpen}
            onClose={closeEditAddressModal}
            addressToEdit={selectedAddress}
            updateUserData={updateUserAddressList}
          />
        </FormControl>
      </Stack>
    </Box>
  );
}
