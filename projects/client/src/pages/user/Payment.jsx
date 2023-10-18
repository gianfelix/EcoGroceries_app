import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Center, Input, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [paymentProof, setPaymentProof] = useState(null);
  const [trId, setTrId] = useState(0);
  const [paymentSent, setPaymentSent] = useState(false); // New state for payment confirmation
  const token = localStorage.getItem('token');
  const authorizationHeader = token ? `Bearer ${token}` : '';
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUnpaid = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/unpaid', {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        console.log('unpaid', response);
        setTrId(response.data.id);
      } catch (error) {
        console.error('error fetching unpaid transaction', error);
      }
    };
    fetchUnpaid();
  }, []);

  useEffect(() => {}, [trId]);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      setPaymentProof(URL.createObjectURL(file));
    }
  };

  const HandlePayment = async () => {
    try {
      const formData = new FormData();
      formData.append('payment', fileInputRef.current.files[0]);
      formData.append('trId', trId);

      const response = await axios.post('http://localhost:8000/api/user/payment', formData, {
        headers: {
          Authorization: authorizationHeader,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Set paymentSent to true when payment is successful
      setPaymentSent(true);

      // Delay navigation for 3 seconds
      setTimeout(() => {
        navigate('/UserProfile');
      }, 3000);

      console.log(response);
    } catch (error) {
      console.error('error fetching sending payment', error);
    }
  };

  return (
    <Box>
      {paymentSent ? (
        <Center>
          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Payment proof sent. Please wait for confirmation.
          </Text>
        </Center>
      ) : (
        <Center>
          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Upload Payment Proof
          </Text>
        </Center>
      )}
      <Center>
        <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} mt={4} />
      </Center>
      {paymentProof && (
        <Center>
          <Box maxW={{ base: "100%", md: "300px" }} maxH={{ base: "auto", md: "200px" }}>
            <Image src={paymentProof} alt="Payment Proof" maxW="100%" maxH="100%" />
          </Box>
        </Center>
      )}
      <Center>
        {paymentProof && !paymentSent && (
          <Button colorScheme="teal" mt={4} onClick={HandlePayment}>
            Confirm Payment
          </Button>
        )}
      </Center>
    </Box>
  );
}

export default Payment;
