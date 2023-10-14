import React from 'react';
import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      title: 'Happy Customer',
      quote:
        'I love EcoGroceries! They have the best selection of eco-friendly products, and their service is top-notch.',
      image: 'EcoGroceriesApp_LogoOnly.png', // Replace with actual image URL
    },
    {
      id: 2,
      name: 'Jane Smith',
      title: 'Satisfied Shopper',
      quote:
        'EcoGroceries is my go-to place for organic fruits and vegetables. The quality is always excellent.',
      image: 'EcoGroceriesApp_LogoOnly.png', // Replace with actual image URL
    },
    {
      id: 3,
      name: 'David Johnson',
      title: 'Environmentalist',
      quote:
        'I appreciate EcoGroceries\' commitment to sustainability. They make it easy to live a greener life.',
      image: 'EcoGroceriesApp_LogoOnly.png', // Replace with actual image URL
    },
  ];

  return (
    <Box py={12} textAlign="center">
      <Heading fontSize="2xl" mb={6}>
        What Our Customers Say
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center">
        {testimonials.map((testimonial) => (
          <Box
            key={testimonial.id}
            p={4}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            m={4}
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              boxSize="100px"
              mx="auto"
              borderRadius="full"
              mb={4}
            />
            <Text fontSize="lg" fontWeight="bold">
              {testimonial.name}
            </Text>
            <Text fontSize="sm" color="gray.500" mb={2}>
              {testimonial.title}
            </Text>
            <Text fontSize="md">{testimonial.quote}</Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Testimonials;
