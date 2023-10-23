import React, { useState, useEffect } from 'react';
import {  Text, Image, Button, VStack, Grid, HStack } from "@chakra-ui/react";
import axios from 'axios';
import { useToast } from "@chakra-ui/react";

const CartItems = ({ data, onRemove }) => {
  const [quantity, setQuantity] = useState(data.qty);
  const [tempQuantity, setTempQuantity] = useState(data.qty);
  const toast = useToast(); // Initialize Chakra UI toast
  const token = localStorage.getItem('token');

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
    if (tempQuantity > 1) {
      setTempQuantity(tempQuantity - 1);
    }
  };

  const handleButtonClick = async () => {
    // Prepare the data to send in the request body
    const requestData = {
      stockId: data.id_stock,
      quantity: tempQuantity,
    };
    try {
      const response = await axios.post('https://jcwd011003.purwadhikabootcamp.com/api/user/cart', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Cart updated successfully', response.data);
      setQuantity(tempQuantity);
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemove = async () => {
    const itemId = data.id;
    try {
      const res = await axios.delete(`https://jcwd011003.purwadhikabootcamp.com/api/user/clean/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      toast({
        title: "Item Deleted",
        description: `Item ${itemId} has been successfully deleted.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onRemove(itemId);
      console.log('del', res)
    } catch (error) {
      toast({
        title: "Error Deleting Item",
        description: `An error occurred while deleting item ${itemId}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error('Error removing item:', error);
    }
  };

  useEffect(() => {
    console.log('tempQuantity:', tempQuantity);
  }, [tempQuantity]);

  return (
    <>
    <VStack 
      spacing={4}
      p={3}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      flexWrap="wrap"
      alignItems="flex-start"
    >
      <Grid 
        templateColumns="1fr 3fr"
        gap={4}
      >
        <Image src={`https://jcwd011003.purwadhikabootcamp.com/api/${data.Stock.Product.productImg}`} boxSize="100px" objectFit="cover" />
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
     <Button colorScheme="red" onClick={handleRemove}>Remove</Button>
      </HStack>
    </VStack>
   </>
  );
};

export default CartItems;