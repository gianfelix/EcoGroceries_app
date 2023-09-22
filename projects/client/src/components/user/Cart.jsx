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
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size={'lg'}>
      <ModalOverlay />
      <ModalContent bg="white" m={'200px'} onClick={onClose}>
        <ModalHeader>Cart</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>This is a cart.</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NotificationModal;
