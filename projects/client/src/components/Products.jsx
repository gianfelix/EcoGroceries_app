import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const discountPercentage = 20;

  return (
    <Center px={20} py={12}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
        {products.map((product, index) => {
          // Access the product data from the API
          const name = product.title;
          const price = product.price;
          const image = product.image;

          // Calculate the discounted price
          const discountedPrice = price - (price * discountPercentage) / 100;

          return (
            <Box
              key={index}
              role={"group"}
              p={6}
              bg={"whiteAlpha.800"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
            >
              <Box
                rounded={"lg"}
                pos={"relative"}
                height={{ base: 48, lg: 64 }}
                align={"center"}
              >
                <Image
                  rounded={"lg"}
                  height={{ base: 48, lg: 64 }}
                  width={{ base: 48, lg: 64 }}
                  objectFit={"cover"}
                  src={image}
                  alt={`Product ${index}`}
                />
              </Box>
              <Stack pt={4} align={"center"}>
                <Heading
                  fontSize={"xl"}
                  fontFamily={"body"}
                  fontWeight={500}
                  color={"teal.600"}
                  textAlign={"center"}
                >
                  {name}
                </Heading>
                <Stack direction={"row"} align={"center"}>
                  <Box borderRadius={"lg"} bg={"gray.100"} color={"teal.600"}>
                    <Text color={"red"} fontSize={"sm"}>
                      {discountPercentage}%
                    </Text>
                  </Box>
                  <Text fontWeight={800} fontSize={"xl"} color={"teal"}>
                    Rp{discountedPrice}
                  </Text>
                  <Text
                    textDecoration={"line-through"}
                    color={"gray.600"}
                    fontSize={"sm"}
                  >
                    Rp{price}
                  </Text>
                </Stack>
                <Button
                  colorScheme="teal"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Buy Now
                </Button>
              </Stack>
            </Box>
          );
        })}
      </SimpleGrid>
    </Center>
  );
};

export default Products;
