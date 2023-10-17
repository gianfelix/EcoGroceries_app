import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

const TransactionReport = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/transaction/branch",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
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
      <Heading fontSize="2xl" fontWeight="bold">
        Transactions List
      </Heading>
      <Box overflowY="scroll" maxHeight="270px">
      <Table variant="striped" colorScheme="teal">
        <Thead position={"sticky"} top={0} bgColor={"teal.300"}>
          <Tr>
            <Th color={"black"}>No.</Th>
            <Th color={"black"}>User</Th>
            <Th color={"black"}>Total Price</Th>
            <Th color={"black"}>Products</Th>
            <Th color={"black"}> Date </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, index) => (
            <Tr key={transaction.id}>
              <Td> {index + 1} </Td>
              <Td>{transaction.User.name}</Td>
              <Td>{transaction.totPrice}</Td>
              <Td>
                <VStack align="stretch">
                  {transaction.Transaction_Stocks.map((stock) => (
                    <Box
                      key={stock.id}
                      borderWidth="1px"
                      borderRadius="md"
                      p={2}
                      marginBottom={2}
                    >
                      <p>Product Name: {stock.productName}</p>
                      <p>Price: {stock.price}</p>
                      <p>Quantity: {stock.qty}</p>
                    </Box>
                  ))}
                </VStack>
              </Td>
              <Td>
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

export default TransactionReport;
