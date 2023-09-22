import React, { useState } from "react";
import jwt_decode from "jwt-decode"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";
import axios from "axios"

const AddNewAddress = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    userName: "",
    userProvince: "",
    userCity: "",
    userAddress: "",
    longitude: "",
    latitude: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const data = new FormData();
      data.append("userName", formData.userName);
      data.append("userProvince", formData.userProvince);
      data.append("userCity", formData.userCity);
      data.append("userAddress", formData.userAddress);
      data.append("longitude", formData.longitude);
      data.append("latitude", formData.latitude);

      const response = await axios.post(
        "http://localhost:8000/api/address",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("Address created successfully");
        console.log("Response Data:", response.data); 
        onClose();
      } else {
        console.error("Failed to create address");
        console.log("Response:", response.data);
      }
    } catch (error) {
      console.error("Error creating address:", error);
      if (error.response) {
        console.log("Response Status:", error.response.status);
        console.log("Response Data:", error.response.data);
      }
    }
  };

  return (
    <Box>
      <Modal blockScrollOnMount={false} isCentered isOpen={isOpen} onClose={onClose} size={{ base: "xs", sm: "sm"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size={{ base: "xs", sm: "sm"}}>Add New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl colSpan={[6, 3, null, 2]} >
              <FormLabel htmlFor="userName" size={{ base: "xs", sm: "sm"}}>Label Address</FormLabel>
              <Input
                type="text"
                name="userName"
                id="userName"
                autoComplete="userName"
                size={{ base: "xs", sm: "sm"}}
                onChange={handleChange}
                value={formData.userName}
              />
            </FormControl>

            <FormControl colSpan={[6, 3]} >
              <FormLabel htmlFor="userProvince" >Province</FormLabel>
              <Select
                id="userProvince"
                name="userProvince"
                autoComplete="userProvince"
                placeholder="Select option"
                size={{ base: "xs", sm: "sm"}}
                onChange={handleChange}
                value={formData.userProvince}
              >
                <option>United States</option>
              </Select>
            </FormControl>

            <FormControl colSpan={[6, 6, null, 2]}>
              <FormLabel htmlFor="userCity">City</FormLabel>
              <Select
                id="userCity"
                name="userCity"
                autoComplete="userCity"
                placeholder="Select option"
                size={{ base: "xs", sm: "sm"}}
                onChange={handleChange}
                value={formData.userCity}
              >
                <option>United States</option>
              </Select>
            </FormControl>

            <FormControl colSpan={[6, 3, null, 2]} >
              <FormLabel htmlFor="userAddress" size={{ base: "xs", sm: "sm"}}>Street Address</FormLabel>
              <Input
                type="text"
                name="userAddress"
                id="userAddress"
                autoComplete="subdistrict"
                size={{ base: "xs", sm: "sm"}}
                onChange={handleChange}
                value={formData.userAddress}
              />
            </FormControl>

            <FormControl colSpan={6}>
              <FormLabel htmlFor="longitude" size={{ base: "xs", sm: "sm"}}>Longitude</FormLabel>
              <Input
                type="text"
                name="longitude"
                id="longitude"
                autoComplete="longitude"
                size={{ base: "xs", sm: "sm"}}
                onChange={handleChange}
                value={formData.longitude}
              />
            </FormControl>

            <FormControl colSpan={[6, 3, null, 2]} size={{ base: "xs", sm: "sm"}}>
              <FormLabel htmlFor="latitude">Latitude</FormLabel>
              <Input
                type="text"
                name="latitude"
                id="latitude"
                autoComplete="latitude"
                size={{ base: "xs", sm: "sm"}}
                onChange={handleChange}
                value={formData.latitude}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} size={{ base: "xs", sm: "sm"}}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit} size={{ base: "xs", sm: "sm"}}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddNewAddress;
