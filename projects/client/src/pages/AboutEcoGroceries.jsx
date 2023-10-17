import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Center,
  VStack,
  Container,
  Divider,
  HStack,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const founders = [
  {
    name: "Hadyan Adi P.",
    photo: "hadyan.jpeg", 
  },
  {
    name: "Gian Felix R.",
    photo: "https://media.licdn.com/dms/image/D5603AQEHg62p3atTQA/profile-displayphoto-shrink_800_800/0/1693131594594?e=2147483647&v=beta&t=8aAlTdPr6PqP8NgOuYhJI0hlB6xVHQwRrY_kMyPjZvY", // Replace with the actual image filename
  },
  {
    name: "Fahrur Nak Sidoarjo.",
    photo: "https://media.licdn.com/dms/image/D5603AQGdX-mjrDDmgg/profile-displayphoto-shrink_800_800/0/1679772317255?e=2147483647&v=beta&t=dJ3pJLvCkw6aSan8nva5YC7nG6v2m355gs3Im5YWbhE", // Replace with the actual image filename
  },
];

const AboutEcoGroceries = () => {
  return (
    <>

    <Box py={10}>
      <Container maxW="container.xl">
        <Center>
          <VStack spacing={6}>
            <Heading as="h1" size="xl" textAlign="center">
              About EcoGroceries
            </Heading>
            <Image
              src="EcoGroceriesApp.png"
              alt="EcoGroceries Store"
              boxSize="300px"
              borderRadius="md"
              boxShadow="lg"
            />
            <Text fontSize="lg" textAlign="center">
              EcoGroceries is your trusted destination for eco-friendly and
              sustainable products. We are committed to providing high-quality
              products that help you lead a greener and more environmentally
              conscious lifestyle.
            </Text>
            <Text fontSize="lg" textAlign="center">
              Our mission is to promote sustainability by offering a wide range
              of eco-friendly alternatives, from reusable products to
              biodegradable packaging. Join us in making a positive impact on
              our planet.
            </Text>
            <Divider />
            <Text fontSize="xl" textAlign="center" fontWeight="bold">
              Vision & Mission
            </Text>
            <Text fontSize="lg" textAlign="center">
              <strong>Vision:</strong> To be a leading provider of eco-friendly
              products and promote sustainable living worldwide.
            </Text>
            <Text fontSize="lg" textAlign="center">
              <strong>Mission:</strong> We aim to offer eco-conscious consumers
              a wide selection of sustainable products while actively
              contributing to reducing environmental impact. EcoGroceries has
              branches in the Jabodetabek and D.I. Yogyakarta areas.
            </Text>
            <Divider />
            <Text fontSize="xl" textAlign="center" fontWeight="bold">
              Founders
            </Text>
            <HStack spacing={6}>
              {founders.map((founder, index) => (
                <Box key={index}>
                  <Image
                    src={founder.photo}
                    alt={founder.name}
                    boxSize="150px"
                    borderRadius="full"
                    boxShadow="md"
                  />
                  <Text textAlign="center" fontWeight="bold">
                    {founder.name}
                  </Text>
                </Box>
              ))}
            </HStack>
          </VStack>
        </Center>
      </Container>
    </Box>

    </>
  );
};

export default AboutEcoGroceries;
