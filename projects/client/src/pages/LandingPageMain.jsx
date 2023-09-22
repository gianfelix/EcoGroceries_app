import { Box, Button, Heading } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import Testimonials from "../components/Testimonials";
import StepBuy from "../components/StepBuy";
import OurServices from "../components/OurServices";
import Category from "../components/Category";
import CaptionCarousel from "../components/CaptionCarousel";
import Navbar from "../components/Navbar";
import ProductLandingDef from "../components/ProductLandingDef";
import Footer from "../components/Footer";

const LandingPageMain = () => {
  const navigate = useNavigate();
  const checkAndNavigate = () => {
    // Check if there is a token in local storage
    const token = localStorage.getItem("token");
    if (token) {
      // Token exists, navigate to "/shop"
      navigate("/shop");
    } else {
      // Token doesn't exist, navigate to "/login"
      navigate("/login");
    }
  };

  return ( 
    <>
      <Box>
        <Navbar />
      </Box>

      <CaptionCarousel />

      <OurServices />

      <Category />

      {/* Products Section */}
      <Box py={8}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Our Products
        </Heading>
        <Box mb={6}>
          <ProductLandingDef />

          <Box textAlign="center">
            <Button colorScheme="teal" onClick={checkAndNavigate}>
              Show More Products
            </Button>
          </Box>
        </Box>

        <StepBuy />

        <Testimonials />
      </Box>
      <Box>
        <Footer/>
      </Box>
    </>
  );
};

export default LandingPageMain;
