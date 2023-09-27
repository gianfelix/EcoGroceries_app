import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import ListProduct from "../../../components/admin/ListProduct";
import BtnCreateProductModal from "../../../components/admin/BtnCreateProductModal";

const ProductManagement = () => {
  return (
    <>
      <Box p={4}>
        <Flex align={"center"} mb={4} gap={5}>
          <Heading>Product Management</Heading>
          <BtnCreateProductModal />
        </Flex>
        <ListProduct />
      </Box>
    </>
  );
};

export default ProductManagement;
