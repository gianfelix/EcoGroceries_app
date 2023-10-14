import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  Spinner,
  VStack,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import Footer from "../../components/Footer";

const DetailsProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <>
      <Box>
        <Navbar />
      </Box>
      <Center py={10} bg={"teal.400"}>
        <Box
          maxW="xl"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          p={6}
          align={"center"}
          bg={"whiteAlpha.800"}
        >
          <Flex mb={2}>
            <Button colorScheme="teal" onClick={() => window.history.back()}>
              <Icon as={FaArrowLeft} boxSize={6} />
              {/* Back to Shop */}
            </Button>
          </Flex>
          <Image
            src={product.image}
            alt={product.title}
            maxH="300px"
            objectFit="contain"
          />
          <Heading as="h2" size="xl" my={4}>
            {product.title}
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color="teal.500">
            Price: ${product.price}
          </Text>
          <Text fontSize="md" mt={4} textAlign={"justify"}>
            {product.description}
          </Text>
          <Flex justify="center" mt={3} gap={2}>
            <Button colorScheme="teal">-</Button>
            <Box p={2} bg="teal.200" borderRadius={"full"}>
              <Text>{product.quantity} [quantity] </Text>
            </Box>
            <Button colorScheme="teal">+</Button>
          </Flex>
          <Button colorScheme="teal" mt={2}>
            Add to Cart
          </Button>
        </Box>
      </Center>
      <Box>
        <Footer/>
      </Box>
    </>
  );
};

export default DetailsProducts;
