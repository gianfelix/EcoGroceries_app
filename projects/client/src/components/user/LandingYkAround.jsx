import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import React from "react";
import Products from "../Products";

const LandingYkAround = () => {
  // const imageUrl =
  //   "https://bappeda.jogjaprov.go.id/static/images/background/background.jpg";

  return (
    <Box
      // bgImage={`url(${imageUrl})`}
      bg={"teal.400"}
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      color="white"
      textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
      pt="100px"
    >
      <Heading fontSize="4xl" textAlign="center">
        Yogyakarta EcoGroceries
      </Heading>
      <Text fontSize="xl" mt={4} textAlign="center">
        Your One-Stop Shop for Eco-Friendly Products
      </Text>
      <Products />
    </Box>
  );
};

export default LandingYkAround;
