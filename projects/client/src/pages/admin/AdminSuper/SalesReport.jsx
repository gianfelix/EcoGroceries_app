import React from 'react'
import { Box, Heading } from "@chakra-ui/react";
import TransactionGraph from '../../../components/admin/TransactionGraph';
import TransactionList from '../../../components/admin/TransactionList';
import TransactionReport from '../../../components/admin/TransactionReport';

const SalesReport = () => {
  return (
    <>
    <Box p={4}>
        <Heading mb={6}>Report Management</Heading>
        <Box>
          <TransactionGraph />
        </Box>
        <Box boxShadow={"lg"} mt={2}>
          <TransactionList   />
        </Box>
        {/* <Box>
          <TransactionReport/>
        </Box> */}
      </Box>
    </>
  )
}

export default SalesReport