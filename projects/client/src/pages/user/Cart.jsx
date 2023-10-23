import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, VStack, Button, Box, Heading ,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,} from "@chakra-ui/react";
import CartItems from '../../components/user/CartItems';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartData, setCartData] = useState([]);
  const [cartEmpty, setCartEmpty] = useState(false)
  const [error, setError] = useState(null);
  const [unpaidTransaction, setUnpaidTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = localStorage.getItem('token');
  const navigateToCheckout = () => {
    navigate('/checkout');
  }

  const resetCart = async () => {
    // You can make your API delete request here.
    // Replace 'yourApiEndpoint' with the actual API endpoint.
    try {
      const url = 'https://jcwd011003.purwadhikabootcamp.com/api/user/cart';
      const config = {
        method: 'PATCH',
        url: url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios(config);
      setCartData([])
    console.log('data',cartData)
    // You can handle the response here if needed
    console.log('Item removed successfully:', response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      // Handle errors, e.g., show an error message
    }

    onClose();
  };
  useEffect(() => {
    // Retrieve token from local storage
   
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jcwd011003.purwadhikabootcamp.com/api/user/items', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.data.message === 'you have unpaid transaction') {
          setUnpaidTransaction(response.data);
        } else {
          setCartData(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Set loading to false after API call is complete
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Add code here to update the component when cartData changes
    // For example, you can check if cartData is empty and update the component accordingly
    if (cartData.length === 0) {
      // Update the component state or perform any necessary actions
      // For example, you can set a flag to indicate that the cart is empty
      setCartEmpty(true);
    } else {
      setCartEmpty(false);
    }
  }, [cartData, cartEmpty]);
const removeItem = async () => {
  try {
    const url = 'https://jcwd011003.purwadhikabootcamp.com/api/user/cart';
    const config = {
      method: 'PATCH',
      url: url,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(config);
    setCartData([])
    console.log('data',cartData)
    // You can handle the response here if needed
    console.log('Item removed successfully:', response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error('Error removing item:', error.message);
  }
};

return (
  <VStack spacing={4} align="stretch">
      {isLoading ? (
        <Text>Loading...</Text> // Show a loading message while API call is being made
      ) : error ? (
      <Text color="red">Error: {error}</Text>
    ) : unpaidTransaction ? (
      <Box flex="1" p="4">
        <Heading as="h2" size="md" mb="2">
          You have an unpaid transaction, cancel or pay first to continue shopping
        </Heading>
        <Button colorScheme="teal" onClick={() => navigate('/payment')}>
          Go to Payment
        </Button>
        <Button colorScheme="teal" onClick={() => navigate('/UserProfile')}>
          Go to Profile
        </Button>
      </Box>
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
    {cartData.length > 0 && !unpaidTransaction && (
      <>
      <Button onClick={navigateToCheckout} colorScheme="teal">
        Go to Checkout
      </Button>
      <Button colorScheme="teal" onClick={onOpen}>
      Reset Cart
    </Button>
    </>
    )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to reset your cart?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={resetCart}>
              Yes
            </Button>
            <Button colorScheme="teal" onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  </VStack>
);
};

export default Cart;