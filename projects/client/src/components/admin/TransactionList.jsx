import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/transaction"
        );
        setTransactions(response.data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          List of Transactions
        </Text>
      <Box width="100%" maxH={"250px"} overflowY="auto">
        <Table variant="striped" colorScheme="teal" size={"sm"}>
          <Thead>
            <Tr>
              <Th textAlign={"center"}>ID</Th>
              <Th textAlign={"center"}>User ID</Th>
              <Th textAlign={"center"}>Total Price</Th>
              <Th textAlign={"center"}>Total Quantity</Th>
              <Th textAlign={"center"}>Status</Th>
              <Th textAlign={"center"}>Date </Th>
              {/* Add more table headers as needed */}
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td textAlign={"center"}>{transaction.id}</Td>
                <Td textAlign={"center"}>{transaction.User.name}</Td>
                <Td textAlign={"center"}>{transaction.totPrice}</Td>
                <Td textAlign={"center"}>{transaction.totQty}</Td>
                <Td textAlign={"center"}>
                  {transaction.Transaction_Status.status}
                </Td>
                <Td textAlign={"center"}>
                  {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                    timeZone: "Asia/Jakarta",
                  })}
                </Td>
                {/* Add more table data cells as needed */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default TransactionList;
