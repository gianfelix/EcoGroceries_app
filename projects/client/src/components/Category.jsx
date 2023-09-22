import {
  Badge,
  Box,
  Center,
  Heading,
  Image,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";

const Category = () => {
  return (
    <Box py={8} bg="white">
      <Heading as="h2" size="xl" textAlign="center" mb={4}>
        Categories
      </Heading>
      <Wrap justify="center" spacing={8}>
        <WrapItem>
          <Center
            bg="teal.200"
            w={{ base: "140px", md: "200px" }} // Adjust the width based on screen size
            h={{ base: "140px", md: "200px" }} // Adjust the height based on screen size
            borderRadius="lg"
            _hover={{ bg: "teal.400", transform: "scale(1.1)" }}
          >
            <VStack spacing={1}>
              <Image src="vegetable.png" alt="Category 1" boxSize="80px" />
              <Badge colorScheme="teal" fontSize={{ base: "lg", md: "xl" }}>
                Vegetables
              </Badge>
            </VStack>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center
            bg="teal.200"
            w={{ base: "140px", md: "200px" }} // Adjust the width based on screen size
            h={{ base: "140px", md: "200px" }} // Adjust the height based on screen size
            borderRadius="lg"
            _hover={{ bg: "teal.400", transform: "scale(1.1)" }}
          >
            <VStack spacing={1}>
              <Image src="fruits.png" alt="Category 2" boxSize="80px" />
              <Badge colorScheme="teal" fontSize={{ base: "lg", md: "xl" }}>
                Fruits
              </Badge>
            </VStack>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center
            bg="teal.200"
            w={{ base: "140px", md: "200px" }} // Adjust the width based on screen size
            h={{ base: "140px", md: "200px" }} // Adjust the height based on screen size
            borderRadius="lg"
            _hover={{ bg: "teal.400", transform: "scale(1.1)" }}
          >
            <VStack spacing={1}>
              <Image src="proteins.png" alt="Category 3" boxSize="80px" />
              <Badge colorScheme="teal" fontSize={{ base: "lg", md: "xl" }}>
                Meat & Fish
              </Badge>
            </VStack>
          </Center>
        </WrapItem>
        <WrapItem>
          <Center
            bg="teal.200"
            w={{ base: "140px", md: "200px" }} // Adjust the width based on screen size
            h={{ base: "140px", md: "200px" }} // Adjust the height based on screen size
            borderRadius="lg"
            _hover={{ bg: "teal.400", transform: "scale(1.1)" }}
          >
            <VStack spacing={1}>
              <Image src="dairy.png" alt="Category 4" boxSize="80px" />
              <Badge colorScheme="teal" fontSize={{ base: "lg", md: "xl" }}>
                DAIRY
              </Badge>
            </VStack>
          </Center>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

export default Category;
