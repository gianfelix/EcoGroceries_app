import { Box, Button, Flex, Text, Image, Table, Thead, Tbody, Tr, Th, Td, Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";

import  { useState, useEffect } from "react";
import axios from 'axios';
import { useLoaderData, useParams } from 'react-router-dom'
const token = localStorage.getItem("token");

const TransactionDetails = () => {
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

    const tr = useLoaderData();
    console.log('tr', tr)
    
    useEffect(() => {
        
        setTransaction(tr)
        console.log('teh real',transaction)
    },[])

  if (!transaction) {
    return <div>Loading...</div>;
  }
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
  src={`http://localhost:8000/api/${transaction.Transaction_Payment.paymentProof}`}
  alt="Payment Proof"
  boxSize="100px"
  cursor="pointer" 
  onClick={() => {
    setModalImageUrl(`http://localhost:8000/api/${transaction.Transaction_Payment.paymentProof}`);
    setIsModalOpen(true);
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
    <strong>Status:</strong> {transaction.Transaction_Status.status}
  </Text>
</Flex>
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

export default TransactionDetails;

export const currentTransactionLoader = async ({params}) => {
    const {id} = params;

    const res = await fetch(`http://localhost:8000/api/transaction/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
      })

    return res.json();
}

