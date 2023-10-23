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
  Text,
} from "@chakra-ui/react";

const TransactionListJkt = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const Token = localStorage.getItem("token");
        const response = await axios.get(
          "https://jcwd011003.purwadhikabootcamp.com/api/transaction/branch",
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
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
      <Box width="100%" overflowX="auto">
        <Text fontSize="2xl" fontWeight="bold">
          List of Transactions
        </Text>
        <Table variant="striped" colorScheme="teal" size={"sm"}>
          <Thead>
            <Tr>
              <Th textAlign={"center"}>No.</Th>
              <Th textAlign={"center"}>User</Th>
              <Th textAlign={"center"}>User Address</Th>
              <Th textAlign={"center"}>Total Price</Th>
              <Th textAlign={"center"}>Total Quantity</Th>
              <Th textAlign={"center"}>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={transaction.id}>
                <Td textAlign={"center"}>{index + 1}</Td>
                <Td textAlign={"center"}>{transaction.User.name}</Td>
                <Td textAlign={"center"}>{transaction.userAddress}</Td>
                <Td textAlign={"center"}>{transaction.totPrice}</Td>
                <Td textAlign={"center"}>{transaction.totQty}</Td>
                <Td textAlign={"center"}>
                  {new Date(transaction.createdAt).toLocaleDateString("id-ID", {
                    timeZone: "Asia/Jakarta",
                  })}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </VStack>
  );
};

export default TransactionListJkt;
