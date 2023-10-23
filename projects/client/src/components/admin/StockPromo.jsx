import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  HStack,
  Heading,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import CreateStockPromoModal from "./CreateStockPromoModal";
import EditStockPromoModal from "./EditStockPromoModal";
import { EditIcon } from "@chakra-ui/icons";

const StockPromo = () => {
  const [stockPromos, setStockPromos] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedPromo, setSelectedPromo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jcwd011003.purwadhikabootcamp.com/api/stock-promo"
        );
        const data = response.data.data;
        setStockPromos(data);
      } catch (error) {
        console.error("Error fetching stock promos:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditPromo = (promo) => {
    setSelectedPromo(promo);
    onOpen();
  };

  const handleUpdatePromo = (updatedPromo) => {
    const updatedPromos = stockPromos.map((promo) =>
      promo.id === updatedPromo.id ? updatedPromo : promo
    );
    setStockPromos(updatedPromos);
  };

  return (
    <Box p={4}>
      <Heading mb={8}>Voucher & Promo Product Management</Heading>
      <Flex gap={5}>
        <Heading size={"lg"} mb={2}>
          List of Product Promos
        </Heading>
        <Button colorScheme="teal" onClick={onOpen} mb={4}>
          Create Stock Promo
        </Button>
      </Flex>
      <Box
        borderWidth="1px"
        borderRadius="xl"
        p={2}
        bg="white"
        boxShadow="md"
        maxH={{ base: "260px", xl: "280px" }}
        maxW={{ base: "450px", md: "75%", xl: "100%" }}
        overflowX="auto"
        overflowY={"auto"}
      >
        <Table variant="striped" size="md">
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Promo Name</Th>
              <Th textAlign={"center"}>Buy Qty</Th>
              <Th textAlign={"center"}>Get Qty</Th>
              <Th textAlign={"center"}>Active</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {stockPromos.map((promo) => (
              <Tr key={promo.id}>
                <Td
                  textAlign={"center"}
                  fontWeight={"semibold"}
                  fontSize={"sm"}
                >
                  {promo.promoName}
                </Td>
                <Td textAlign={"center"}>{promo.buyQty}</Td>
                <Td textAlign={"center"}>{promo.getQty}</Td>
                <Td textAlign={"center"}>
                  <Text
                    color={promo.isActive ? "green" : "red"}
                    fontWeight="semibold"
                  >
                    {promo.isActive ? "Yes" : "No"}
                  </Text>
                </Td>
                <Td textAlign={"center"}>
                  <Button
                    size={"xs"}
                    colorScheme="blue"
                    onClick={() => handleEditPromo(promo)}
                  >
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent borderRadius="md">
          <ModalHeader fontSize="xl" fontWeight="bold">
            {selectedPromo ? "Edit Stock Promo" : "Create Stock Promo"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedPromo ? (
              <EditStockPromoModal
                promo={selectedPromo}
                onClose={onClose}
                onUpdate={handleUpdatePromo}
              />
            ) : (
              <CreateStockPromoModal onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default StockPromo;
