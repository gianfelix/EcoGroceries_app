import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const EditStockPromoModal = ({ promo, onClose, onUpdate }) => {
  const [promoName, setPromoName] = useState(promo.promoName);
  const [buyQty, setBuyQty] = useState(promo.buyQty);
  const [getQty, setGetQty] = useState(promo.getQty);
  const [isActive, setIsActive] = useState(promo.isActive);

  const toast   = useToast();
  const handleUpdatePromo = async () => {
    try {
      const response = await axios.patch(
        `https://jcwd011003.purwadhikabootcamp.com/api/stock-promo/${promo.id}`,
        {
          promoName,
          buyQty,
          getQty,
          isActive,
        }
      );

      if (response.status === 200) {
        onUpdate(response.data);
        toast({
          title: "Stock Promo Updated",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        })
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        onClose();
      } else {
        console.error("Error updating Stock Promo:", response.data.error);
      }
    } catch (error) {
      toast({
        title: "Error updating Stock Promo",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      })
      console.error("Error updating Stock Promo:", error);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent borderRadius="md">
        <ModalHeader fontSize="xl" fontWeight="bold">
          Edit Stock Promo
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Promo Name</FormLabel>
            <Input
              type="text"
              value={promoName}
              onChange={(e) => setPromoName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Buy Qty</FormLabel>
            <Input
              type="number"
              value={buyQty}
              onChange={(e) => setBuyQty(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Get Qty</FormLabel>
            <Input
              type="number"
              value={getQty}
              onChange={(e) => setGetQty(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Is Active</FormLabel>
            <Select
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Select>
          </FormControl>
          <Button mt={4} colorScheme="blue" onClick={handleUpdatePromo}>
            Save Promo
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditStockPromoModal;
