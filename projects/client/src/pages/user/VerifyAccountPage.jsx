import {
  Box,
  Heading,
  Text,
  Button,
  Link,
  Center,
  Image,
} from "@chakra-ui/react";
import { Link as LinkChakra } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import LOGO from "../../assets/EcoGroceriesApp.png";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const VerificationPage = () => {
  const url = window.location.href.split("/");
  const token = url[url.length - 1];
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Your verification is successfully!",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: "Please try again😩",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    });
  };

  const handleVerify = async ({ setSubmitting }) => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/auth/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        handleAlertSuccess();
        navigate("/login");
      } else {
        console.log("Failed to verify account");
      }
    } catch (error) {
      handleAlertError();
      console.log("Error verifying account:", error);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Navbar />
      <Center mt={5}>
        <Image s src={LOGO} width={{ base: "30%", md: "10%" }} height="auto" />
      </Center>
      <Box m="auto" px={6}>
        <Box maxW={{ base: "90%", md: "80%", lg: "50%" }} m="auto" p={6}>
          <Heading as="h2" size="lg" mb={6} textAlign={"center"}>
            Verify your email
          </Heading>
          <Text mb={6} textAlign={"center"}>
            A verification email has been sent to your email address. Please
            follow the instructions in the email to verify your account.
          </Text>
          <center>
            <Button colorScheme="teal" onClick={handleVerify} mb={6} width="80%">
              Verify
            </Button>
          </center>
          {token ? null : (
            <Button
              colorScheme="gray"
              onClick={() => handleVerify()}
              mb={6}
              textColor={"black"}
              variant={"outline"}
              borderColor={"black"}
              isLoading={isSubmitting}
              loadingText="Logging in..."
            >
              Verification email
            </Button>
          )}
          <Text>
            Didn't receive the email? Check your spam folder or{" "}
            <LinkChakra textColor={"teal"}>
              <Link to="/contact">
                contact us <ExternalLinkIcon mx="2px" />
              </Link>
            </LinkChakra>
          </Text>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default VerificationPage;
