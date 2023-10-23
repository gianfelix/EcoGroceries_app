import {
  Badge,
  Box,
  Center,
  Heading,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://jcwd011003.purwadhikabootcamp.com/api/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const activeCategories = categories.filter((category) => category.isActive);

  return (
    <>
      <Box py={8} bg="white">
        <Heading as="h2" size="xl" textAlign="center" mb={8}>
          Categories
        </Heading>
        <Wrap justify="center" spacing={[4,8]} overflowY={['scroll','']} maxH={['210px','350']} maxW={['','1500px']}>
          {activeCategories.map((category) => (
            <WrapItem key={category.id}>
            <Center
              bg="teal.200"
              w={{ base: "120px", md: "200px" }} // Mengatur lebar sesuai dengan tampilan mobile (base) dan desktop (md)
              h={{ base: "50px", md: "80px" }}
              borderRadius="lg"
              _hover={{ bg: "teal.400", transform: "scale(1.1)" }}
            >
              <VStack spacing={1}>
                <Badge colorScheme="teal" fontSize={{ base: "sm", md: "xl" }}>
                  {category.category}
                </Badge>
              </VStack>
            </Center>
          </WrapItem>
          
          ))}
        </Wrap>
      </Box>
    </>
  );
};

export default Category;
