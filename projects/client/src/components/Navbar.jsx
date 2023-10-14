import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons"; 
import LoginButton from "./user/LoginButton";
import RegisterButton from "./user/RegisterButton";
import Profile from "./user/ProfileIcon";
import LOGO from "../../src/assets/EcoGroceriesApp_LogoOnly.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogin = () => {
    navigate("/");
  };

  const checkAndNavigate = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
  };

  const checkAndPackage = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/package");
    } else {
      navigate("/login");
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      bg="teal.600"
      color="white"
      padding="1rem"
      boxShadow={"xl"}
      sx={{
        '@media (min-width: 768px)': {
          px: '20',
        },
      }}
    >
      <Flex align="center" >
        <Image
          src={LOGO}
          alt="EcoGroceries Logo"
          boxSize="30px"
          mr="1rem"
        />
        <Text fontSize="xl" fontWeight="bold" >
          EcoGroceries
        </Text>
      </Flex>
      <Box display={{ base: "none", md: "flex" }}>
        <Link href="/" marginRight="1rem">
          Home
        </Link>
        <Link onClick={checkAndNavigate} marginRight="1rem">
          Shop
        </Link>
        <Link onClick={checkAndPackage} marginRight="1rem">
          Package
        </Link>
        <Link href="/about" marginRight="1rem">
          About
        </Link>
        <Link href="/contact">Contact</Link>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <IconButton
          icon={<HamburgerIcon />}
          onClick={toggleDrawer}
          aria-label="Open Menu"
          variant="ghost"
          color={'white'}
        />
        <Drawer placement="top" onClose={toggleDrawer} isOpen={isDrawerOpen}>
          <DrawerOverlay>
            <DrawerContent bg="rgba(255, 255, 255, 0.8)">
              <DrawerCloseButton />
              <DrawerHeader alignSelf={'center'}>Menu</DrawerHeader>
              <DrawerBody>
                <VStack >
                  <Link href="/" >
                    Home
                  </Link>
                  <Link onClick={checkAndNavigate} >
                    Shop
                  </Link>
                  <Link onClick={checkAndPackage}>
                    Package
                  </Link>
                  <Link href="/about">
                    About
                  </Link>
                  <Link href="/contact">
                    Contact
                  </Link>
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
      <Box display="flex" alignItems="center">
        {token ? <Profile /> : <><LoginButton onLoginSuccess={handleLogin} /><RegisterButton /></>}
      </Box>
    </Flex>
  );
};

export default Navbar;
