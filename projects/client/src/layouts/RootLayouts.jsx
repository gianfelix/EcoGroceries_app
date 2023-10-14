import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  return ( 
    <Flex flexDirection="column" minHeight="100vh" align="stretch">
  <Box>
    <Navbar />
  </Box>
  <Box flex="1">
    <Outlet/>
  </Box>
  <Box>
    <Footer/>
  </Box>
</Flex>
  )
};

export default RootLayout;
