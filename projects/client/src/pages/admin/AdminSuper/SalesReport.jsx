import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import TransactionGraph from '../../../components/admin/TransactionGraph'
import TransactionList from '../../../components/admin/TransactionList'
import TotalSalesEachUser from '../../../components/admin/TotalSalesEachUser'

const SalesReport = () => {
  return (
    <>
    <Box p={4}>
        <Heading mb={6}>Report Management</Heading>
        <Box>
          <TransactionGraph />
        </Box>
        <Box>
          <TotalSalesEachUser/>
        </Box>
        <Box boxShadow={"lg"} mt={2}>
          <TransactionList   />
        </Box>
      </Box>
    </>
  )
}

export default SalesReport