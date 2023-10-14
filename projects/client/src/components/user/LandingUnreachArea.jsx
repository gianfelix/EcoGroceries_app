import { Box, Heading, Button, Icon, Text, Flex } from "@chakra-ui/react";
import { FaPhone } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import YogyakartaArea from "./YogyakartaArea.jsx";
import JabodetabekArea from "./JabodetabekArea.jsx";

const LandingUnreachArea = () => {
  // const navigate = useNavigate();

  // const goToYogyakartaPage = () => {
  //   navigate("/shop/yk");
  // };

  // const goToJabodetabekPage = () => {
  //   navigate("/shop/jkt");
  // };

  return (
    <Box
      pt={"2%"}
      pb={"2%"}
      maxW={"container.lg"}
      mx="auto"
      alignItems="center"
      backgroundColor="#c4fff2"
    >
      <Box
        textAlign="center"
        bg={"white"}
        p={5}
        borderRadius="lg"
        boxShadow="xl"
      >
        <Heading fontSize="4xl" mb="1" color="teal.600">
          Coming Soon!
        </Heading>
        <Heading fontSize="xl" mb="2" color="teal.600">
          Our groceries will be available in your location
        </Heading>
        <Text fontSize="lg" mb="2" color="gray.600">
        Please select your address within our current service area or contact our customer service
        </Text>
        <Button
          leftIcon={<Icon as={FaPhone} />}
          colorScheme="teal"
          variant="solid"
          onClick={() => alert("Customer service number: 081234567890 (Wa only)")}
        >
          Contact Customer Service
        </Button>
        {/* <Button
          ml={5}
          colorScheme="teal"
          variant="outline"
          mt="4"
          onClick={goToYogyakartaPage}
        >
          Yogyakarta Groceries
        </Button>
        <Button
          ml={5}
          colorScheme="teal"
          variant="outline"
          mt="4"
          onClick={goToJabodetabekPage}
        >
          Jabodetabek Groceries
        </Button> */}
        {/* Display the store area maps */}

        <Flex justifyContent={"center"} gap={5} mt={2}>
          <Box w={"full"}>
            <Text fontWeight={"semibold"} color={"teal"}> Yogyakarta Area</Text>
            <YogyakartaArea />
          </Box>
          <Box w={"full"}>
            <Text fontWeight={"semibold"} color={"teal"}> Jabodetabek Area</Text>
            <JabodetabekArea />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default LandingUnreachArea;
