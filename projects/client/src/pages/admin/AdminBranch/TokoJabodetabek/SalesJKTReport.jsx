import React from 'react'
import { Box, Heading } from "@chakra-ui/react";
import TransactionGraphJkt from '../../../../components/admin/TransactionGraphJkt';
import TransactionListJkt from '../../../../components/admin/TransactionListJkt';
import TransactionReport from '../../../../components/admin/TransactionReport';

const SalesJKTReport = () => {
  return (
    <>
    <Box p={4}>
        <Heading mb={6}>Report Management</Heading>
        <Box>
          <TransactionGraphJkt />
        </Box>
        {/* <Box boxShadow={"lg"} mt={2}>
          <TransactionListJkt   />
        </Box> */}
        <Box boxShadow={"lg"} mt={2}>
          <TransactionReport/>
        </Box>
      </Box>
    </>
  )
}

export default SalesJKTReport