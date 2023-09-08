import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  Avatar,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaCartShopping, FaShoppingCart } from "react-icons/fa";
import LoginButton from "./user/LoginButton";
import RegisterButton from "./user/RegisterButton";
const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      bg="teal.600"
      color="white"
      padding="1rem"
      boxShadow={"xl"}
      //   px={10}
    >
      <Flex align="center">
        <Image
          src="EcoGroceriesApp_LogoOnly.png"
          alt="EcoGroceries Logo"
          boxSize="50px"
          mr="1rem"
        />
        <Text fontSize="xl" fontWeight="bold">
          EcoGroceries
        </Text>
      </Flex>
      <Box>
        <Link href="/" marginRight="1rem">
          Home
        </Link>
        <Link href="/shop" marginRight="1rem">
          Shop
        </Link>
        <Link href="/package" marginRight="1rem">
          Package
        </Link>
        <Link href="/about" marginRight="1rem">
          About
        </Link>
        <Link href="/contact">Contact</Link>
      </Box>
      <Box display="flex" alignItems="center">
        <LoginButton />
        <RegisterButton/>
      </Box>
    </Flex>
  );
};

export default Navbar;
