import { Text, Box } from "@chakra-ui/react";
import React from "react";
import Product from "../components/AllProduct";
import Corousels from "../components/Carousels";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <Box
      backgroundSize="cover" 
      height="100vh" 
      px={'8'}
      py={'5'}
    >
      {/* <Navbar /> */}

      <Box
      bgColor={'whiteAlpha.600'}
      backgroundSize='inherit' 
      height="300px" 
      // bgImg={"5213778.png"}
      rounded={'lg'}
      mt={'5'}
      >
        <Corousels/>
        <Box alignSelf={'center'} >
        <Text color={'white'} fontWeight={'bold'}>
          Order your <br/> Daily Groceries <br/> #Free Delivery
        </Text>
        </Box>
      </Box>
      <Box>
        <Product/>
      </Box>
    </Box>
  );
};

export default LandingPage;
