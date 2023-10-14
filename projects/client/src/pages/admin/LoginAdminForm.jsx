import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { ExternalLinkIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {useNavigate} from 'react-router-dom'

// import { loginSuccess } from "../../redux/AuthReduser";
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

const LoginAdminForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
//   const dispatch = useDispatch()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box h={"100vh"} bg={"teal.300"} pt={20}>
      <Box  >
        <Box mx="auto" bg={"white"} p={10} w={"60%"} borderRadius={"2xl"} >
          <Center>
            <Image src="EcoGroceriesApp.png" width="25%" height="auto"/>
          </Center>
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Admin Login
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
              axios
                .post(
                  "https://minpro-blog.purwadhikabootcamp.com/api/auth/login",
                  {
                    email: values.email,
                    password: values.password,
                  }
                )
                .then(function (response) {
                  console.log(JSON.stringify(response.data));
                //   dispatch(loginSuccess(response.data.token))

                  // alert(response.data.message)
                  navigate('/')
                  setSubmitting(false);
                })
                .catch(function (error) {
                  console.log(error);
                  setSubmitting(false);
                });
            }}
          >
            <Form>
              <FormControl id="email" mb={3}>
                <FormLabel>Email</FormLabel>
                <Field
                  type="email"
                  name="email"
                  as={Input}
                  placeholder="Enter your email address"
                  // borderColor={"black"}
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
                    // borderColor={"black"}
                  />
                  <InputRightElement width="3rem">
                    <Button
                      // variant="link"
                      // colorScheme="black"
                      h="1.5rem"
                      size="sm"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <ViewOffIcon  />
                      ) : (
                        <ViewIcon  />
                      )}
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
                // variant={"outline"}
                // borderColor={"black"}
              >
                Login
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginAdminForm;
