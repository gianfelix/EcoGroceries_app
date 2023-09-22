"use client";
import React, { useState, useEffect} from "react";
import jwt_decode from "jwt-decode"
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
import AddNewAddress from "./AddNewAddress"
import DeletedAddress from "./DeletedAddress"
import axios from "axios";



export default function PersonalData() {
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isDeletedAddressModalOpen, setIsDeletedAddressModalOpen] = useState(false);
  const [userData, setUserData] = useState([]);



  const openEditAddressModal = () => setIsEditAddressModalOpen(true);
  const closeEditAddressModal = () => setIsEditAddressModalOpen(false);

  const openAddAddressModal = () => setIsAddAddressModalOpen(true);
  const closeAddAddressModal = () => setIsAddAddressModalOpen(false);

  const openDeletedAddressModal = () => setIsDeletedAddressModalOpen(true);
  const closeDeletedAddressModal = () => setIsDeletedAddressModalOpen(false);

  const id = jwt_decode (localStorage.getItem("token")).id
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/address/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData (res.data.data)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
        <FormControl align={'left'}>
          <Flex justifyContent={"space-between"}>
            <Text fontWeight={"bold"}>Address</Text>
            <Button size={"xs"} variant={"ghost"} textColor={"green"} onClick={openAddAddressModal}>
              Add New Address
            </Button>
          </Flex>
            <AddNewAddress
              isOpen={isAddAddressModalOpen}
              onClose={closeAddAddressModal}
            />
            {userData.map((item)=>(
          <Box>
          <Text fontWeight={"hairline"}>Label Address</Text>
          <Text>{item.userName}</Text>
          <Text fontWeight={"hairline"}>Full Address</Text>
          <Text>
            {item.userAddress}
          </Text>
          <Divider />
          <Flex>
            <Button size={"xs"} variant={"ghost"} textColor={"green"} onClick={openEditAddressModal}>
              Edit
            </Button>
            <Button size={"xs"} variant={"ghost"} textColor={"red"} onClick={openDeletedAddressModal}>
              Delete
            </Button>
            <Button size={"xs"} variant={"ghost"} textColor={"green"}>
              Set as main Address
            </Button>
          </Flex>
          <Divider />
          </Box> 
            ))}
            <EditAddress
              isOpen={isEditAddressModalOpen}
              onClose={closeEditAddressModal}
            />
            <DeletedAddress
             isOpen={isDeletedAddressModalOpen}
             onClose={closeDeletedAddressModal}
            />
        </FormControl>
      </Stack>
    </Box>
  );
}
