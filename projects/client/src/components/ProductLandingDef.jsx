import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
  Flex,
  Grid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductLandingDef = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const formatCurrencyIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const checkAndNavigate = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/shop");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/stock")
      .then((response) => {
        const last4Products = response.data.data.slice(-6);
        setProducts(last4Products);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  return (
    <Center py={12}>
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(6, 1fr)" }}
        gap={4}
      >
        {products.map((product) => {
          return (
            <Box
              key={product.id}
              role={"group"}
              p={4}
              bg={"whiteAlpha.800"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
            >
              <Flex justifyContent={"center"} rounded={"lg"} mt={-8} pos={"relative"} height={{ base: 32, lg: 40 }}>
                <Image
                  rounded={"lg"}
                  height={{ base: 32, lg: 40 }}
                  width={{ base: 32, lg: 40 }}
                  objectFit={"cover"}
                  src={`http://localhost:8000/api/${product.Product.productImg}`}
                  alt={product.Product.name}
                />
              </Flex>
              <Stack pt={4} align={"center"}>
                <Heading
                  fontSize={"lg"}
                  fontFamily={"body"}
                  fontWeight={500}
                  color={"teal.600"}
                >
                  {product.Product.name}
                </Heading>
                <Stack align={"center"} justify={'center'}>
                  <Flex>
                    <Text fontWeight={800} fontSize={"md"} color={"teal"}>
                    {" "}
                      {formatCurrencyIDR(
                        product.Product.price -
                          (product.Product.price * product.discountPercent) /
                            100
                      )}
                    </Text>
                    <Text color={"red"} fontSize={"xs"}>{product.discountPercent}%</Text>
                  </Flex>
                  <Text textDecoration={"line-through"} color={"gray.600"} fontSize={"xs"}>
                    {formatCurrencyIDR(product.Product.price)}
                  </Text>
                </Stack>
                <Button colorScheme="teal" onClick={checkAndNavigate}>
                  Shop Now
                </Button>
              </Stack>
            </Box>
          );
        })}
      </Grid>
    </Center>
  );
};

export default ProductLandingDef;
