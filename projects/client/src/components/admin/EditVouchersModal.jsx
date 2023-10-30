import React, { useState, useEffect } from "react";
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
import axios from "axios";

const EditVouchersModal = ({
  isOpen,
  onClose,
  voucher,
  onSave,
  categories,
}) => {
  const [editingVoucher, setEditingVoucher] = useState(voucher || {});
  const toast = useToast();

  useEffect(() => {
    setEditingVoucher(voucher || {});
  }, [voucher]);

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/vouchers/${editingVoucher.id}`,
        {
          name: editingVoucher.name,
          details: editingVoucher.details,
          discountPercentage: editingVoucher.discountPercent,
          discountPrice: editingVoucher.discountPrice,
          timeValid: editingVoucher.timeValid,
          minTotPrice: editingVoucher.minTotPrice,
          maxDiscPrice: editingVoucher.maxDiscPrice,
          codeVoucher: editingVoucher.codeVoucher,
          limit: editingVoucher.limit,
          id_category: editingVoucher.id_category,
        }
      );

      onSave(response.data);
      toast({
        title: "Voucher Updated",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      onClose();
    } catch (error) {
      console.error("Error updating voucher:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Voucher</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={editingVoucher.name || ""}
                onChange={(e) =>
                  setEditingVoucher({ ...editingVoucher, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Details</FormLabel>
              <Textarea
                type="text"
                value={editingVoucher.details || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    details: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Discount Percent</FormLabel>
              <Input
                type="number"
                value={editingVoucher.discountPercent || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    discountPercent: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Time Valid</FormLabel>
              <Input
                type="number"
                value={editingVoucher.timeValid || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    timeValid: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Min Purchase</FormLabel>
              <Input
                type="number"
                value={editingVoucher.minTotPrice || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    minTotPrice: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel> Max Discount Price</FormLabel>
              <Input
                type="number"
                value={editingVoucher.maxDiscPrice || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    maxDiscPrice: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel> Code Voucher</FormLabel>
              <Input
                type="text"
                value={editingVoucher.codeVoucher || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    codeVoucher: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel> Limit </FormLabel>
              <Input
                type="number"
                value={editingVoucher.limit || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    limit: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select
                value={editingVoucher.id_category || ""}
                onChange={(e) =>
                  setEditingVoucher({
                    ...editingVoucher,
                    id_category:
                      e.target.value === "null" ? null : e.target.value,
                  })
                }
              >
                <option value="null">Pilih Kategori</option>
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
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditVouchersModal;
