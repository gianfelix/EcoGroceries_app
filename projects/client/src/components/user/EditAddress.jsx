import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
} from "@chakra-ui/react";

const EditAddress = ({isOpen, onClose}) => {

  return (
    <Box>
      <Modal blockScrollOnMount={false} isCentered isOpen={isOpen} onClose={onClose} size={{ base: "xs", sm: "sm"}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size={{ base: "xs", sm: "sm"}}>Edit Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl colSpan={[6, 3]} >
              <FormLabel htmlFor="country" >Province</FormLabel>
              <Select
                id="province"
                name="province"
                autoComplete="province"
                placeholder="Select option"
                size={{ base: "xs", sm: "sm"}}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </Select>
            </FormControl>

            <FormControl colSpan={[6, 6, null, 2]}>
              <FormLabel htmlFor="city">City</FormLabel>
              <Select
                id="city"
                name="city"
                autoComplete="city"
                placeholder="Select option"
                size={{ base: "xs", sm: "sm"}}
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </Select>
            </FormControl>

            <FormControl colSpan={[6, 3, null, 2]} >
              <FormLabel htmlFor="state" size={{ base: "xs", sm: "sm"}}>Sub-District</FormLabel>
              <Input
                type="text"
                name="subdistrict"
                id="subdistrict"
                autoComplete="subdistrict"
                size={{ base: "xs", sm: "sm"}}
              />
            </FormControl>

            <FormControl colSpan={6}>
              <FormLabel htmlFor="street_address" size={{ base: "xs", sm: "sm"}}>Street address</FormLabel>
              <Input
                type="text"
                name="street_address"
                id="street_address"
                autoComplete="street-address"
                size={{ base: "xs", sm: "sm"}}
              />
            </FormControl>

            <FormControl colSpan={[6, 3, null, 2]} size={{ base: "xs", sm: "sm"}}>
              <FormLabel htmlFor="postal_code">ZIP / Postal</FormLabel>
              <Input
                type="text"
                name="postal_code"
                id="postal_code"
                autoComplete="postal-code"
                size={{ base: "xs", sm: "sm"}}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} size={{ base: "xs", sm: "sm"}}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onClose} size={{ base: "xs", sm: "sm"}}>
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditAddress;
