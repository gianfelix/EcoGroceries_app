import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";

const NotificationModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size={{ base: "md", xl: "xl" }}>
      <ModalOverlay />
      <ModalContent bg="white" mx={'10'} onClick={onClose}>
        <ModalHeader fontSize={{ base: "xl", md: "2xl" }}>Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>This is a cart.</Text>
        </ModalBody>
        <ModalFooter justifyContent="center" flexDir="column">
          <Button
            variant="ghost"
            mt={2}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
