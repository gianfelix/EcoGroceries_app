import React, { useState, useRef, useEffect } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import { RiImageEditFill } from "react-icons/ri";
import PersonalData from "../../components/user/PersonalData";
import Address from "../../components/user/Address";
import HistoryOrder from "../../components/user/HistoryOrder";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2"



export default function UserProfileEdit() {
  const [userData, setUserData] = useState({ name: '', avatar: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const inputRef = useRef(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) { // 1 MB
        // Menampilkan notifikasi bahwa file terlalu besar
        Swal.fire({
          icon: 'error',
          title: 'File too large😩',
          text: 'Avatar image must be less than 1 MB',
        });
      } else {
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImage(imageUrl);
        setIsEditing(false);
        setIsFileSelected(true);
      }
    }
  };
  

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: "Change avatar successfully!",
      showConfirmButton: false,
      timer: 3000
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: 'Please try again😩',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const handleAvatarBadgeClick = () => {
    inputRef.current.click();
  };

  // Helper function to format birthday
const formatBirthday = (birthday) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(birthday).toLocaleDateString('id-ID', options);
  return formattedDate;
};


  const updateAvatar = async () => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', inputRef.current.files[0]); 
      const response = await axios.patch('http://localhost:8000/api/profile/avatar', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSelectedImage(`http://localhost:8000/api/${response.data.data.avatar}`);
      setIsFileSelected(false);
      setIsEditing(false);
    } catch (error) {
      handleAlertSuccess();
      window.location.reload();
      // handleAlertError();
    } finally {
      setIsSubmitting(false);
    }
  };
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const { name, avatar, email, phone, gender, referral, birthday, referred_by } = res.data.data;
        const formattedBirthday = formatBirthday(birthday); // Format the birthday here
        setUserData({ name, avatar, email, phone, gender, referral, birthday: formattedBirthday, referred_by });
        setSelectedImage(`http://localhost:8000/api/${avatar}`);
      } catch (error) {
        // Handle errors
      }
    };
  
    fetchUserData();
  }, []);
  
  

  return (
    <Box>
      <Navbar />
      <Flex
        minH={"100vh"}
        // align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        pt={'10'}
      >
        <Box
          spacing={2}
          w={"full"}
          maxW={"md"}
          minH={"xl"}
          maxH={"xl"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            align={"center"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl" }}
          >
            User Profile Edit
          </Heading>
          <FormControl id="avatar">
            <FormLabel></FormLabel>
            <Center>
              <Avatar size="2xl" src={selectedImage}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="teal"
                  aria-label={isEditing ? "Upload Image" : "Edit Image"}
                  icon={isEditing ? null : <RiImageEditFill />}
                  onClick={isEditing ? undefined : handleAvatarBadgeClick}
                />
              </Avatar>
            </Center>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <Center pt={"3"}>
              {!isFileSelected ? (
                <></>
              ) : (

              <Button
                colorScheme="white"
                color={"blue.500"}
                size="xs"
                variant={"outline"}
                width={["30%", "25%"]}
                disabled={!isFileSelected && !isEditing}
                onClick={() => {
                  updateAvatar();
                  setIsFileSelected(false); // Hide the "Save" button after clicking
                }}
              >
              {isSubmitting ? "Loading..." : "Save"}
              </Button>
              )}
            </Center>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Heading fontSize={{ base: "2xl", sm: "xl" }}>
              {userData.name}
              </Heading>
              {/* <Text>{userData.birthday}</Text>
              <Text>{userData.email}</Text>
              <Text>{userData.phone}</Text> */}
              {/* <Text>{userData.referral}</Text>
              <Text>{userData.referred_by}</Text> */}
            </Box>

          </FormControl>
        </Box>

        <Box
          spacing={2}
          w={"full"}
          maxW={"xl"}
          minH={"xl"}
          maxH={"xl"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Tabs variant="enclosed" pt={"1"}>
            <TabList borderColor={"black"} justifyContent="center">
              <Tab>Personal Data</Tab>
              <Tab>Your Address</Tab>
              <Tab>History Order</Tab>
              <Tab>Voucher</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PersonalData />
              </TabPanel>
              <TabPanel>
                <Address />
              </TabPanel>
              <TabPanel>
                <Box maxH="470px" overflowY="auto">
                  <HistoryOrder />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box maxH="470px" overflowY="auto">
                  <HistoryOrder />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Footer/>
    </Box>
  );
}
