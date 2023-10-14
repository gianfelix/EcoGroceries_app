import { Box, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import AdminManagement from "./AdminManagement";
import ProductManagement from "./ProductManagement";
import SalesReport from "./SalesReport";
import { useNavigate } from "react-router-dom";

import {
  FiUser,
  FiShoppingBag,
  FiGrid,
  FiBriefcase,
  FiPercent,
  FiLogOut,
} from "react-icons/fi";
import { GiBuyCard } from "react-icons/gi";
import { TbReportAnalytics } from "react-icons/tb";
import CategoryManagement from "./CategoryManagement";

import StockProductJKTManagement from "../AdminBranch/TokoJabodetabek/StockProductJKTManagement";
import StockProductYKManagement from "../AdminBranch/TokoYK/StockProductYKManagement";
import VoucherPromo from "../AdminBranch/TokoJabodetabek/VoucherPromo";
import TransactionOrder from "./TransactionOrder";

const AdminLandingSuper = () => {
  const [activePage, setActivePage] = useState("product");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const renderpage = () => {
    switch (activePage) {
      case "admin":
        return <AdminManagement />;
      case "product":
        return <ProductManagement />;
      case "category":
        return <CategoryManagement />;
      case "stockJKT":
        return <StockProductJKTManagement />;
      case "stockYK":
        return <StockProductYKManagement />;
      case "voucher-promo":
        return <VoucherPromo />;
      case "transactionOrder":
        return <TransactionOrder />;
      case "report":
        return <SalesReport />;

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
                  Admin Super Dashboard
                </Text>
              </Box>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("admin")}
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
                    as={FiUser}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Admin Management
                  </Text>
                </Box>
              </Link>
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
                onClick={() => setActivePage("stockJKT")}
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
                    color={"whatsapp.400"}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Stock & Discount JKT Management
                  </Text>
                </Box>
              </Link>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("stockYK")}
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
                    color={"whatsapp.200"}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Stock & Discount YK Management
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
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => handleLogout()}
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
                    as={FiLogOut}
                    w={{ base: 4, md: 6 }}
                    h={{ base: 4, md: 6 }}
                  />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Sign Out
                  </Text>
                </Box>
              </Link>
            </VStack>
          </Box>
          <Box w={"full"}>
            <Box w={"100%"} h={"59px"} bg={"teal.300"} d></Box>

            {renderpage()}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AdminLandingSuper;
