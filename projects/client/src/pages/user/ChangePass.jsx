import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
  Image,
  Center,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Swal from "sweetalert2"



const PasswordChangeForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: "You've change your password successfully!",
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: 'Make sure your current password is correct😩', 
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const validationSchema = Yup.object().shape({
    old_password: Yup.string().required("Current Password is required"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
        "Password must contain at least 6 characters, 1 symbol, and 1 uppercase letter"
      )
      .required("New Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values) => { 
      setIsSubmitting(true);
      const { old_password, password, confirm_password } = values;
      const token = localStorage.getItem("token");

      const data = {
        old_password,
        password,
        confirm_password,
      };

      const config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/profile/password",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const response = await axios(config);
        console.log(response.data);
        handleAlertSuccess();
        navigate("/");
      } catch (error) {
        handleAlertError();
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
            Change your password
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="old_password" mb={6}>
              <FormLabel>Current Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="old_password"
                  value={formik.values.old_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              {formik.touched.old_password && formik.errors.old_password && (
                <Text color="red">{formik.errors.old_password}</Text>
              )}
            </FormControl>
            <FormControl id="password" mb={6}>
              <FormLabel>New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              {formik.touched.password && formik.errors.password && (
                <Text color="red">{formik.errors.password}</Text>
              )}
            </FormControl>
            <FormControl id="confirm_password" mb={6}>
              <FormLabel>Confirm New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
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
              {formik.touched.confirm_password && formik.errors.confirm_password && (
                <Text color="red">{formik.errors.confirm_password}</Text>
              )}
            </FormControl>
            <Button
              type="submit"
              colorScheme="teal"
              mb={6}
              width="full"
              isLoading={isSubmitting}
              loadingText="Logging in..."
            >
              Change Password
            </Button>
          </form>
          {/* <Text>
            Remember your password?{" "}
            <LinkChakra textColor={'teal'}>
              <Link to="/login">
                Log in here <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text> */}
        </Box>
      </Box>
      <Footer/>
    </Box>
  );
};

export default PasswordChangeForm;
