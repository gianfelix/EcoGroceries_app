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

const LandingPackageYK = () => {
  const imageUrl =
    "https://bappeda.jogjaprov.go.id/static/images/background/background.jpg";

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products?limit=6").then((response) => {
      setPackages(response.data);
    });
  }, []);

  return (
    <>
      <Box
        bgImage={`url(${imageUrl})`}
        bgSize="cover"
        bgPosition="center"
        minH="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="white"
        textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
        pt="10px"
      >
        <Heading mt={20} fontSize="4xl" textAlign="center">
          Yogyakarta EcoGroceries
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
                    window.location.href = `/package/${packageData.id}`;
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

export default LandingPackageYK;
