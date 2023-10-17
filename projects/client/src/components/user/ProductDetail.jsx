import  { useState, useEffect } from "react";
import { useLoaderData, useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Input,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function ProductDetail() {
  const bgColor = useColorModeValue("rgb(255,255,255, 0.9)", "gray.800");
  const { id } = useParams();
  const product = useLoaderData().data;
  const inCart = useLoaderData().qty;
  const {Product, Stock_Promo} = product
  const [discountPercent, setDiscountPercent] = useState(0); // Initialize as 0
  const [quantity, setQuantity] = useState(1); // Initialize quantity as 1
  const [stock, setStock] = useState(0);
  const [qty, setqty] = useState(0);
  const toast = useToast();
  useEffect(() => {
    setDiscountPercent(product.discountPercent);
    setStock(product.qty)
    setQuantity(inCart)
  }, []);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token"); // Get the token from local storage

    // Check if token exists
    if (!token) {
      // Handle the case where the token is not available
      console.error("Token not found in local storage");
      return;
    }

    // Define the data to send in the request body
    const requestData = {
      stockId: id, // Replace with the actual stockId you want to send
      quantity: quantity,
    };

    // Define the headers with the Authorization token
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Make the POST request to the API
    axios
      .post("http://localhost:8000/api/user/cart", requestData, { headers })
      .then((response) => {
        // Handle success response here if needed
        console.log("Successfully added to cart:", response.data);

        // Display a success toast
        toast({
          title: "Item added to cart",
          description: "The item has been successfully added to your cart.",
          status: "success",
          duration: 3000, // Toast message duration in milliseconds
          isClosable: true,
          position: "top",
        });
      })
      .catch((error) => {
        // Handle error response here
        console.error("Error adding to cart:", error);

        // Display an error toast
        toast({
          title: "Error",
          description: "An error occurred while adding the item to your cart.",
          status: "error",
          duration: 3000, // Toast message duration in milliseconds
          isClosable: true,
          position: "top",    
        });
      });
  };

  const formatPriceAsIDR = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return "";
    }

    const discountedPrice = Product.price - (Product.price * discountPercent) / 100;

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(discountedPrice);
  };

  const increaseQuantity = () => {
    if (quantity < stock) { // Check if quantity is less than available stock
      setQuantity(quantity + 1);
    } else {
      // Display a toast when the user tries to add more than available stock
      toast({
        title: "No more stock",
        description: "The stock is exhausted. You can't add more to your cart.",
        status: "warning",
        duration: 3000, // Toast message duration in milliseconds
        isClosable: true,
        position: "top",
      });
    }
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
        display="flex"
        flexDirection="column"
        // h={''}
        >

        <Flex 
        mx={['5','20']} 
        my={['5','10']}
        bg={bgColor}
        boxShadow="md"
        rounded="lg"
        pos="relative"
        zIndex={1}
        flexDirection={{ base: "column", md: "row" }}
        >
        <Box boxSize={{ base: "50%", md: "350px" }}>
          <Image
            src={`http://localhost:8000/api/${Product?.productImg}`}
            alt={Product?.name}
          />
        </Box>
        <Box flex="2" p={[2,4]} maxW='xl' textColor={'black'} mt={{ base: 0, md: 0 }} ml={{ base: 2, md: 4 }}>
          <Heading fontSize={["md","xl"]}>{Product?.name}</Heading>
          <Text color="gray.500" fontSize={["xs","sm"]}>
            {Product.Category?.category}
          </Text>
          <Text color="red" fontSize={["xs","sm"]} mb={2}>
            Stock : {product.qty}
          </Text>
          <Flex>
            <Text fontWeight={800} fontSize={["md","xl"]} color={"teal"}>
              {formatPriceAsIDR(Product.price)}
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
            {formatPriceAsIDR(Product.price)}
          </Text>
          <Text fontSize={["sm","lg"]}>{Product?.description}</Text>
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
            //   variant='unstyled'
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
        </Box>

  );
}

export const productDetailsLoader = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem('token');

  const res = await fetch(`http://localhost:8000/api/stock/${id}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

  return res.json();
}
