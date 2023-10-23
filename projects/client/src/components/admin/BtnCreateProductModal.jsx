import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const BtnCreateProductModal = () => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    productImg: null, 
    description: "",
    weight: "",
    isActive: true,
    id_category: "",
  });
  const [categories, setCategories] = useState([]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, productImg: file });
  };

  const handleCreateProduct = async () => {
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("price", formData.price);
      formDataToSubmit.append("description", formData.description);
      formDataToSubmit.append("weight", formData.weight);
      formDataToSubmit.append("isActive", formData.isActive);
      formDataToSubmit.append("id_category", formData.id_category);
      formDataToSubmit.append("productImg", formData.productImg); 

      const response = await axios.post(
        "https://jcwd011003.purwadhikabootcamp.com/api/product",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      if (response.status === 200) {
        toast({
          title: "Product Created",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        })
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error("Failed to create product:", error);
      toast({
        title: "Error",
        description: "Failed to create product",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  };

  useEffect(() => {
    axios
      .get("https://jcwd011003.purwadhikabootcamp.com/api/category")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response)
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">Create Product</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Image</FormLabel>
              <Input
                type="file"
                name="productImg"
                onChange={handleImageChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Weight</FormLabel>
              <Input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
              placeholder="Select Category"
                name="id_category"
                value={formData.id_category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <Box p="4" textAlign="center">
            <Button colorScheme="blue" onClick={handleCreateProduct}>
              Submit
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnCreateProductModal;
