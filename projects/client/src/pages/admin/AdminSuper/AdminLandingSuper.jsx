import { Box, Flex, Icon, Link, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import AdminManagement from "./AdminManagement";
import ProductManagement from "./ProductManagement";
import StockManagement from "./StockManagement";
import StatusOrderManagement from "./StatusOrderManagement";
import SalesReport from "./SalesReport";

import { GrUserAdmin } from "react-icons/gr";

const AdminLandingSuper = () => {
  const [activePage, setActivePage] = useState("admin");

  const renderpage = () => {
    switch (activePage) {
      case "admin":
        return <AdminManagement />;
      case "product":
        return <ProductManagement />;
      case "stockHistory":
        return <StockManagement />;
      case "status":
        return <StatusOrderManagement />;
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
                    as={GrUserAdmin}
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
                onClick={() => setActivePage("stockHistory")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Stock History Management
                  </Text>
                </Box>
              </Link>
              <Link
                as={"button"}
                colorScheme={"teal"}
                onClick={() => setActivePage("status")}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  p={"4"}
                  bg={"teal.800"}
                  _hover={{ bg: "teal.600" }}
                >
                  <Icon />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Status Management
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
                  <Icon />
                  <Text
                    fontSize={{ base: "lg", md: "18" }}
                    fontWeight="bold"
                    ml={2}
                  >
                    Sales Report Management
                  </Text>
                </Box>
              </Link>
            </VStack>
          </Box>
          <Box w={"full"} >
            <Box w={"100%"} h={"87px"} bg={"teal.300"} >

            </Box>
            {renderpage()}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AdminLandingSuper;
