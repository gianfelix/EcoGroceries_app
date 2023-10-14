import { Box, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

import ProductYKManagement from "./ProductYKManagement";
import CategoryYKManagement from "./CategoryYKManagement";
import StockProductYKManagement from "./StockProductYKManagement";
import VoucherPromo from "../TokoJabodetabek/VoucherPromo";
import TransactionOrderYK from "./TransactionOrderYK";
import SalesYKReport from "./SalesYKReport";
import { FiBriefcase, FiGrid, FiPercent, FiShoppingBag } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
import { GiBuyCard } from "react-icons/gi";

const AdminLandingYogyakarta = () => {
  const [activePage, setActivePage] = useState("product");

  const renderpage = () => {
    switch (activePage) {
      case "product":
        return <ProductYKManagement />;
      case "category":
        return <CategoryYKManagement />;
      case "stock":
        return <StockProductYKManagement />;
      case "transactionOrder":
        return <TransactionOrderYK />;
      case "voucher-promo":
        return <VoucherPromo />;
      case "report":
        return <SalesYKReport />;

      default:
        return null;
    }
  };

  return (
    <>
      <Box>
        <Flex flexDir={{ base: "column", md: "row" }}>
          <Box
            w={{ base: "100%", md: "26%" }}
            bg={"teal.800"}
            color="white"
            minH="100vh"
          >
            <VStack spacing="2" align="stretch">
              <Box w={"full"} bg={"teal"} textAlign={"center"}>
                <Text
                  fontSize={{ base: "2xl", md: "18" }}
                  fontWeight="bold"
                  p="4"
                >
                  Admin Yogyakarta Dashboard
                </Text>
              </Box>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("product")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon
                    as={FiShoppingBag}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Product Management
                  </Text>
                </Box>
              </Link>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("category")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon
                    as={FiGrid}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Category Management
                  </Text>
                </Box>
              </Link>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("stock")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon
                    as={FiBriefcase}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Stock & Discount Management
                  </Text>
                </Box>
              </Link>

              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("voucher-promo")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon
                    as={FiPercent}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Voucher & Promo Management
                  </Text>
                </Box>
              </Link>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("transactionOrder")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon
                    as={GiBuyCard}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Transaction Order Management
                  </Text>
                </Box>
              </Link>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("report")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon
                    as={TbReportAnalytics}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Report Management
                  </Text>
                </Box>
              </Link>
            </VStack>
          </Box>
          <Box w={"full"}>
            <Box w={"100%"} h={"87px"} bg={"teal.300"}></Box>
            {renderpage()}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AdminLandingYogyakarta;
