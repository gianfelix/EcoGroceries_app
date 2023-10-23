import { Box, Button, Flex, Text, Image, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent, useToast } from "@chakra-ui/react";

import  { useState, useEffect } from "react";
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom'
const token = localStorage.getItem("token");

const TransactionDetailsSuper = () => {
  const {id} = useParams;
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
const [modalImageUrl, setModalImageUrl] = useState("");
const [sendButtonVisible, setSendButtonVisible] = useState(true);
const toast = useToast()
    const tr = useLoaderData();
    console.log('tr', tr)
    
    useEffect(() => {
        
        setTransaction(tr)
        setStatus(tr.Transaction_Status.status)
        console.log('teh real',transaction)
    },[])
 

    const acceptOrder = async () => {
      try {
        // Make an API request to accept the order.
        // Assuming it updates the `id_status` to 3 for "Order Accepted"
        // Replace the URL and payload as per your API.
        // await axios.put(`/api/transaction/${transaction.id}`, { id_status: 3 });
  
        toast({
          title: "Order Accepted",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        // Assuming you want to change the button text after accepting
        // Update the transaction with the new status
        setTransaction({ ...transaction, id_status: 3 });
        setStatus('Processing')
      } catch (error) {
        console.error(error);
      }
    };
  
    if (!transaction) {
      return <div>Loading...</div>;
    }
    const cancelOrder = async () => {
      try {
        // const response = await axios.patch(`/api/transaction/cancel/${transaction.id}`);
        const result = await axios.patch(`/api/transaction/cancel/${transaction.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
        toast({
          title: "Order Canceled",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        // If the cancelation is successful, set the transaction status to 4.
        // This will hide the "Accept Order" and "Cancel Order" buttons.
        setTransaction({ ...transaction, id_status: 6 });

        setStatus('Cancelled');
      } catch (error) {
        console.error(error);
      }
    };

    const sendOrder = async () => {
      try {
        // Make an API request to send the order.
        // Add your custom logic here as needed.
        // Replace the URL and payload as per your API.
        // const response = await axios.post(`/api/send-order/${transaction.id}`, { /* your payload */ });
  
        // Example of custom logic after sending the order
        // if (response.data.success) {
          // Perform additional actions or show a success message.
          setSendButtonVisible(false);
          setStatus('Shipped')
          console.log('Order sent successfully.');
        // } else {
        //   // Handle error conditions if needed.
        //   console.error('Order sending failed.');
        // }
      } catch (error) {
        console.error(error);
      }
    };
  
  
    // Conditionally render the buttons based on the id_status
    let buttons;
    if (transaction.id_status === 2) {
      buttons = (
        <Flex direction="row" mt="4" justify="center">
          <Button colorScheme="teal" onClick={acceptOrder}>
            Accept Order
          </Button>
          <Button colorScheme="red" onClick={cancelOrder} ml="2">
            Cancel Order
          </Button>
        </Flex>
      );
    } else if (transaction.id_status === 3 && sendButtonVisible) {
      // If the status is 3 and sendButtonVisible is true, show "Send Order" button
      buttons = (
        <Flex direction="row" mt="4" justify="center">
          <Button colorScheme="teal" onClick={sendOrder}>
            Send Order
          </Button>
        </Flex>
      );
    }

  
  // if (!transaction) {
  //   return <div>Loading...</div>;
  // }
  const closeModal = () => {
    setIsModalOpen(false);
    setModalImageUrl(""); 
  };
  return (
    <Box
  border="1px"
  borderColor="gray.200"
  p="5"
  rounded="md"
  bg="white"
  maxWidth="500px"
  margin="auto"
>
  <Flex direction="row" align="center">
  <Image
  src={transaction.Transaction_Payment && transaction.Transaction_Payment.paymentProof
    ? `https://jcwd011003.purwadhikabootcamp.com/api/${transaction.Transaction_Payment.paymentProof}`
    : 'Unpaid transaction'
  }
  alt="Unpaid Transaction"
  boxSize="100px"
  cursor="pointer" 
  onClick={() => {
    if (transaction.Transaction_Payment && transaction.Transaction_Payment.paymentProof) {
      setModalImageUrl(`https://jcwd011003.purwadhikabootcamp.com/api/${transaction.Transaction_Payment.paymentProof}`);
      setIsModalOpen(true);
    }
  }}
/>

    <Flex direction="column" ml="4">
  <Text>
    <strong>ID:</strong> {transaction.id}
  </Text>
  <Text>
    <strong>User:</strong> {transaction.id_user}
  </Text>
  <Text>
    <strong>User Address:</strong> {transaction.userAddress}
  </Text>
  <Text>
    <strong>Branch ID:</strong> {transaction.id_branch}
  </Text>
  <Text>
    <strong>Total Price:</strong> {transaction.totPrice}
  </Text>
  <Text>
    <strong>Total Price Discount:</strong> {transaction.totPriceDiscount}
  </Text>
  <Text>
    <strong>Total Quantity:</strong> {transaction.totQty}
  </Text>
  <Text>
    <strong>Total Weight:</strong> {transaction.totWeight}
  </Text>
  <Text>
    <strong>Shipper:</strong> {transaction.shipper}
  </Text>
  <Text>
    <strong>Shipping Method:</strong> {transaction.shippingMethod}
  </Text>
  <Text>
    <strong>Shipping Cost:</strong> {transaction.shippingCost}
  </Text>
  <Text>
    <strong>Shipping Cost Discount:</strong> {transaction.shippingCostDiscount}
  </Text>
  <Text>
    <strong>Status:</strong> {status}
  </Text>
</Flex>
  </Flex>
  <Flex direction="row" mt="4" justify="center">
  {/* {buttons} */}
  </Flex>
  <Table variant="simple" mt="4">
    <Thead>
      <Tr>
        <Th>Product Name</Th>
        <Th>Quantity</Th>
        <Th>Weight</Th>
        <Th>Discount</Th>
      </Tr>
    </Thead>
    <Tbody>
      {transaction.Transaction_Stocks.map((stock) => (
        <Tr key={stock.id}>
          <Td>{stock.productName || 'N/A'}</Td>
          <Td>{stock.qty}</Td>
          <Td>{stock.weight}</Td>
          <Td>{stock.discount || 0}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
  <Modal isOpen={isModalOpen} onClose={closeModal}>
  <ModalOverlay />
  <ModalContent>
    <Image src={modalImageUrl} alt="Payment Proof" maxW="100%" maxH="100%" />
  </ModalContent>
</Modal>
</Box>
  );
};

export default TransactionDetailsSuper;

export const currentTransactionSuperLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(`https://jcwd011003.purwadhikabootcamp.com/api/transaction/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

    return res.json();
}
