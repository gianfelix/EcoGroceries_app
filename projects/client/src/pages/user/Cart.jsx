import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, VStack, Button  } from "@chakra-ui/react";
import CartItems from '../../components/user/CartItems';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const navigateToCheckout= () => {
      navigate('/checkout')
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
        setCartData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <VStack spacing={4} align="stretch"> {/* Use VStack for responsive alignment */}
    {error ? (
      <Text color="red">Error: {error}</Text>
    ) : (
      // Map through the cartData array and pass each element to CartItems component
      cartData.map((item) => (
        <CartItems key={item.id} data={item} />
      ))
    )}
     <Button onClick={navigateToCheckout} colorScheme="teal">Go to Checkout</Button>
  </VStack>
  );
};

export default Cart;
