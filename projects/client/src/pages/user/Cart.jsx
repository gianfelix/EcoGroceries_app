import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, VStack, Button, Box, Heading } from "@chakra-ui/react";
import CartItems from '../../components/user/CartItems';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const navigateToCheckout = () => {
    navigate('/checkout');
  }
  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/items', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data === null) {
          // Handle null data here
          setCartData([]); // Set an empty array to hide the cart items
        } else {
          setCartData(response.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

const removeItem = (itemId) => {
  // Create a new cartData array without the item to be removed
  const updatedCartData = cartData.filter((item) => item.id !== itemId);
  setCartData(updatedCartData);
};

  return (
    <VStack spacing={4} align="stretch">
      {error ? (
        <Text color="red">Error: {error}</Text>
      ) : cartData.length === 0 ? (
        <Box flex="1" p="4">
          <Heading as="h2" size="md" mb="2">
            Your cart is empty, start shopping here
          </Heading>
          <Button colorScheme="teal" onClick={() => navigate('/shop')}>
            Start Shopping
          </Button>
        </Box>
      ) : (
        cartData.map((item) => (
           <CartItems key={item.id} data={item} onRemove={removeItem} />
        ))
      )}
      {cartData.length > 0 && (
        <Button onClick={navigateToCheckout} colorScheme="teal">
          Go to Checkout
        </Button>
      )}
    </VStack>
  );
};

export default Cart;
