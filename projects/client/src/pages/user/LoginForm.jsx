import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ExternalLinkIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

// import { loginSuccess } from "../../redux/AuthReduser"
// import { useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  Link as LinkChakra,
  Center,
  Image,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2"

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   const dispatch = useDispatch()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: 'Login Success',
      showConfirmButton: false,
      timer: 2500
    });
  };

  const handleLoginError = () => {
    // Show error notification
    Swal.fire({
      title: 'Make sure your email and password are correct😩',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  return (
    <Box>
      <Navbar />
      <Box mt={10}>
        <Center>
          <Image src="EcoGroceriesApp.png" width={{ base: "30%", md: "10%" }} height="auto" />
        </Center>
        <Box m="auto" p={6} w={{ base: "100%", md: "30%" }}>
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Login to your account
          </Heading>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
              password: Yup.string()
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                  "Password must contain at least 6 characters, 1 symbol, and 1 uppercase letter"
                )
                .required("Password is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true); // Set submitting to true when the form is being submitted.
              axios
                .post("http://localhost:8000/api/auth/login", {
                  email: values.email,
                  password: values.password,
                })
                .then(function (response) {
                  localStorage.setItem("token", response.data.data.token);
                  handleLoginSuccess();
                  navigate("/");
                })
                .catch(function (error) {
                  console.log(error);
                  handleLoginError();
                })
                .finally(() => {
                  setSubmitting(false); 
                });
            }}
          >
            {({ isSubmitting }) => (
            <Form>
              <FormControl id="email" mb={3}>
                <FormLabel>Email</FormLabel>
                <Field
                  type="email"
                  name="email"
                  as={Input}
                  placeholder="Enter your email address"
                />
                <ErrorMessage name="email" component={Text} color="red" />
              </FormControl>
              <FormControl id="password" mb={6}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    as={Input}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      h="1.5rem"
                      size="sm"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="password" component={Text} color="red" />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                mb={6}
                width="full"
                isLoading={isSubmitting}
                loadingText="Logging in..."
              >
                Login
              </Button>
            </Form>
            )}
          </Formik>
          <Text>
            Forgot your password?{" "}
            <LinkChakra textColor={"teal"}>
              <Link to="/forgot-password" Color={"teal"}>
                Reset Password <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text>
          <Text>
            Don't have an account?{" "}
            <LinkChakra textColor={"teal"}>
              <Link to="/register">
                Sign up here <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default LoginForm;
