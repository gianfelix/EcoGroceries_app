import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Image,
  Center,
  Spinner,
  Grid,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Select,
  FormLabel,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";

const PUBLIC_URL = "https://jcwd011003.purwadhikabootcamp.com/api";

const ListProduct = () => {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateProductData, setUpdateProductData] = useState({
    productId: null,
    name: "",
    price: "",
    productImg: null,
    description: "",
    weight: "",
    id_category: "",
  });

  const [categories, setCategories] = useState([]);
  const [filterProductName, setFilterProductName] = useState("");
  const [filterCategoryName, setFilterCategoryName] = useState("");
  const [orderByName, setOrderByName] = useState("");
  const [orderByPrice, setOrderByPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const handleFilterProductName = (e) => {
    setFilterProductName(e.target.value);
  };

  const handleFilterCategoryName = (e) => {
    const selectedCategory = e.target.value;

    const selectedCategoryObject = categories.find(
      (category) => category.id === selectedCategory
    );

    if (!selectedCategoryObject || !selectedCategoryObject.isActive) {
      setFilterCategoryName(selectedCategory);
    } else {
      alert(`Product category "${selectedCategory}" is inactive.`);
    }
  };
  const activeCategories = categories.filter((category) => category.isActive);

  const handleOrderByName = (e) => {
    setOrderByName(e.target.value);
  };

  const handleOrderByPrice = (e) => {
    setOrderByPrice(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage= () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    axios
      .get(
        `https://jcwd011003.purwadhikabootcamp.com/api/product?isActive=true&page=${currentPage}&size=8&name=${filterProductName}&id_category=${filterCategoryName}&sort_name=${orderByName}&sort_Harga=${orderByPrice}`
      )
      .then((response) => {
        setProducts(response.data.data);
        setIsLoading(false);
      })
      .then((data) => {
        const calculatedTotalPages = Math.ceil(data.total / data.pageSize);
        setTotalPages(calculatedTotalPages);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, [
    filterProductName,
    filterCategoryName,
    orderByName,
    orderByPrice,
    currentPage,
  ]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

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

  const handleActivate = (productId) => {
    axios
      .patch(`https://jcwd011003.purwadhikabootcamp.com/api/product/${productId}/activate`)
      .then(() => {
        axios
          .get("https://jcwd011003.purwadhikabootcamp.com/api/product?isActive=true")
          .then((response) => {
            setProducts(response.data.data);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            toast({
              title: "Product activated successfully!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      })
      .catch((error) => {
        console.error("Error activating product:", error);
      });
  };

  const handleDeactivate = (productId) => {
    axios
      .patch(`https://jcwd011003.purwadhikabootcamp.com/api/product/${productId}/deactivate`)
      .then(() => {
        axios
          .get("https://jcwd011003.purwadhikabootcamp.com/api/product?isActive=true")
          .then((response) => {
            setProducts(response.data.data);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            toast({
              title: "Product deactivated successfully!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      })
      .catch((error) => {
        console.error("Error deactivating product:", error);
      });
  };

  const handleOpenUpdateModal = (product) => {
    setUpdateProductData({
      productId: product.id,
      name: product.name,
      price: product.price,
      productImg: null,
      description: product.description,
      weight: product.weight,
      id_category: product.id_category,
    });
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setUpdateProductData({
      productId: null,
      name: "",
      price: "",
      productImg: null,
      description: "",
      weight: "",
      id_category: "",
    });
  };

  const handleImageChange = (e) => {
    setUpdateProductData({
      ...updateProductData,
      productImg: e.target.files[0],
    });
  };

  const handleUpdate = () => {
    const {
      productId,
      name,
      price,
      productImg,
      description,
      weight,
      id_category,
    } = updateProductData;

    if (!productId || !name || !price) {
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("productImg", productImg);
    formData.append("description", description);
    formData.append("weight", weight);
    formData.append("id_category", id_category);

    axios
      .patch(`https://jcwd011003.purwadhikabootcamp.com/api/product/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        axios
          .get("https://jcwd011003.purwadhikabootcamp.com/api/product?isActive=true")
          .then((response) => {
            setProducts(response.data.data);
            handleCloseUpdateModal();
            setTimeout(() => {
              window.location.reload();
            }, 900);
            toast({
              title: "Product updated successfully!",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      })

      .catch((error) => {
        console.error("Error updating product:", error);
        toast({
          title: "Error",
          description: `Failed to update product: ${error}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  if (products.length === 0) {
    return <Text>No products found.</Text>;
  }

  const getImageUrl = (imagePath) => {
    return `${PUBLIC_URL}/${imagePath}`;
  };

  return (
    <>
      <Box display="flex" gap={6} my={3}>
        <Select value={filterProductName} onChange={handleFilterProductName}>
          <option value="">Select product name</option>
          {products.map((product) => (
            <option value={product.name}>{product.name}</option>
          ))}
          <option value="">Show all product</option>
        </Select>
        <Select value={filterCategoryName} onChange={handleFilterCategoryName}>
          <option value="">Filter by category</option>
          {activeCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.category}
            </option>
          ))}
          <option value="">Show all categories</option>
        </Select>
        <Select value={orderByName} onChange={handleOrderByName}>
          <option value="">Sort by name</option>
          <option value="asc">Product name (ASC)</option>
          <option value="desc">Product name (DESC)</option>
        </Select>
        <Select value={orderByPrice} onChange={handleOrderByPrice}>
          <option value="">Sort by price</option>
          <option value="asc">Price (ASC)</option>
          <option value="desc">Price (DESC)</option>
        </Select>
      </Box>

      <Table variant="striped" colorScheme="teal" mt={4}>
        <Thead>
          <Tr>
            <Th textAlign={"center"}>Product Image</Th>
            <Th textAlign={"center"}>Product Name</Th>
            <Th textAlign={"center"}>Category</Th>
            <Th textAlign={"center"}>Price </Th>
            <Th textAlign={"center"}>Weight (grams)</Th>
            <Th textAlign={"center"}>Status</Th>
            <Th textAlign={"center"}>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => {
            const isActiveCategory = categories.find(
              (Category) => Category.id === product.Category.id
            )?.isActive;

            return (
              <Tr key={product.id}>
                <Td>
                  <Center>
                    <Image
                      boxSize="100px"
                      src={getImageUrl(product.productImg)}
                    />
                  </Center>
                </Td>
                <Td fontWeight={"normal"} textAlign={"center"}>
                  {product.name}
                </Td>
                <Td textAlign={"center"}>{product.Category.category}</Td>
                <Td textAlign={"center"}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(product.price)}
                </Td>
                <Td textAlign={"center"}>{product.weight}</Td>
                <Td textAlign={"center"}>
                  {product.isActive ? (
                    <Text color="green">Active</Text>
                  ) : (
                    <Text color="red">Inactive</Text>
                  )}
                </Td>
                <Td textAlign={"center"}>
                  {product.isActive ? (
                    <Button
                      onClick={() => handleDeactivate(product.id)}
                      colorScheme="red"
                      size="sm"
                    >
                      Deactivate
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleActivate(product.id)}
                      size="sm"
                      colorScheme="green"
                    >
                      Activate
                    </Button>
                  )}

                  <Button
                    ml={2}
                    onClick={() => handleOpenUpdateModal(product)}
                    colorScheme="blue"
                    size="sm"
                    disabled={!product.isActive}
                  >
                    Update
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box my={3} display="flex" justifyContent="center">
      <Button m={1} onClick={handlePrevPage} colorScheme="teal">
          Previous
        </Button>
        {pages.map((page) => (
          <Button
            m={1}
            key={page}
            onClick={() => handlePageChange(page)}
            variant={currentPage === page ? "solid" : "outline"}
            colorScheme="teal"
          >
            {page}
          </Button>
        ))}
        
        <Button m={1} onClick={handleNextPage} colorScheme="teal">
          Next
        </Button>
      </Box>

      <Modal isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Product Name</FormLabel>
            <Input
              placeholder="Product Name"
              value={updateProductData.name}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  name: e.target.value,
                })
              }
            />
            <FormLabel>Price</FormLabel>
            <Input
              placeholder="Product Price"
              value={updateProductData.price}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  price: e.target.value,
                })
              }
              mt={2}
            />
            <FormLabel>Image</FormLabel>
            <Input type="file" onChange={handleImageChange} mt={2} />
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Product Description"
              value={updateProductData.description}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  description: e.target.value,
                })
              }
              mt={2}
            />
            <FormLabel>Weight</FormLabel>
            <Input
              placeholder="Product Weight"
              value={updateProductData.weight}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  weight: e.target.value,
                })
              }
              mt={2}
            />
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select Category"
              value={updateProductData.id_category}
              onChange={(e) =>
                setUpdateProductData({
                  ...updateProductData,
                  id_category: e.target.value,
                })
              }
              mt={2}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category}
                </option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleUpdate} mr={2}>
              Save
            </Button>
            <Button onClick={handleCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListProduct;
