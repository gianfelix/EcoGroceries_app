import React from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Button,
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

  return (
    <Center py={12}>
      {PRODUCTS.map((product, index) => {
        // Calculate the discounted price
        const discountedPrice =
          product.price - (product.price * discountPercentage) / 100;

        return (
          <>
            <Box
              key={index}
              role={"group"}
              p={6}
              maxW={"330px"}
              w={{ base: "200px", lg: "540px" }}
              bg={"whiteAlpha.800"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
              m={4}
            >
              <Box rounded={"lg"} mt={-12} pos={"relative"} height={{ base: 48, lg: 64 }}>
                <Image
                  rounded={"lg"}
                  height={{ base: 48, lg: 64 }}
                  width={{ base: 48, lg: 64 }}
                  objectFit={"cover"}
                  src={product.image}
                  alt={`Product ${index}`}
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Heading
                  fontSize={"2xl"}
                  fontFamily={"body"}
                  fontWeight={500}
                  color={"teal.600"}
                >
                  {product.name}
                </Heading>
                <Stack direction={"row"} align={"center"}>
                  <Box borderRadius={"lg"} bg={"gray.100"} color={"teal.600"}>
                    <Text color={"red"} fontSize={{base: "smaller", lg: "sm"}}>{discountPercentage}%</Text>
                  </Box>
                  <Text fontWeight={800} fontSize={{base: "lg", lg: "3xl"}} color={"teal"}>
                    Rp{discountedPrice} {/* Display discounted price */}
                  </Text>
                  <Text textDecoration={"line-through"} color={"gray.600"} fontSize={{base: "smaller", lg: "sm"}}>
                    Rp{product.price} {/* Display original price */}
                  </Text>
                </Stack>
                <Button colorScheme="teal" onClick={() => navigate("/shop")}>
                  Shop Now
                </Button>
              </Stack>
            </Box>
          </>
        );
      })}
    </Center>
  );
};

export default ProductLandingDef;
