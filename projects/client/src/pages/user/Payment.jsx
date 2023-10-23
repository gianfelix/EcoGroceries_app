import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Center, Input, Text, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const [paymentProof, setPaymentProof] = useState(null);
  const [trId, setTrId] = useState(0);
  const token = localStorage.getItem('token');
  const authorizationHeader = token ? `Bearer ${token}` : '';
  const fileInputRef = useRef(null);
  const [successMessage, setSuccessMessage] = useState(null)
  const [noMessage, setNoMessage] = useState(null)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUnpaid = async () => {
      try {
        const response = await axios.get('https://jcwd011003.purwadhikabootcamp.com/api/user/unpaid', {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        console.log('unpaid', response);
        if (response.data) {
          setTrId(response.data.id);
        } else {
          setNoMessage("You have no unpaid transaction, start shopping now.");
        }
      } catch (error) {
        console.error('error fetching unpaid transaction', error);
      } finally {
        // Set loading to false when the request is done
        setLoading(false);
      }
    };
    fetchUnpaid();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  const handleFileChange = () => {
    const file = fileInputRef.current.files[0]; // Access the file from the ref
    if (file) {
      setPaymentProof(URL.createObjectURL(file));
    }
  };

  const HandlePayment = async () => {
    try {
      const formData = new FormData();
      formData.append('payment', fileInputRef.current.files[0]); // Use the ref to access the selected file
      formData.append('trId', trId);

      const response = await axios.post('https://jcwd011003.purwadhikabootcamp.com/api/user/payment', formData, {
        headers: {
          Authorization: authorizationHeader,
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response);

      setSuccessMessage('Thank you for your payment. It will be processed immediately.');

      // After 3 seconds, navigate to '/UserProfile'
      setTimeout(() => {
        navigate('/UserProfile');
      }, 3000);
    } catch (error) {
      console.error('error fetching sending payment', error);
    }
  };

  return (
    <>
      {noMessage ? (
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            You have no unpaid transaction, start shopping now.
          </Text>
          <Button colorScheme="teal" onClick={() => navigate('/shop')}>
            Start Shopping
          </Button>
        </Box>
      ) : (
        <>
          {successMessage ? (
            // Render the success message if it's available
            <Center>
              <Text fontSize="xl" fontWeight="bold" mt={4}>
                {successMessage}
              </Text>
            </Center>
          ) : (
            <>
              <Center>
                <Text fontSize="xl" fontWeight="bold" mt={4}>
                  Upload Payment Proof
                </Text>
              </Center>
              <Center>
                <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} mt={4} />
              </Center>
            </>
          )}
          {paymentProof && (
            <Center>
              <Box maxW={{ base: '100%', md: '300px' }} maxH={{ base: 'auto', md: '200px' }}>
                <Image src={paymentProof} alt="Payment Proof" maxW="100%" maxH="100%" />
              </Box>
            </Center>
          )}
          {paymentProof && !successMessage && (
            // Render the Confirm Payment button if successMessage is not set
            <Center>
              <Button colorScheme="teal" mt={4} onClick={HandlePayment}>
                Confirm Payment
              </Button>
            </Center>
          )}
        </>
      )}
    </>
  );

  
}

export default Payment;

{/* <Box> */}
{/* Render the message and shop button */}
{/* {noMessage !== null && (
<Box>
<Text fontSize="xl" fontWeight="bold">
You have no unpaid transaction, start shopping now.
</Text>
<Button colorScheme="teal" onClick={() => navigate('/shop')}>
Start Shopping
</Button>
</Box>
)} */}

// {successMessage ? (
//   // Render the success message if it's available
//   <Center>
//     <Text fontSize="xl" fontWeight="bold" mt={4}>
//       {successMessage}
//     </Text>
//   </Center>
// ) : (
//   <>
//   <Center>
//     <Text fontSize="xl" fontWeight="bold" mt={4}>
//       Upload Payment Proof
//     </Text>
//   </Center>
// <Center>
//   <Input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} mt={4} />
// </Center>
// </>
// )}
// {paymentProof && (
//   <Center>
//     <Box maxW={{ base: '100%', md: '300px' }} maxH={{ base: 'auto', md: '200px' }}>
//       <Image src={paymentProof} alt="Payment Proof" maxW="100%" maxH="100%" />
//     </Box>
//   </Center>
// )}
// {paymentProof && !successMessage && (
// // Render the Confirm Payment button if successMessage is not set
// <Center>
// <Button colorScheme="teal" mt={4} onClick={HandlePayment}>
// Confirm Payment
// </Button>
// </Center>
// )}
// </Box>
// );