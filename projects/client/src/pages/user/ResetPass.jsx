import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import axios from "axios";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import LOGO from "../../assets/EcoGroceriesApp.png";
import Swal from "sweetalert2"


const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const url = window.location.href.split("/")
  const token = url[url.length - 1];
  const navigate = useNavigate();


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: "You've reseted your password successfully!",
      showConfirmButton: false,
      timer: 3000
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: 'Make sure your password are correct😩',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setIsSubmitting(true);
    axios
      .patch(
        "http://localhost:8000/api/auth/reset",
        {
          password: values.password,
          confirm_password: values.confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        handleAlertSuccess();
        navigate("/login");
      })
      .catch(function (error) {
        handleAlertError();
        console.log(error);
      })
      .finally(()=>{
        setIsSubmitting(false); 
        setSubmitting(false); 
      });
  };

  return (
    <Box>
      <Navbar/>
        <Center mt={'5'}>
           <Image 
           src={LOGO}
           width={{ base: "30%", md: "10%" }}
           height="auto"/>
        </Center>
      <Box>
        <Box
          m="auto"
          p={6}
          w={{ base: "100%", md: "30%" }}
        >
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Reset your password
          </Heading>
          <Formik
            initialValues={{
              password: "",
              confirm_password: "",
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .matches(
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                  "Password must contain at least 6 characters, 1 symbol, and 1 uppercase letter"
                )
                .required("New Password is required"),
              confirm_password: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            })}
            onSubmit={handleSubmit}
          >
            <Form>
              <FormControl id="password" mb={6}>
                <FormLabel>New Password</FormLabel>
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
                      {showPassword ? (
                        <ViewOffIcon boxSize={4} />
                      ) : (
                        <ViewIcon boxSize={4} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="password" component={Text} color="red" />
              </FormControl>
              <FormControl id="confirm_password" mb={6}>
                <FormLabel>Confirm New Password</FormLabel>
                <InputGroup>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    as={Input}
                    placeholder="Enter your password"
                  />
                  <InputRightElement width="3rem">
                    <Button
                      size="sm"
                      h="1.5rem"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <ViewOffIcon boxSize={4} />
                      ) : (
                        <ViewIcon boxSize={4} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <ErrorMessage name="confirm_password" component={Text} color="red" />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                mb={6}
                width="full"
                isLoading={isSubmitting}
                loadingText="Logging in..."
              >
                Reset Password
              </Button>
            </Form>
          </Formik>
          <Text>
            Remember your password?{" "}
            <LinkChakra textColor={'teal'}>
              <Link to="/login">
                Log in here <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default ResetPasswordPage;
