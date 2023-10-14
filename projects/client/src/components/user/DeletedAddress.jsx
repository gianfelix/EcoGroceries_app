import React, {useState} from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";


const DeletedAddress = ({ addressId, updateAddressCallback }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAlertSuccess = () => {
    // Show success notification
    Swal.fire({
      position: 'center-center',
      icon: 'success',
      title: "Delete Address successfully😉",
      showConfirmButton: false,
      timer: 5000
    });
  };

  const handleAlertError = () => {
    // Show error notification
    Swal.fire({
      title: 'Error Delete address😩, Please try again',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });
  };

  const deleteAddress = async () => {
    setIsSubmitting(true);
    try {
      // Make a DELETE request to your API endpoint
      await axios.delete(
        `http://localhost:8000/api/address/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      updateAddressCallback();
      onClose();
      handleAlertSuccess();
    } catch (error) {
      handleAlertError();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button size={"xs"} variant={"ghost"} textColor={"red"} onClick={onOpen}>
        Delete
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
        size={{ base: "xs", sm: "sm" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size={{ base: "xs", sm: "sm" }}>
            Delete Address
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              colSpan={[6, 3, null, 2]}
              size={{ base: "xs", sm: "sm" }}
            >
              <FormLabel
                textAlign={"center"}
                fontSize={{ base: "xs", sm: "md" }}
              >
                Are you sure you want to delete your address
              </FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter display={"flex"} alignSelf={"center"}>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={onClose}
              size={{ base: "xs", sm: "sm" }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={deleteAddress}
              size={{ base: "xs", sm: "sm" }}
              isLoading={isSubmitting} 
              loadingText="Deleting..."
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeletedAddress;
