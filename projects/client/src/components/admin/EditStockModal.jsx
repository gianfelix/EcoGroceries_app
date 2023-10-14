import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Button,
} from "@chakra-ui/react";

const EditStockModal = ({ isOpen, onClose, selectedStock, formData, handleFormChange, handleFormSubmit, promoOptions }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Stock</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Quantity Now</FormLabel>
            <Text pl={4} py={1} fontWeight={"semibold"} bg={"#F5F5F5"}>
              {selectedStock.qty}
            </Text>
          </FormControl>

          <FormControl mt={3}>
            <FormLabel>Input Discount %</FormLabel>
            <Input
              type="number"
              name="discountPercent"
              value={formData.discountPercent}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl mt={3}>
            <FormLabel>Promo Name</FormLabel>
            <Select
              placeholder="Select Promo Name"
              name="id_stock_promo"
              value={formData.id_stock_promo}
              onChange={handleFormChange}
            >
              {promoOptions.map((promo) => (
                <option key={promo.id} value={promo.id}>
                  {promo.promoName}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mt={3}>
            <FormLabel>Status</FormLabel>
            <Select
              placeholder="Select Status"
              name="isActive"
              value={formData.isActive}
              onChange={handleFormChange}
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleFormSubmit}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditStockModal;
