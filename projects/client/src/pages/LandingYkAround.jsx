import { Box, Heading, Text, Image } from "@chakra-ui/react";
import React from "react";

const LandingYkAround = () => {
  const imageUrl = "https://bappeda.jogjaprov.go.id/static/images/background/background.jpg";

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
        Selamat Datang di Toko Daerah Istimewa Yogyakarta
      </Heading>
      <Image
        src={imageUrl}
        alt="Daerah Istimewa Yogyakarta"
        maxW="600px"
        boxShadow="lg"
        rounded="lg"
        mb="6"
      />
      <Text fontSize="lg" textAlign="center">
        Temukan keindahan dan budaya istimewa Yogyakarta melalui produk kami.
        Dari kerajinan tangan hingga kuliner khas, semuanya ada di sini.
      </Text>
      <Text
        fontSize="sm"
        mt="6"
        color="gray.600"
        textAlign="center"
      >
        Jl. Contoh No. 123, Yogyakarta | Telepon: (123) 456-7890
      </Text>
    </Box>
  );
};

export default LandingYkAround;
