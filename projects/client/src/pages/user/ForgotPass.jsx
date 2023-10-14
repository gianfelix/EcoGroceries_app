import { Link, useNavigate } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  Link as LinkChakra,
  Center,
  Image,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2"


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'Please check your email for link reset password',
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: 'Make sure your email are correct😩',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setIsSubmitting(true);;
    axios
      .post("http://localhost:8000/api/auth/forgot", {
        email: values.email,
      })
      .then(function (response) {
        console.log(response.data);
        handleAlertSuccess();
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
        handleAlertError();
      })
      .finally(()=>{
        setIsSubmitting(false); 
        setSubmitting(false); 
      });
  };

  return (
    <Box>
      <Navbar />
      <Box mt={5}>
        <Center>
          <Image src="EcoGroceriesApp.png" width={{ base: "30%", md: "10%" }} height="auto" />
        </Center>
        <Box m="auto" p={6} w={{ base: "100%", md: "30%" }}>
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Forgot your password
          </Heading>
          <Text mb={6}>
            Enter the email address associated with your account and we'll send
            you instructions to reset your password.
          </Text>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    id="email"
                    mb={6}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel>Email</FormLabel>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                    />
                    <ErrorMessage name="email" component={Text} color="red" />
                  </FormControl>
                )}
              </Field>
              <Button type="submit" colorScheme="teal" mb={6} width="full"
              isLoading={isSubmitting}
              loadingText="Logging in...">
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
      <Footer/>
    </Box>
  );
};

export default ForgotPassword;
