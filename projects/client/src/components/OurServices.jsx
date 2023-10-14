import React from "react";
import { Box, Heading, SimpleGrid, Flex, Text, Icon } from "@chakra-ui/react";
import { FaShoppingCart, FaRecycle, FaHeart } from "react-icons/fa";

const OurServices = () => {
  return (
    <Box py={10} px={10} bg="teal.50">
      <Heading as="h2" size="xl" textAlign="center" mb={8}>
        Our Services
      </Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8}>
        <ServiceCard
          title="Eco-Friendly Products"
          icon={<Icon as={FaHeart} boxSize={10} color="teal.500" />}
          description="Discover a wide range of eco-friendly and sustainable products to support a greener lifestyle."
        />
        <ServiceCard
          title="Easy Shopping"
          icon={<Icon as={FaShoppingCart} boxSize={10} color="teal.500" />}
          description="Enjoy a hassle-free shopping experience with user-friendly features and secure payment options."
        />
        <ServiceCard
          title="Recycling Program"
          icon={<Icon as={FaRecycle} boxSize={10} color="teal.500" />}
          description="Join our recycling program and contribute to a cleaner environment while earning rewards."
        />
      </SimpleGrid>
    </Box>
  );
};

const ServiceCard = ({ title, icon, description }) => {
  return (
    <Box
      _hover={{ bg: "teal.100", transform: "translateY(-5px)" }}
      p={6}
      borderWidth={1}
      borderRadius="md"
      borderColor="teal.200"
      shadow="md"
      bg="white"
    >
      <Flex align="center" justify="center" mb={4}>
        {icon}
      </Flex>
      <Heading as="h3" size="md" mb={2}>
        {title}
      </Heading>
      <Text color="gray.600">{description}</Text>
    </Box>
  );
};

export default OurServices;
