import React from "react";
import TransactionList from "../../../../components/admin/TransactionList";
import { Box, Heading } from "@chakra-ui/react";
import TransactionGraph from "../../../../components/admin/TransactionGraph";

const SalesJKTReport = () => {
  return (
    <>
      <Box p={4}>
        <Heading mb={6}>Report Management</Heading>
        <Box>
          <TransactionGraph />
        </Box>
        <Box boxShadow={"lg"} mt={2}>
          <TransactionList />
        </Box>
      </Box>
    </>
  );
};

export default SalesJKTReport;
