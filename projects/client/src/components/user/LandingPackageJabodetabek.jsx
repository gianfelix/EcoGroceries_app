import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  Spacer,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const LandingPackageJabodetabek = () => {
  const imageUrl =
    "https://images.unsplash.com/photo-1555899434-94d1368aa7af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=3").then((response) => {
      setPackages(response.data);
    });
  }, []);

  return (
    <>
      <Box
        bgImage={`url(${imageUrl})`}
        bgSize="cover"
        bgPosition="center"
        minH="82vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
        pt="10px"
      >
        <Heading mt={20} fontSize="4xl" textAlign="center">
          Jabodetabek EcoGroceries
        </Heading>
        <Text fontSize="xl" mt={4} textAlign="center">
          Your One-Stop Shop for Eco-Friendly Products
        </Text>
        <SimpleGrid my={10} mx={10} columns={[1, 2, 3]} spacing={5}>
          {packages.map((packageData) => (
            <Box
              bg={"whiteAlpha.800"}
              key={packageData.id}
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              shadow="lg"
              align={"center"}
            >
              <Image src={packageData.image} alt="Package Image" maxH="200px" />
              <Text fontSize="xl" color={"black"} fontWeight="bold" mt="4">
                {packageData.title}
              </Text>
              <Text textAlign={"justify"} fontSize="md" color={"black"}>
                {packageData.description}
              </Text>
              <Flex align="center" mt="4">
                <Text fontSize="2xl" fontWeight="bold" color={"red"}>
                  {`$${packageData.price}`}
                </Text>
                <Spacer />
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={() => {
                    // Handle package purchase logic here
                  }}
                >
                  Buy Now
                </Button>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default LandingPackageJabodetabek;
