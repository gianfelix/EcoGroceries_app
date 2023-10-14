import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProductLandingDef = () => {
  const navigate = useNavigate();

  // Define the PRODUCTS array as a constant
  const PRODUCTS = [
    {
      name: "Apples",
      price: 15500,
      image: "images/apple.png",
    },
    {
      name: "Salmon",
      price: 81000,
      image: "images/salmon.png",
    },
    {
      name: "Spinach",
      price: 12000,
      image: "images/spinach.png",
    },
    {
      name: "Crab",
      price: 90000,
      image: "images/crab.png",
    },
  ];

  // Define a discount percentage
  // Taruh API disini
  const discountPercentage = 12; // 20% discount for example

  const formatCurrencyIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
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

  return (
    <Center py={12}>
      <Stack
        direction={{ base: "column", lg: "row" }} // Adjust direction based on screen size
        spacing={4}
        justify="center"
      >
        {PRODUCTS.map((product, index) => {
          // Calculate the discounted price
          const discountedPrice =
            product.price - (product.price * discountPercentage) / 100;

          return (
            <Box
              key={index}
              role={"group"}
              p={4}
              maxW={"250px"} /* Adjust the maximum width */
              w={{ base: "160px", lg: "250px" }} /* Adjust the width based on screen size */
              bg={"whiteAlpha.800"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
              // m={4}
            >
              <Flex justifyContent={"center"} rounded={"lg"} mt={-8} pos={"relative"} height={{ base: 32, lg: 40 }}>
                <Image
                  rounded={"lg"}
                  height={{ base: 32, lg: 40 }} /* Adjust the height */
                  width={{ base: 32, lg: 40 }} /* Adjust the width */
                  objectFit={"cover"}
                  src={product.image}
                  alt={`Product ${index}`}
                />
              </Flex>
              <Stack pt={4} align={"center"}>
                <Heading
                  fontSize={"lg"} /* Adjust the font size */
                  fontFamily={"body"}
                  fontWeight={500}
                  color={"teal.600"}
                >
                  {product.name}
                </Heading>
                <Stack align={"center"} justify={'center'}>
                  <Flex>
                    <Text fontWeight={800} fontSize={"md"} color={"teal"}> {/* Adjust the font size */}
                      {formatCurrencyIDR(discountedPrice)}
                    </Text>
                    <Text color={"red"} fontSize={"xs"}>{discountPercentage}%</Text> {/* Adjust the font size */}
                  </Flex>
                  <Text textDecoration={"line-through"} color={"gray.600"} fontSize={"xs"}>
                    {formatCurrencyIDR(product.price)}
                  </Text>
                </Stack>
                <Button colorScheme="teal" onClick={checkAndNavigate}>
                  Shop Now
                </Button>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Center>
  );
};

export default ProductLandingDef;
