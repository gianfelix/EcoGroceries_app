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
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function ProductDetail() {
  const bgColor = useColorModeValue("rgb(255,255,255, 0.9)", "gray.800");
  const { id } = useParams();
  const product = useLoaderData().data;
  console.log('product',product)
  const inCart = useLoaderData().qty;
  const {Product, Stock_Promo} = product
  const [discountPercent, setDiscountPercent] = useState(0); // Initialize as 0
  const [quantity, setQuantity] = useState(1); // Initialize quantity as 1
  const [stock, setStock] = useState(0);
  const [idStock, setIdStock] = useState(0)
  const token = localStorage.getItem("token"); // Get the token from local storage
  
  const toast = useToast();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    setDiscountPercent(product.discountPercent);
    setStock(product.qty)
    setQuantity(inCart)
    setIdStock(product.id)
  }, []);
useEffect(()=> {
console.log('idstock', idStock)
},[stock, idStock, quantity])
const handleAddToCart = () => {
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

  // Make the POST request to the API
  axios
    .post("https://jcwd011003.purwadhikabootcamp.com/api/user/cart", requestData, { headers })
    .then((response) => {
      if (response.data.message === "you have unpaid transaction" && response.data.value === false) {
        // Display a specific toast message for unpaid transaction
        toast({
          title: "You have unpaid transaction",
          description: "Please complete your unpaid transaction before adding items to your cart.",
          status: "warning", // You can choose an appropriate status
          duration: 3000, // Toast message duration in milliseconds
          isClosable: true,
          position: "top",
        });
      } else {
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
      }
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

  const handleDelete = () => {
    const requestData = {
      id_stock: idStock, // Assuming 'id_stock' is the correct property
    };
    console.log('req', requestData)
  
    try {
      axios
        .delete(`https://jcwd011003.purwadhikabootcamp.com/api/user/clean/${idStock}`, { headers })
        .then((response) => {
          setQuantity(0)
          // Handle success response here if needed
          console.log("Successfully deleted item:", response.data);
          // Display a success toast
          toast({
            title: "Item deleted",
            description: "The item has been successfully deleted.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        })
        .catch((error) => {
          // Handle error response here
          console.error("Error deleting item:", error);
  
          // Display an error toast
          toast({
            title: "Error",
            description: "An error occurred while deleting the item.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
        });
    } catch (error) {
      // Handle any exception that may occur during the request
      console.error("An error occurred:", error);
  
      // Display a general error toast
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  

  const numColumns = useBreakpointValue({ base: 1, sm: 1, md: 2, lg: 2, xl: 2 });
  return (
    <Box
bg={"teal.400"}
bgPosition="center"
// h="64vh"
display="flex"
flexDirection="column"
color="white"
textShadow="0px 2px 4px rgba(0, 0, 0, 0.5)"
>

<Flex mx={['5','20']} my={['5','10']}
//   w="full"
bg={bgColor}
boxShadow="md"
rounded="lg"
zIndex={1}
flexDirection={{ base: "column", md: "row" }}
>
<Box boxSize={{ base: "50%", md: "350px" }}>
  <Image
    src={`https://jcwd011003.purwadhikabootcamp.com/api/${Product?.productImg}`}
    alt={Product?.name}
  />
</Box>
<Box flex="2" p={[2,4]} maxW='xl' textColor={'black'} mt={{ base: 0, md: 0 }} ml={{ base: 2, md: 4 }}>
  <Heading fontSize={["md","xl"]}>{Product?.name}</Heading>
  <Text color="gray.500" fontSize={["xs","sm"]} mb={2}>
    {Product.Category?.category}
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
  <Text fontSize={["sm","lg"]}>Stock in your cart</Text>

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
  <Text color={"red"}>Stock left in shop: {stock}</Text>
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

  const res = await fetch(`https://jcwd011003.purwadhikabootcamp.com/api/stock/${id}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    },
  });

  return res.json();
}