import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  Link,
  Stack,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import {
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "@chakra-ui/icons";

const Footer = () => {
  return (
    <Box bg="teal.700" color="white">
      <Container maxW="container.lg" py={12}>
        <Stack
          spacing={6}
          direction={["column", "row"]}
          align="center"
          justify="space-between"
        >
          {/* Newsletter Signup */}
          <VStack align="flex-start">
            <Heading as="h3" size="lg">
              Subscribe to Our Newsletter
            </Heading>
            <Text>Get updates and exclusive offers!</Text>
            <Flex>
              <Input type="email" placeholder="Your email address" />
              <Button colorScheme="teal" ml={2}>
                Subscribe
              </Button>
            </Flex>
          </VStack>
          <Image
            src="EcoGroceriesApp.png"
            // bgSize={"cover"}
            // bgPosition={"center"}
            boxSize="125"
          />
          {/* Social Media Links */}
          {/* <Stack spacing={4} direction="row">
            <IconButton
              as={Link}
              href="#"
              aria-label="Facebook"
              icon={<FacebookIcon />}
              colorScheme="teal"
              size="lg"
            />
            <IconButton
              as={Link}
              href="#"
              aria-label="Twitter"
              icon={<TwitterIcon />}
              colorScheme="teal"
              size="lg"
            />
            <IconButton
              as={Link}
              href="#"
              aria-label="Instagram"
              icon={<InstagramIcon />}
              colorScheme="teal"
              size="lg"
            /> */}
          {/* </Stack> */}
        </Stack>

        {/* Copyright and Other Information */}
        <Flex
          mt={8}
          justify="space-between"
          direction={["column", "row"]}
          align="center"
        >
          <Text>
            &copy; {new Date().getFullYear()} EcoGroceries. All Rights Reserved.
          </Text>
          <Text>Privacy Policy | Terms of Service</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
