import { Box, Heading, Button, Icon } from '@chakra-ui/react';
import { FaPhone } from 'react-icons/fa';
import React from 'react';

const LandingUnreachArea = () => {
  return (
    <Box
      p={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box textAlign="center" bg={"blue.100"} p={5}>
        <Heading fontSize="xl" mb="4">
          MAAF, AREA ANDA TIDAK TERJANGKAU TOKO
        </Heading>
        <p>Sayang sekali, saat ini toko kami tidak dapat melayani area Anda.</p>
        <p>Silakan cek kembali nanti atau hubungi layanan pelanggan kami.</p>
        <Button
          leftIcon={<Icon as={FaPhone} />}
          colorScheme="teal"
          variant="solid"
          mt="4"
        >
          Hubungi Layanan Pelanggan
        </Button>
      </Box>
    </Box>
  );
};

export default LandingUnreachArea;
