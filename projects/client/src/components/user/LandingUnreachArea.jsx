import { Box, Heading, Button, Icon, Text } from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

const LandingUnreachArea = () => {
  const navigate = useNavigate();
  return (
    <Box
      pt={"10%"}
      pb={"10%"}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      background="linear-gradient(to bottom, #F6F6F6, #EDEDED)"
    >
      <Box
        textAlign="center"
        bg={"white"}
        p={8}
        borderRadius="lg"
        boxShadow="xl"
      >
        <Heading fontSize="2xl" mb="4" color="teal.600">
          Oops, We Can't Reach Your Area
        </Heading>
        <Text fontSize="lg" mb="4" color="gray.600">
          We're sorry, but currently, our store doesn't deliver to your
          location.
        </Text>
        <Text fontSize="lg" mb="4" color="gray.600">
          Please check back later or contact our customer service for
          assistance.
        </Text>
        <Button
          leftIcon={<Icon as={FaPhone} />}
          colorScheme="teal"
          variant="solid"
          mt="4"
          onClick={() => alert("Customer service number: 081234567890")}
        >
          Contact Customer Service
        </Button>
        <Button
          ml={5}
          colorScheme="teal"
          variant="outline"
          mt="4"
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </Box>
    </Box>
  );
};

export default LandingUnreachArea;
