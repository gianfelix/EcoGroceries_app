import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Link as LinkChakra,
  Center,
  Image,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: "Your register is successfully😉! Please check your email to verify your account",
      showConfirmButton: false,
      timer: 5000
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: 'The data you entered has been used😩, Please change it with other data',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .test("is-number", "Phone number must be a number", (value) =>
        /^[0-9]+$/.test(value)
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
      )
      .required("Password is required"),
  });

  // Form submission
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        values
      );
      handleAlertSuccess();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const { data } = error.response;
        if (data.errors && typeof data.errors === "object") {
          Object.keys(data.errors).forEach((field) => {
            setFieldError(field, data.errors[field]);
          });
        }
      }
      handleAlertError();
    } finally {
      setSubmitting(false);
    }
  };

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Navbar />
      <Center mt={5}>
        <Image src="EcoGroceriesApp.png" width={{ base: "30%", md: "10%" }} height="auto"/>
      </Center>
      <Box m="auto" px={6} w={{ base: "100%", md: "30%" }}>
        <Heading as="h3" size="lg" textAlign="center">
          Register an Account
        </Heading>
        <Box maxW={"md"} mx={"auto"} mt="5" px="4">
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              referred_by: "", // Initial value for referred_by
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <Form>
                <Stack spacing="1">
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Full Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="Enter your name"
                        />
                        <FormErrorMessage>
                          {form.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Enter your email address"
                        />
                        <FormErrorMessage>
                          {form.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="phone">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.phone && form.touched.phone}
                      >
                        <FormLabel htmlFor="phone">Phone</FormLabel>
                        <Input
                          {...field}
                          id="phone"
                          placeholder="Enter your phone number"
                        />
                        <FormErrorMessage>
                          {form.errors.phone}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.password && form.touched.password}
                      >
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <InputGroup>
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                          />
                          <InputRightElement width="3rem">
                            <Button
                              h="1.5rem"
                              size="sm"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <ViewOffIcon />
                              ) : (
                                <ViewIcon />
                              )}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="referred_by">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="referred_by">Referred By</FormLabel>
                        <Input
                          {...field}
                          id="referred_by"
                          placeholder="Enter who referred you (optional)"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt="4"
                    colorScheme="teal"
                    isLoading={props.isSubmitting}
                    type="submit"
                    width="full"
                  >
                    Register
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
          <Text my="4" >
            Already have an account?{" "}
            <LinkChakra textColor={'teal'}>
            <Link to="/login">
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

export default RegistrationForm;
