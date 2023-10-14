import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Select,
  Box,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2"


export default function PersonalData({updateUserData}) {
  const [submittingButton, setSubmittingButton] = useState(null);
  const [userData, setUserData] = useState({name: "", email: "", phone: "", gender: "", birthday: "",});
  const [isDataChanged, setIsDataChanged] = useState({name: false, email: false, phone: false, gender: false, birthday: false,}); 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, email, phone, gender, birthday } = res.data.data;
        setUserData({ name, email, phone, gender, birthday });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "birthday" && !isValidDate(value)) {
      alert("AGE MUST BE OVER 18 YEARS OLD");
      return;
    }
    if (userData[id] !== value) {
      setIsDataChanged((prevIsDataChanged) => ({
        ...prevIsDataChanged,
        [id]: true,
      }));
    }

    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) return false;

    const date = new Date(dateString);
    const currentDate = new Date();
    const minAgeDate = new Date(currentDate);
    minAgeDate.setFullYear(currentDate.getFullYear() - 18); 

    return date <= minAgeDate;
  };

  const handleSaveChanges = async (field, buttonId) => {
    try {
      setSubmittingButton(buttonId);
      const token = localStorage.getItem("token");
      const url = `http://localhost:8000/api/profile/${field}`;
      const data = {
        [field]: userData[field],
      };
      const confirmationResult = await Swal.fire({
        title: `Are you sure you want to save the changes on ${field}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "Cancel",
        customClass: {
          popup: "small-swal",
        },
      });
      
      if (!confirmationResult.isConfirmed) {
        window.location.reload();
      }
  
      if (confirmationResult.isConfirmed) {
        await axios.patch(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: `${field} saved successfully!`,
          showConfirmButton: false,
          timer: 3000,
        });
        setIsDataChanged((prevIsDataChanged) => ({
          ...prevIsDataChanged,
          [field]: false,
        }));
      }
      updateUserData({
        ...userData,
        [field]: userData[field],
      });
    } catch (error) {
      Swal.fire({
        title: 'Please try again😩',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    } finally {
      setSubmittingButton(null);
      setIsDataChanged(false);
    }
  };

  function formatDate(date) {
    if (!date) return ""; // Handle the case where date is empty or undefined
    const formattedDate = new Date(date).toISOString().substring(0, 10);
    return formattedDate;
  }

  return (
    <Box align={"center"} justify={"center"}>
      <Stack
        spacing={2}
        w={"full"}
        maxW={"xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        maxH={"500px"}
        overflowY={"scroll"}
      >
        <FormControl id="name" >
          <FormLabel>Name</FormLabel>
          <Flex gap={'2'}>
          <Input
            placeholder="name"
            size={'sm'}
            _placeholder={{ color: "gray.500" }}
            type="text"
            id="name"
            value={userData.name}
            onChange={handleInputChange}
            
          />
          <Button
            bg={"blue.400"}
            size={'sm'}
            w="20%"
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => handleSaveChanges("name", "nameButton")}
            isDisabled={!isDataChanged['name'] || submittingButton === "nameButton"}
          >
            {submittingButton === "nameButton" ? "Saving..." : "Save"}
          </Button>
          </Flex>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Flex gap={'2'}>
          <Input
            placeholder="email"
            size={'sm'}
            _placeholder={{ color: "gray.500" }}
            type="email"
            id="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <Button
            bg={"blue.400"}
            color={"white"}
            size={'sm'}
            w="20%"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => handleSaveChanges("email", "emailButton")}
            isDisabled={!isDataChanged['email'] || submittingButton === "emailButton"}
          >
            {submittingButton === "emailButton" ? "Saving..." : "Save"}
          </Button>
          </Flex>
        </FormControl>
        <FormControl id="phone">
          <FormLabel>Phone</FormLabel>
          <Flex gap={'2'}>
          <Input
            placeholder="phone"
            size={'sm'}
            _placeholder={{ color: "gray.500" }}
            type="text"
            id="phone"
            value={userData.phone}
            onChange={handleInputChange}
          />
          <Button
            bg={"blue.400"}
            color={"white"}
            size={'sm'}
            w="20%"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => handleSaveChanges("phone", "phoneButton")}
            isDisabled={!isDataChanged['phone'] || submittingButton === "phoneButton"}
          >
            {submittingButton === "phoneButton" ? "Saving..." : "Save"}
          </Button>
          </Flex>
        </FormControl>
        <FormControl id="gender">
          <FormLabel>Gender</FormLabel>
          <Flex gap={'2'}>
          <Select size={'sm'} id="gender" value={userData.gender} onChange={handleInputChange}>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </Select>
          <Button
            bg={"blue.400"}
            color={"white"}
            size={'sm'}
            w="20%"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => handleSaveChanges("gender", "genderButton")}
            isDisabled={!isDataChanged['gender'] || submittingButton === "genderButton"}
          >
            {submittingButton === "genderButton" ? "Saving..." : "Save"}
          </Button>
          </Flex>
        </FormControl>
        <FormControl id="birthday">
          <FormLabel>Birthdate</FormLabel>
          <Flex gap={'2'}>
          <Input
            type="date"
            id="birthday"
            size={'sm'}
            value={formatDate(userData.birthday)}
            onChange={handleInputChange}
          />
          <Button
            bg={"blue.400"}
            color={"white"}
            size={'sm'}
            w="20%"
            _hover={{
              bg: "blue.500",
            }}
            onClick={() => handleSaveChanges("birthday", "birthdayButton")}
            isDisabled={!isDataChanged['birthday'] || submittingButton === "birthdayButton"}
          >
            {submittingButton === "birthdayButton" ? "Saving..." : "Save"}
          </Button>
          </Flex>
        </FormControl>
      </Stack>
    </Box>
  );
}
