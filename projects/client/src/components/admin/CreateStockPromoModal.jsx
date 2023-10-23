import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

const CreateStockPromoModal = () => {
  const [promoName, setPromoName] = useState("");
  const [buyQty, setBuyQty] = useState("");
  const [getQty, setGetQty] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { onClose } = useDisclosure();

  const toast = useToast();
  const handleCreateStockPromo = async () => {
    try {
      const response = await axios.post(
        "https://jcwd011003.purwadhikabootcamp.com/api/stock-promo",
        {
          promoName,
          buyQty,
          getQty,
          isActive,
        }
      );

      if (response.status === 201) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast({
          title: "Stock Promo Created",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        console.log("Stock Promo created successfully:", response.data);
      } else {
        console.error("Error creating Stock Promo:", response.data.error);
      }
    } catch (error) {
      toast({
        title: "Error creating Stock Promo",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      console.error("Error creating Stock Promo:", error);
    }
  };

  return (
    <Box p={4}>
      <FormLabel>Promo Name</FormLabel>
      <Input
        type="text"
        value={promoName}
        onChange={(e) => setPromoName(e.target.value)}
      />

      <FormLabel mt={4}>Buy Qty</FormLabel>
      <Input
        type="number"
        value={buyQty}
        onChange={(e) => setBuyQty(e.target.value)}
      />

      <FormLabel mt={4}>Get Qty</FormLabel>
      <Input
        type="number"
        value={getQty}
        onChange={(e) => setGetQty(e.target.value)}
      />

      <FormLabel mt={4}>Is Active</FormLabel>
      <Select
        value={isActive ? "true" : "false"}
        onChange={(e) => setIsActive(e.target.value === "true")}
      >
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Select>

      <Button w={"full"} mt={4} colorScheme="teal" onClick={handleCreateStockPromo}>
        Create Stock Promo
      </Button>
      
    </Box>
  );
};

export default CreateStockPromoModal;
