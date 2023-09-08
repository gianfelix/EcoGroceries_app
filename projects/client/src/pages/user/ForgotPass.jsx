import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, FormControl, useToast, FormLabel, Input, Button, Heading, Text, Link as LinkChakra, Center, Image } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../../components/Navbar";

const ForgotPassword = () => {
  const toast = useToast();
  const initialValues = {
    email: ""
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required")
  });

  const handleSubmit = (values) => {
    axios
      .put("https://minpro-blog.purwadhikabootcamp.com/api/auth/forgotPass", {
        email: values.email
      })
      .then(function (response) {
        console.log(response.data);
        toast({
          title: "Email change",
          description: "Please check your email for link verification",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Box>
      <Navbar/>
      <Box mt={20}>
          <Center>
            <Image src="EcoGroceriesApp.png" width="13%" height="auto"/>
          </Center>
        <Box m="auto" p={6} w={"30%"}>
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Forgot your password
          </Heading>
          <Text mb={6}>
            Enter the email address associated with your account and we'll send you instructions to reset your password.
          </Text>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl id="email" mb={6} isInvalid={form.errors.email && form.touched.email}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} type="email" placeholder="Enter your email address" />
                    <ErrorMessage name="email" component={Text} color="red" />
                  </FormControl>
                )}
              </Field>
              <Button type="submit" colorScheme="teal" mb={6} width="full">
                Send Verification Link
              </Button>
            </Form>
          </Formik>
          <Text>
            Remember your password?{" "}
            <LinkChakra textColor={"teal"}>
              <Link to="/login" textColor={"teal"}>
                Login here <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
