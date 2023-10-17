import React from "react";
import {
  Box,
  Heading,
  Text,
  Container,
  VStack,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaInstagram, FaEnvelope, FaWhatsapp, FaTwitter } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>

      <Box py={10}>
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Heading as="h1" size="xl" textAlign="center">
              Contact Us
            </Heading>
            <Text fontSize="lg" textAlign="center">
              Have any questions or feedback? Feel free to reach out to us.
            </Text>
            <Box>
              <Input
                type="text"
                placeholder="Your Name"
                size="lg"
                borderRadius="md"
              />
            </Box>
            <Box>
              <Input
                type="email"
                placeholder="Your Email"
                size="lg"
                borderRadius="md"
              />
            </Box>
            <Box>
              <Textarea
                placeholder="Your Message"
                size="lg"
                borderRadius="md"
              />
            </Box>
            <Button colorScheme="teal" size="lg">
              Send Message
            </Button>
            <Text fontSize="lg" textAlign="center">
              Follow us on social media:
            </Text>
            <Box>
              <IconButton
                as={FaInstagram}
                size="lg"
                color="teal.600"
                aria-label="Instagram"
                mr={2}
                href="https://www.instagram.com/ecogroceries/"
                target="_blank"
              />
              <IconButton
                as={FaEnvelope}
                size="lg"
                color="teal.600"
                aria-label="Email"
                mr={2}
                href="mailto:contact@ecogroceries.com"
              />
              <IconButton
                as={FaWhatsapp}
                size="lg"
                color="teal.600"
                aria-label="WhatsApp"
                mr={2}
                href="https://wa.me/1234567890" // Replace with your WhatsApp number
                target="_blank"
              />
              <IconButton
                as={FaTwitter}
                size="lg"
                color="teal.600"
                aria-label="Twitter"
                href="https://twitter.com/ecogroceries/"
                target="_blank"
              />
            </Box>
          </VStack>
        </Container>
      </Box>

    </>
  );
};

export default Contact;
