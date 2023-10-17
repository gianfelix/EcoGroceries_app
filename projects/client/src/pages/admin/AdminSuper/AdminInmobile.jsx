import { Box, Flex, Icon, Link, Text } from "@chakra-ui/react";
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
  const [activePage, setActivePage] = useState("admin");
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

  const linkStyles = (page) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "2.5",
    backgroundColor: activePage === page ? "white" : "teal.800",
    color: activePage === page ? "teal.800" : "white",
    transition: "background-color 0.9s, color 0.9s", // Add transition for smooth effect
    "&:hover": {
      backgroundColor: "white",
      color: "teal.800",
    },
  });

  return (
    <>
      <Flex flexDir={"column"}>
        <Box w={{ base: "100%", md: "26%" }} bg={"teal.800"} color="white">
          <Box w={"full"} bg={"teal"} textAlign={"center"}>
            <Text fontSize={{ base: "2xl", md: "18" }} fontWeight="bold" p="4">
              Admin Super Dashboard
            </Text>
          </Box>
          <Box align={"center"}>
            <Link as={"button"} onClick={() => setActivePage("admin")}>
              <Box {...linkStyles("admin")}>
                <Icon as={FiUser} boxSize={"5"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("product")}>
              <Box {...linkStyles("product")}>
                <Icon as={FiShoppingBag} boxSize={"5"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("category")}>
              <Box {...linkStyles("category")}>
                <Icon as={FiGrid} boxSize={"5"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("stockJKT")}>
              <Box {...linkStyles("stockJKT")}>
                <Icon as={FiBriefcase} boxSize={"5"} color={"whatsapp.400"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("stockYK")}>
              <Box {...linkStyles("stockYK")}>
                <Icon as={FiBriefcase} boxSize={"5"} color={"whatsapp.200"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("voucher-promo")}>
              <Box {...linkStyles("voucher-promo")}>
                <Icon as={FiPercent} boxSize={"5"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("transactionOrder")}>
              <Box {...linkStyles("transactionOrder")}>
                <Icon as={GiBuyCard} boxSize={"5"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={() => setActivePage("report")}>
              <Box {...linkStyles("report")}>
                <Icon as={TbReportAnalytics} boxSize={"5"} />
              </Box>
            </Link>
            <Link as={"button"} onClick={handleLogout}>
              <Box {...linkStyles("logout")}>
                <Icon as={FiLogOut} boxSize={"5"} />
              </Box>
            </Link>
          </Box>
        </Box>
        <Box w={"full"}>{renderpage()}</Box>
      </Flex>
    </>
  );
};

export default AdminLandingSuper;
