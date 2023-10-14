import React from 'react';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';

const StepBuy = () => {
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 }); // Define the number of columns for different screen sizes

  return (
    <Box py={10} bg="teal.50">
      <Center>
        <Box maxW="800px" textAlign="center">
          <Heading as="h2" size="xl" mb={6}>
            How to Buy from EcoGroceries
          </Heading>
          <SimpleGrid columns={columns} spacing={10}>
            <StepCard
              number={1}
              title="Sign In or Sign Up"
              description="To start your shopping journey with EcoGroceries, you need to sign in to your account. If you don't have one, you can easily sign up for free."
            />
            <StepCard
              number={2}
              title="Browse Products"
              description="Explore our wide range of eco-friendly products. Use our search feature, filters, and categories to find the items you need."
            />
            <StepCard
              number={3}
              title="Add Products to Cart"
              description="Click on a product to view details and click 'Add to Cart' to start building your shopping cart."
            />
            {/* Add more steps as needed */}
          </SimpleGrid>
        </Box>
      </Center>
    </Box>
  );
};

const StepCard = ({ number, title, description }) => {
  return (
    <Flex direction="column" alignItems="center">
      <Box
        w="80px"
        h="80px"
        bg="teal.500"
        color="white"
        borderRadius="50%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb={4}
        fontWeight="bold"
        fontSize="xl"
      >
        {number}
      </Box>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text>{description}</Text>
    </Flex>
  );
};

export default StepBuy;
