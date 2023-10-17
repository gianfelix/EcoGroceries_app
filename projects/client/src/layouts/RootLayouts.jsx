import { Outlet, useLocation } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isPathAdmin = location.pathname.includes('admin');

  return ( 
    <Flex flexDirection="column" minHeight="100vh" align="stretch">
      <Box>
        {!isPathAdmin && <Navbar />}
      </Box>
      <Box flex="1">
        <Outlet />
      </Box>
      <Box>
        {!isPathAdmin && <Footer />}
      </Box>
    </Flex>
  );
};

export default RootLayout;
