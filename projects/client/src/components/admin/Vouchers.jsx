import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import EditVouchersModal from "./EditVouchersModal";
import CreateVoucherModal from "./CreateVoucherModal";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [setNewVoucher] = useState({
    name: "",
    details: "",
    discountPercent: "",
    timeValid: "",
  });
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [isCreatingModalOpen, setIsCreatingModalOpen] = useState(false);

  const calculateRemainingTime = (voucher) => {
    if (voucher.timeValid) {
      const expirationTime = new Date(
        Date.parse(voucher.updatedAt) + voucher.timeValid * 24 * 60 * 60 * 1000 // Convert days to milliseconds
      );
      return expirationTime - new Date();
    }
    return 0;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVouchers((prevVouchers) =>
        prevVouchers.map((voucher) => ({
          ...voucher,
          remainingTime: calculateRemainingTime(voucher),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchVouchers();
    fetchCategories();
  }, []);

  const fetchVouchers = () => {
    axios
      .get("http://localhost:8000/api/vouchers")
      .then((response) => {
        setVouchers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vouchers:", error);
      });
  };

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

  const handleEditClick = (voucher) => {
    setEditingVoucher({ ...voucher });
    setIsEditingModalOpen(true);
  };

  const handleEditVoucher = (editingVoucher) => {
    if (editingVoucher) {
      axios
        .patch(
          `http://localhost:8000/api/vouchers/${editingVoucher.id}`,
          editingVoucher
        )
        .then((response) => {
          const updatedVouchers = vouchers.map((v) =>
            v.id === editingVoucher.id ? response.data : v
          );
          setVouchers(updatedVouchers);
          setEditingVoucher(null);
          setIsEditingModalOpen(false);
        })
        .catch((error) => {
          console.error("Error updating voucher:", error);
        });
    }
  };

  return (
    <Box p={4}>
      <Flex gap={5}>
        <Heading size="lg" mb={2}>
          List of Vouchers
        </Heading>
        <Button
          colorScheme="teal"
          onClick={() => setIsCreatingModalOpen(true)}
          mb={4}
        >
          Create Voucher
        </Button>
      </Flex>
      <CreateVoucherModal
        isOpen={isCreatingModalOpen}
        onClose={() => setIsCreatingModalOpen(false)}
        onSave={(newVoucherData) => {
          setNewVoucher(newVoucherData);
        }}
        setVouchers={setVouchers}
      />
      <VStack spacing={4} align="flex-start">
        <Box
          borderWidth="1px"
          borderRadius="xl"
          p={4}
          bg="white"
          boxShadow="md"
          maxH={{ base: "270px", xl: "330px" }}
          maxW={{ base: "450px", md: "75%", xl: "100%" }}
          overflowX="auto"
          overflowY={"auto"}
        >
          <Table variant="striped" size="sm">
            <Thead>
              <Tr>
                <Th textAlign={"center"} fontSize="xs">
                  Name
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Code Voucher
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Description
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Discount (%)
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Discount by Price
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Time Valid (days)
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Min Purchase
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Max Discount Price
                </Th>

                <Th textAlign={"center"} fontSize="xs">
                  Limit
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Product Category{" "}
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Time Expired
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Countdown Expired
                </Th>
                <Th textAlign={"center"} fontSize="xs">
                  Action
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {vouchers.map((voucher) => (
                <Tr key={voucher.id}>
                  <Td textAlign={"center"} fontWeight="semibold">
                    {voucher.name || "-"}
                  </Td>
                  <Td
                    fontWeight="semibold"
                    color={"green.500"}
                    textAlign={"center"}
                  >
                    {voucher.codeVoucher || "-"}
                  </Td>
                  <Td textAlign={"justify"}>{voucher.details || "-"}</Td>
                  <Td textAlign={"center"}>{voucher.discountPercent || "-"}</Td>
                  <Td textAlign={"center"}>{voucher.discountPrice || "-"}</Td>
                  <Td textAlign={"center"}>{voucher.timeValid || "-"}</Td>
                  <Td textAlign={"center"}>{voucher.minTotPrice || "-"}</Td>
                  <Td textAlign={"center"}>{voucher.maxDiscPrice || "-"}</Td>

                  <Td textAlign={"center"}>{voucher.limit || "-"}</Td>
                  <Td textAlign={"center"}>
                    {voucher.id_category
                      ? categories
                          .filter(
                            (category) => category.id === voucher.id_category
                          )
                          .map((category) => (
                            <span key={category.id}>{category.category}</span>
                          ))
                      : "-"}
                  </Td>
                  <Td textAlign={"center"}>
                    {voucher.timeValid
                      ? new Date(
                          Date.parse(voucher.updatedAt) +
                            voucher.timeValid * 24 * 60 * 60 * 1000 // Convert days to milliseconds
                        ).toLocaleDateString("id-ID", {
                          timeZone: "Asia/Jakarta",
                        })
                      : "-"}
                  </Td>
                  <Td textAlign={"center"}>
                    {voucher.timeValid ? (
                      voucher.remainingTime > 0 ? (
                        <span>
                          {Math.floor(voucher.remainingTime / (1000 * 60 * 60))}
                          h{" "}
                          {Math.floor(
                            (voucher.remainingTime % (1000 * 60 * 60)) /
                              (1000 * 60)
                          )}
                          m{" "}
                          {Math.floor(
                            (voucher.remainingTime % (1000 * 60)) / 1000
                          )}
                          s
                        </span>
                      ) : (
                        "Expired"
                      )
                    ) : (
                      "-"
                    )}
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        size="xs"
                        colorScheme="blue"
                        onClick={() => handleEditClick(voucher)}
                      >
                        Edit
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </VStack>
      <EditVouchersModal
        isOpen={isEditingModalOpen}
        onClose={() => setIsEditingModalOpen(false)}
        voucher={editingVoucher}
        onSave={(editedVoucher) => handleEditVoucher(editedVoucher)}
        categories={categories}
      />
    </Box>
  );
};

export default Vouchers;
