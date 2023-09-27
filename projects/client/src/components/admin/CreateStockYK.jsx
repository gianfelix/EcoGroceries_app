import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const CreateStockYK = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [id_product, setId_product] = useState("");
  const [id_branch] = useState("1");
  const [qty, setQty] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [id_stock_promo, setId_stock_promo] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [productOptions, setProductOptions] = useState([]);
  const [promoOptions, setPromoOptions] = useState([]);

  const toast = useToast();

  useEffect(() => {
    fetch("http://localhost:8000/api/product")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Get Product Success") {
          setProductOptions(
            data.data.map((product) => ({
              value: product.id,
              label: product.name,
            }))
          );
        } else {
          console.error("Error fetching product data");
        }
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/stock-promo")
      .then((response) => {
        const data = response.data;
        console.log("API Response:", data);
        if (response.status === 200) {
          setPromoOptions(
            data.data.map((promo) => ({
              value: promo.id,
              label: promo.promoName,
            }))
          );
        } else {
          console.error("if else Error fetching Stock Promo data:", data.error);
        }
      })
      .catch((error) => {
        console.error("Catch Error fetching Stock Promo data:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_product,
          id_branch,
          qty,
          discountPercent,
          id_stock_promo,
          isActive,
        }),
      });
      const data = await response.json();

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        toast({
          title: "Success",
          description: "Stock created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error creating stock:", error);
      toast({
        title: "Error",
        description: "Failed to create stock",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box py={4}>
      <Button onClick={() => setIsOpen(true)} colorScheme="teal">
        Create Stock Product
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Stock Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Product</FormLabel>
                <Select
                  placeholder="Select a product"
                  value={id_product}
                  onChange={(e) => setId_product(e.target.value)}
                >
                  {productOptions.map((product) => (
                    <option key={product.value} value={product.value}>
                      {product.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Branch</FormLabel>
                <Input
                  type="text"
                  value="Yogyakarta Groceries"
                  readOnly
                  isDisabled
                />
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Discount Percent</FormLabel>
                <Input
                  type="number"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                />
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Stock Promo</FormLabel>
                <Select
                  placeholder="Select a stock promo"
                  value={id_stock_promo}
                  onChange={(e) => setId_stock_promo(e.target.value)}
                >
                  {promoOptions.map((promo) => (
                    <option key={promo.value} value={promo.value}>
                      {promo.label}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl mt={3}>
                <FormLabel>Is Active</FormLabel>
                <Select
                  placeholder="Select an option"
                  value={isActive}
                  onChange={(e) => setIsActive(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
              </FormControl>
              <ModalFooter>
                <Button type="submit" colorScheme="blue">
                  Create Stock
                </Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CreateStockYK;
