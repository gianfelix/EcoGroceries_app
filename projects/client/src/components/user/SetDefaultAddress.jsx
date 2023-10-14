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

const SetDefault = ({ addressId, isDefault, setDefaultCallback, updateAddressCallback }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const setDefaultAndModifyAddress = async () => {
    setIsSubmitting(true);
    try {
      // Set the selected address as the default address
      const setDefaultResponse = await axios.patch(
        `http://localhost:8000/api/address/default/${addressId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Check the response status code
      if (setDefaultResponse.status === 200) {
        setDefaultCallback(addressId);
        updateAddressCallback(addressId);
        onClose();
      } else {
        console.error("Error setting default address:", setDefaultResponse);
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <>
      <Button size={"xs"} variant={"ghost"} textColor={"green"} onClick={onOpen} isDisabled={isDefault}>
        Set as main Address
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
            Default Address
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
                Are you sure you want to make the main address
              </FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter display={"flex"} alignSelf={"center"}>
            <Button
              colorScheme="red"
              mr={3}
              onClick={onClose}
              size={{ base: "xs", sm: "sm" }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={setDefaultAndModifyAddress}
              size={{ base: "xs", sm: "sm" }}
              isLoading={isSubmitting} 
              loadingText="Loading..."
            >
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SetDefault;
