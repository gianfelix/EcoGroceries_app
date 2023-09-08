import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";
import Products from "../Products";

const LandingJabodetabek = () => {
  const jabodetabekImageUrl =
    "https://images.unsplash.com/photo-1555899434-94d1368aa7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  return (
    <Flex
      // backgroundImage={`url(${jabodetabekImageUrl})`}
      // backgroundRepeat="repeat"      backgroundSize="contain"
      bg={"teal.400"}
      backgroundPosition="center"
      minHeight="100vh"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
      pt="100px"
    >
      <Heading fontSize="4xl" textAlign="center">
        Jabodetabek EcoGroceries
      </Heading>
      <Text fontSize="xl" mt={4} textAlign="center">
        Your One-Stop Shop for Eco-Friendly Products
      </Text>
      <Products />
    </Flex>
  );
};

export default LandingJabodetabek;
