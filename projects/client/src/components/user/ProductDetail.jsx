import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar";
import Footer from "../Footer";

export default function ProductDetail({ onAddToCart }) {
  const bgColor = useColorModeValue("rgb(255,255,255, 0.9)", "gray.800");
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qty, setqty] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0); 
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/stock/${id}`);
        const responseData = response.data.data;
        setProduct(responseData.Product);
        setqty(responseData.qty)
        setDiscountPercent(responseData.discountPercent);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  const formatPriceAsIDR = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return "";
    }

    const discountedPrice = product.price - (product.price * discountPercent) / 100;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(discountedPrice);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setQuantity(newValue);
    }
  };

  return (
    <Box
        bg={"teal.400"}
        bgSize="cover"
        bgPosition="center"
        minH="100vh"
        display="flex"
        flexDirection="column"
        color="white"
        textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
    >
      <Navbar />
      <Flex mx={['5','20']} my={['5','10']}
    //   w="full"
      bg={bgColor}
      boxShadow="md"
      rounded="lg"
      pos="relative"
      zIndex={1}
      flexDirection={{ base: "column", md: "row" }}
      >
        <Box boxSize={{ base: "50%", md: "350px" }}>
          <Image
            src={`http://localhost:8000/api/${product?.productImg}`}
            alt={product?.name}
          />
        </Box>
        <Box flex="2" p={[2,4]} maxW='xl' textColor={'black'} mt={{ base: 0, md: 0 }} ml={{ base: 2, md: 4 }}>
          <Heading fontSize={["md","xl"]}>{product?.name}</Heading>
          <Text color="gray.500" fontSize={["xs","sm"]}>
            {product.Category?.category}
          </Text>
          <Text color="red" fontSize={["xs","sm"]} mb={2}>
            Stock : {qty}
          </Text>
          <Flex>
            <Text fontWeight={800} fontSize={["md","xl"]} color={"teal"}>
              {formatPriceAsIDR(product.price)}
            </Text>
            <Text color={"red"} fontSize={"xs"}>
              {discountPercent}%
            </Text>
          </Flex>
          <Text
            textDecoration={"line-through"}
            color={"gray.600"}
            fontSize={"xs"}
          >
            {formatPriceAsIDR(product.price)}
          </Text>
          <Text fontSize={["sm","lg"]}>{product?.description}</Text>
          <Flex mt={4}>
            <Button onClick={decreaseQuantity} colorScheme="teal" size={['xs','sm']}>
              -
            </Button>
            <Input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              width="50px"
              textAlign="center"
              size={['xs','sm']}
              mx={'0.5'}
            />
            <Button onClick={increaseQuantity} colorScheme="teal" size={['xs','sm']}>
              +
            </Button>
          </Flex>
          <Flex mt={4}>
            <Button size={['sm','md']} onClick={handleAddToCart} colorScheme="teal">
              Add to Cart
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Footer />
    </Box>
  );
}
