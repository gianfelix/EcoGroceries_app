import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Search2Icon } from "@chakra-ui/icons";
import LoginButton from "./user/LoginButton";
import RegisterButton from "./user/RegisterButton";
import Profile from "./user/ProfileIcon";
import LOGO from "../../src/assets/EcoGroceriesApp_LogoOnly.png";



const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const handleLogin = () => {
    navigate("/");
  };

  const checkAndNavigate = () => {
    // Check if there is a token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, navigate to "/shop"
      navigate("/shop");
    } else {
      // Token doesn't exist, navigate to "/login"
      navigate("/login");
    }
  };

  const checkAndPackage = () => {
    // Check if there is a token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, navigate to "/package"
      navigate("/package");
    } else {
      // Token doesn't exist, navigate to "/login"
      navigate("/login");
    }
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      bg="teal.600"
      color="white"
      padding="1rem"
      boxShadow={"xl"}
    >
      <Flex align="center">
        <a href="/">
        <Image
          src={LOGO}
          // src="EcoGroceriesApp_LogoOnly.png"
          alt="EcoGroceries Logo"
          boxSize="50px"
          mr="1rem"
        />
        </a>
        <a href="/">
        <Text fontSize="xl" fontWeight="bold">
          EcoGroceries
        </Text>
        </a>
      </Flex>
      <Flex>
        <Link href="/" marginRight="1rem">
          Home
        </Link>
        <Link  onClick={checkAndNavigate} marginRight="1rem">
          Shop
        </Link>
        <Link onClick={checkAndPackage} marginRight="1rem">
          Package
        </Link>
        <Link href="/about" marginRight="1rem">
          About
        </Link>
        <Link href="/contact">Contact</Link>
        <InputGroup borderRadius={"full"} size="xs" ml={'3'}>
          <InputLeftElement
            pointerEvents="none"
            children={<Search2Icon color="white" />}
          />
          <Input
            type="text"
            color={'white'}
            placeholder="Search..."
            border="1px solid white"
            rounded={"full"}
          />
        </InputGroup>
      </Flex>
      <Box display="flex" alignItems="center">
        {token ? (
          <Profile />
        ) : (
          <>
            <LoginButton onLoginSuccess={handleLogin} />
            <RegisterButton />
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;