import React from "react";
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
  Box,
} from "@chakra-ui/react";

const DeletedAddress = ({isOpen, onClose}) => {

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} isCentered size={{ base: "xs", sm: "sm"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size={{ base: "xs", sm: "sm"}}>Delete Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl colSpan={[6, 3, null, 2]} size={{ base: "xs", sm: "sm"}}>
              <FormLabel textAlign={'center'} fontSize={{ base: "xs", sm: "md"}}>Are you sure you want to delete your address</FormLabel>
            </FormControl>
          </ModalBody>
          <ModalFooter display={'flex'} alignSelf={'center'}>
            <Button colorScheme="blue" mr={3} onClick={onClose} size={{ base: "xs", sm: "sm"}}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onClose} size={{ base: "xs", sm: "sm"}}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default DeletedAddress;
