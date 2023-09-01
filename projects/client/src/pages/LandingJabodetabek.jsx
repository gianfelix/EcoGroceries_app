import { Box, Heading, Text, Image } from "@chakra-ui/react";
import React from "react";

const LandingJabodetabek = () => {
  const jatimImageUrl =
    "https://media.istockphoto.com/id/181928587/id/foto/pemandangan-udara-puncak-gunung-di-kabut.jpg?b=1&s=612x612&w=0&k=20&c=1GTa4rGl9Ayf2Ov0Dg5goFnrTzsGYuFPJPqLyDh8GmQ=";

  return (
    <Box
      pt="100px"
      mt="100px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Heading
        as="h1"
        size="2xl"
        mb="4"
        textAlign="center"
        color="teal.500"
        fontWeight="bold"
      >
        Selamat Datang di Toko Jawa Timur
      </Heading>
      <Image
        src={jatimImageUrl}
        alt="Toko Jawa Timur"
        maxW="600px"
        boxShadow="lg"
        rounded="lg"
        mb="6"
      />
      <Text fontSize="lg" textAlign="center">
        Temukan keindahan alam dan budaya yang kaya di Jawa Timur. Nikmati
        produk unggulan dan pengalaman yang tak terlupakan.
      </Text>
      <Text fontSize="sm" mt="6" color="gray.600" textAlign="center">
        Jl. Contoh No. 123, Surabaya | Telepon: (123) 456-7890
      </Text>
    </Box>
  );
};

export default LandingJabodetabek;
