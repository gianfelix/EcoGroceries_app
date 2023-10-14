import React, { useState, useEffect } from 'react';
import { Box, Text, Image, Button, VStack, Grid, HStack } from "@chakra-ui/react";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

const CartItems = ({ data }) => {
  const [quantity, setQuantity] = useState(data.qty);
  const [tempQuantity, setTempQuantity] = useState(data.qty);
  const toast = useToast(); // Initialize Chakra UI toast

  const handleIncrement = () => {
    if (tempQuantity < data.Stock.qty) { // Check if stock quantity allows increment
      setTempQuantity(tempQuantity + 1);
    } else {
      // Show a toast message for exceeding stock
      toast({
        title: "No more stock",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleDecrement = () => {
    if (tempQuantity > 0) {
      setTempQuantity(tempQuantity - 1);
    }
  };

  const handleButtonClick = async () => {
    // Prepare the data to send in the request body
    const requestData = {
      stockId: data.id_stock,
      quantity: tempQuantity,
    };

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Make a PUT request to update the cart
    try {
      const response = await axios.post('http://localhost:8000/api/user/cart', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Check the response and handle success or any other logic
      console.log('Cart updated successfully', response.data);

      // Update the displayed quantity with the updated tempQuantity
      setQuantity(tempQuantity);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  useEffect(() => {
    console.log('tempQuantity:', tempQuantity);
  }, [tempQuantity]);

  return (
    <VStack // Use VStack to stack elements vertically
      spacing={4}
      p={3}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexWrap="wrap"
      alignItems="flex-start"
    >
      <Grid // Use a Grid to position image and text side by side
        templateColumns="1fr 3fr" // Adjust column ratio as needed
        gap={4}
      >
        <Image src={data.Stock.Product.image} boxSize="100px" objectFit="cover" />
        <Text
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.Stock.Product.name}
        </Text>
      </Grid>
      <Text mt="1">Quantity: {quantity}</Text>
      <Text mt="1">Total Price: {tempQuantity * parseFloat(data.Stock.Product.price)}</Text>
      <Text mt="1">Stock Left: {data.Stock.qty}</Text>
      <HStack spacing={2}>
        <Button onClick={handleDecrement}>-</Button>
        <Text display="inline-block" mx="2">{tempQuantity}</Text>
        <Button onClick={handleIncrement}>+</Button>
        <Button colorScheme="blue" onClick={handleButtonClick}>Update</Button>
      </HStack>
    </VStack>
  );
};

export default CartItems;
