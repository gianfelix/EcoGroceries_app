// CreateVoucherModal.jsx
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios"; // Import axios

const CreateVoucherModal = ({ isOpen, onClose, setVouchers }) => {
  const toast = useToast();

  const [newVoucher, setNewVoucher] = useState({
    name: "",
    details: "",
    discountPercent: null,
    discountPrice: null,
    timeValid: null,
    minTotPrice: null,
    maxDiscPrice: null,
    codeVoucher: "",
    limit: null,
    id_category: null,
  });

  const [categories, setCategories] = useState([]);

  const handleCreateVoucher = () => {
    axios
      .post("http://localhost:8000/api/vouchers", newVoucher)
      .then((response) => {
        setVouchers((prevVouchers) => [...prevVouchers, response.data]);

        setNewVoucher({
          name: "",
          details: "",
          discountPercent: null,
          discountPrice: null,
          timeValid: null,
          minTotPrice: null,
          maxDiscPrice: null,
          codeVoucher: "",
          limit: null,
          id_category: null,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast({
          title: "Voucher Created",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: "Error creating voucher",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        console.error("Error creating voucher:", error);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:8000/api/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Voucher</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={newVoucher.name}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Details</FormLabel>
              <Textarea
                type="text"
                value={newVoucher.details}
                onChange={(e) =>
                  setNewVoucher({ ...newVoucher, details: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Discount Percent</FormLabel>
              <Input
                type="number"
                value={newVoucher.discountPercent || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    discountPercent: parseFloat(e.target.value),
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Discount Price</FormLabel>
              <Input
                type="number"
                value={newVoucher.discountPrice || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    discountPrice: parseFloat(e.target.value),
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Time Valid (days)</FormLabel>
              <Input
                type="number"
                value={newVoucher.timeValid || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    timeValid: parseInt(e.target.value, 10),
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Min Purchase</FormLabel>
              <Input
                type="number"
                value={newVoucher.minTotPrice || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    minTotPrice: parseInt(e.target.value, 10),
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Max Discount Price</FormLabel>
              <Input
                type="number"
                value={newVoucher.maxDiscPrice || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    maxDiscPrice: parseInt(e.target.value, 10),
                  })
                }
              />
            </FormControl>
            
            <FormControl>
              <FormLabel>Limit</FormLabel>
              <Input
                type="number"
                value={newVoucher.limit || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    limit: parseInt(e.target.value, 10),
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select Category"
                value={newVoucher.id_category || ""}
                onChange={(e) =>
                  setNewVoucher({
                    ...newVoucher,
                    id_category:
                      e.target.value === "null" ? null : e.target.value,
                  })
                }
              >
                <option value="null"> - </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleCreateVoucher}>
            Create Voucher
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateVoucherModal;
