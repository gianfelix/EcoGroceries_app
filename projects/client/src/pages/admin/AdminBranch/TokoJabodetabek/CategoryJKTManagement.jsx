import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Input,
  Text,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  useToast,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

const CategoryJKTManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategoryId, setEditedCategoryId] = useState(null);
  const [categoryStatus, setCategoryStatus] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axios
      .get("https://jcwd011003.purwadhikabootcamp.com/api/category")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleCreateCategory = () => {
    axios
      .post("https://jcwd011003.purwadhikabootcamp.com/api/category", {
        category: newCategory,
        isActive: true,
      })
      .then((response) => {
        setCategories([...categories, response.data]);
        setNewCategory("");
        onClose();
        toast({
          title: "Category created successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        toast({
          title: "Error creating category!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleUpdateCategory = () => {
    if (editedCategoryId) {
      axios
        .patch(`https://jcwd011003.purwadhikabootcamp.com/api/category/?id=${editedCategoryId}`, {
          category: newCategory,
        })
        .then(() => {
          const updatedCategories = categories.map((category) =>
            category.id === editedCategoryId
              ? { ...category, category: newCategory }
              : category
          );
          setCategories(updatedCategories);
          setNewCategory("");
          setIsEditing(false);
          setEditedCategoryId(null);
          toast({
            title: "Category updated successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          onClose();
        })
        .catch((error) => {
          console.error("Error updating category:", error);
          toast({
            title: "Error updating category!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  const handleDeactivateCategory = (id) => {
    axios
      .patch(`https://jcwd011003.purwadhikabootcamp.com/api/category/deactivate?id=${id}`)
      .then(() => {
        const updatedCategories = categories.map((category) =>
          category.id === id ? { ...category, isActive: false } : category
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deactivating category:", error);
      });
  };

  const handleActivateCategory = (id) => {
    axios
      .patch(`https://jcwd011003.purwadhikabootcamp.com/api/category/activate?id=${id}`)
      .then(() => {
        const updatedCategories = categories.map((category) =>
          category.id === id ? { ...category, isActive: true } : category
        );
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error activating category:", error);
      });
  };

  const handleEditCategory = (category) => {
    setNewCategory(category.category);
    setIsEditing(true);
    setEditedCategoryId(category.id);
    setCategoryStatus(category.isActive);
    onOpen();
  };

  return (
    <Box p={4}>
      <Flex gap={5} align={"center"} mb={2}>
        <Heading>Category Management</Heading>
        <Box>
          <Button colorScheme="teal" onClick={onOpen}>
            Create Category
          </Button>
        </Box>
      </Flex>
      <Box mt={8} mb={4}>
        <Heading size="md" mb={2}>
          Category List
        </Heading>
        <Table variant="striped" colorScheme="teal" size={"sm"}>
          <Thead>
            <Tr>
              <Th textAlign={"center"}>Category</Th>
              <Th textAlign={"center"}>Status</Th>
              <Th textAlign={"center"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category.id}>
                <Td fontWeight="semibold" textAlign={"center"}>
                  {category.category}
                </Td>
                <Td textAlign={"center"}>
                  <Text
                    color={category.isActive ? "green" : "red"}
                    fontWeight="semibold"
                    fontSize="md"
                  >
                    {category.isActive ? "Active" : "Inactive"}
                  </Text>
                </Td>
                <Td>
                  <Flex justify={"center"} gap={3}>
                    <Button
                      size={"sm"}
                      colorScheme="blue"
                      onClick={() => handleEditCategory(category)}
                    >
                      Edit
                    </Button>
                    {category.isActive ? (
                      <IconButton
                        icon={<CloseIcon />}
                        colorScheme="red"
                        size={"sm"}
                        onClick={() => handleDeactivateCategory(category.id)}
                      />
                    ) : (
                      <IconButton
                        icon={<CheckCircleIcon />}
                        colorScheme="green"
                        size={"sm"}
                        onClick={() => handleActivateCategory(category.id)}
                      />
                    )}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? "Update Category" : "Create Category"}
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              placeholder="Category Name"
              mb={2}
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            {isEditing ? (
              <Button colorScheme="teal" onClick={handleUpdateCategory}>
                Update
              </Button>
            ) : (
              <Button colorScheme="teal" onClick={handleCreateCategory}>
                Create
              </Button>
            )}
            <Button colorScheme="gray" ml={2} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CategoryJKTManagement;
