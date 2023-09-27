import React, { useState, useEffect } from "react";
import { Box, Heading, Button, Flex } from "@chakra-ui/react";
import ListProduct from "../../../../components/admin/ListProduct";
import BtnCreateProductModal from "../../../../components/admin/BtnCreateProductModal";

const ProductYKManagement = () => {
  return (
    <Box p={4}>
      <Flex align={"center"} mb={4} gap={5}>
        <Heading>Product Management</Heading>
        <BtnCreateProductModal />
      </Flex>
      <ListProduct />
    </Box>
  );
};

export default ProductYKManagement;
