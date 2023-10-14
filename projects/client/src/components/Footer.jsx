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
import LOGO from "../../src/assets/EcoGroceriesApp.png";
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
          spacing={[3,6]}
          direction={["column", "row"]}
          align="center"
          justify="space-between"
        >
          <VStack align="flex-start">
            <Heading as="h3" size={["md","lg"]}>
              Subscribe to Our Newsletter
            </Heading>
            <Text>Get updates and exclusive offers!</Text>
            <Flex>
              <Input size={['sm','md']} type="email" placeholder="Your email address" />
              <Button w={['24','40']} colorScheme="teal" ml={2} size={['sm','md']} fontSize={'xs'}>
                Subscribe
              </Button>
            </Flex>
          </VStack>
          <Image
            src={LOGO}
            boxSize={["100","125"]}
          />
        </Stack>
        <Flex
          mt={[2,8]}
          justify="space-between"
          direction={["column", "row"]}
          align="center"
        >
          <Text fontSize={["xs","md"]}>
            &copy; {new Date().getFullYear()} EcoGroceries. All Rights Reserved.
          </Text>
          <Text fontSize={["xs","md"]}>Privacy Policy | Terms of Service</Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
