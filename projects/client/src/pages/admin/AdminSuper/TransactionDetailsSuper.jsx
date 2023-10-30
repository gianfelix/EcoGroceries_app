import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  useToast,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useLoaderData, useParams } from "react-router-dom";

const TransactionDetailsSuper = () => {
  const token = localStorage.getItem("token");
  const [transaction, setTransaction] = useState(null);
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [sendButtonVisible, setSendButtonVisible] = useState(true);
  const toast = useToast();
  const tr = useLoaderData();
  const { id } = tr;
  console.log("id", id);
  console.log("tr", tr);

  useEffect(() => {
    setTransaction(tr);
    if (tr && tr.Transaction_Status) {
      setStatus(tr.Transaction_Status.status);
    }
    console.log("teh real", transaction);
  }, [tr]);

  const acceptOrder = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:8000/api/admin/confirm/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(result);
      toast({
        title: "Order Accepted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setTransaction({ ...transaction, id_status: 3 });
      setStatus("Processing");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Accepting Order",
        description: "An error occurred while accepting the order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (!transaction) {
    return <div>Loading...</div>;
  }
  const cancelOrder = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:8000/api/admin/cancel/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Order Canceled",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTransaction({ ...transaction, id_status: 6 });
      setStatus("Cancelled");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Accepting Order",
        description: "An error occurred while accepting the order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const sendOrder = async () => {
    try {
      const result = await axios.patch(
        `http://localhost:8000/api/admin/send/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Order Sent",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSendButtonVisible(false);
      setStatus("Shipped");
      console.log("Order sent successfully.");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error Accepting Order",
        description: "An error occurred while accepting the order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
    buttons = (
      <Flex direction="row" mt="4" justify="center">
        <Button colorScheme="teal" onClick={sendOrder}>
          Send Order
        </Button>
      </Flex>
    );
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
          src={
            transaction.Transaction_Payment &&
            transaction.Transaction_Payment.paymentProof
              ? `http://localhost:8000/api/${transaction.Transaction_Payment.paymentProof}`
              : "Unpaid transaction"
          }
          alt="Unpaid Transaction"
          boxSize="100px"
          cursor="pointer"
          onClick={() => {
            if (
              transaction.Transaction_Payment &&
              transaction.Transaction_Payment.paymentProof
            ) {
              setModalImageUrl(
                `http://localhost:8000/api/public/${transaction.Transaction_Payment.paymentProof}`
              );
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
            <strong>Total Price Discount:</strong>{" "}
            {transaction.totPriceDiscount}
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
            <strong>Shipping Cost Discount:</strong>{" "}
            {transaction.shippingCostDiscount}
          </Text>
          <Text>
            <strong>Status:</strong> {status}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="row" mt="4" justify="center">
        {/* {buttons} */}
      </Flex>
      {transaction.Transaction_Vouchers.length > 0 && (
        <Table variant="simple" mt="4">
          <Thead>
            <Tr>
              <Th>Voucher Name</Th>
              <Th>Type</Th>
              <Th>Discount Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transaction.Transaction_Vouchers.map((voucher) => (
              <Tr key={voucher.id}>
                <Td>{voucher.User_Voucher.Voucher.name || "N/A"}</Td>
                <Td>{voucher.User_Voucher.Voucher.details}</Td>
                <Td>{voucher.User_Voucher.Voucher.discountPrice}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
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
              <Td>{stock.productName || "N/A"}</Td>
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
          <Image
            src={modalImageUrl}
            alt="Payment Proof"
            maxW="100%"
            maxH="100%"
          />
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TransactionDetailsSuper;

export const currentTransactionSuperLoader = async ({ params }) => {
  const { id } = params;
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:8000/api/transaction/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
