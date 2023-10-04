import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillCartCheckFill } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import CartModal from "./Cart"
import axios from "axios";



const Profile = () => {
  const [userData, setUserData] = useState({ name: '', avatar: '' });
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };
  
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = 'http://localhost:3000/';
  };

  useEffect (() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, avatar } = res.data.data;
        setUserData({ name, avatar });
      } catch (error) {
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box>
      <Flex
        align="center"
        w={"100%"}
      >
        <Flex ml={"5"}>
          <Flex>
            {/* Cart */}
            <Button variant="ghost" mr={3} _hover={'black'} >
              <BsFillCartCheckFill color="white" size={25} onClick={openCartModal} />
              <CartModal
                isOpen={isCartModalOpen}
                onClose={closeCartModal}
              />
            </Button>
            {/* Menu Profile */}
            <Menu>
              <MenuButton as={Button} size="sm" p={0} rounded="full" mt={"1"}>
                <Avatar size="sm" src={`http://localhost:8000/api/${userData.avatar}`} />
              </MenuButton>
              <MenuList
                zIndex={5}
                border="2px solid"
                borderColor={useColorModeValue("gray.700", "gray.100")}
                boxShadow="4px 4px 0"
              >
                <Box textColor={'black'}>
                  <Text ml={3} as='u' textColor={'black'} fontWeight="400" fontSize={'lg'}>Profile</Text>
                  <MenuItem>
                    <Link to="/UserProfile" align="start">
                      <Text fontWeight="300">{userData.name}</Text>
                    </Link>
                  </MenuItem>
                </Box>
                <MenuDivider />
                  <Text ml={3} as='u' textColor={'black'} fontWeight="400" fontSize={'lg'}>Setting</Text>
                <MenuItem textColor={'black'}>
                <Link to="/forgot-password">
                  <Text fontWeight="300">Forgot Password</Text>
                </Link>
                </MenuItem>
                <MenuItem textColor={'black'}>
                <Link to="/reset-password/:token">
                  <Text fontWeight="300">Reset Password</Text>
                </Link>
                </MenuItem>
                <MenuItem textColor={'black'}>
                <Link to="/changes-password">
                  <Text fontWeight="300">Change Password</Text>
                </Link>
                </MenuItem>
                <MenuDivider />
                <Link>
                  <MenuItem>
                    <Text
                      onClick={() => handleLogout()}
                      fontWeight="bold"
                      size={"md"}
                      textColor={'black'}
                    >
                      Sign Out
                    </Text>
                  </MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;

