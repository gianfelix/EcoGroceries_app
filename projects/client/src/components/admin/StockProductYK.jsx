import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  useDisclosure,
  useToast,
  Select,
  filter,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import EditStockModal from "./EditStockModal";
import CreateStockYK from "./CreateStockYK";

const StockProductYK = () => {
  const [stockData, setStockData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    qty: "",
    discountPercent: 0,
    id_stock_promo: "",
    isActive: "",
  });

  const [promoOptions, setPromoOptions] = useState([]);

  const [filterProductName, setFilterProductName] = useState("");
  const [filterCategoryName, setFilterCategoryName] = useState("");
  const [orderByName, setOrderByName] = useState("");
  const [orderByPrice, setOrderByPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  const toast = useToast();

  const handleEditClick = (stock) => {
    setSelectedStock(stock);
    setFormData({
      qty: stock.qty,
      discountPercent: stock.discountPercent,
      id_stock_promo: stock.Stock_Promo.id,
      isActive: stock.isActive ? "1" : "0",
    });
    onOpen();
  };

  const handleAddStockClick = async (stock) => {
    const customQty = window.prompt("Enter the quantity to add:", "1");
    if (customQty !== null) {
      try {
        const response = await fetch("https://jcwd011003.purwadhikabootcamp.com/api/stock/add", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_product: stock.id_product,
            id_branch: stock.id_branch,
            qty: parseInt(customQty),
          }),
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Stock added successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return setFormData({
            qty: "",
            discountPercent: 0,
            id_stock_promo: "",
            isActive: "",
          });
        } else {
          console.error("Failed to add stock");
          toast({
            title: "Error",
            description: "Failed to add stock",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error adding stock:", error);
        toast({
          title: "Error",
          description: "Failed to add stock",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleReduceStockClick = async (stock) => {
    const customQty = window.prompt("Enter the quantity to reduce:", "1");
    if (customQty !== null) {
      try {
        const response = await fetch("https://jcwd011003.purwadhikabootcamp.com/api/stock/reduce", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_product: stock.id_product,
            id_branch: stock.id_branch,
            qty: parseInt(customQty),
          }),
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Stock reduced successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          return setFormData({
            qty: "",
            discountPercent: 0,
            id_stock_promo: "",
            isActive: "",
          });
        } else {
          console.error("Failed to reduce stock");
          toast({
            title: "Error",
            description: "Failed to reduce stock",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error reducing stock:", error);
        toast({
          title: "Error",
          description: "Failed to reduce stock",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("https://jcwd011003.purwadhikabootcamp.com/api/stock", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_product: selectedStock.id_product,
          id_branch: selectedStock.id_branch,
          qty: parseInt(formData.qty),
          discountPercent: parseInt(formData.discountPercent),
          id_stock_promo: parseInt(formData.id_stock_promo),
          isActive: formData.isActive === "1" ? true : false,
        }),
      });

      if (response.ok) {
        const updatedStock = await response.json();

        setStockData((prevStockData) =>
          prevStockData.map((stock) =>
            stock.id === updatedStock.stock.id ? updatedStock.stock : stock
          )
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        onClose();
        toast({
          title: "Success",
          description: "Stock updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error("Failed to update stock");
        toast({
          title: "Error",
          description: "Failed to update stock",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        title: "Error",
        description: "Failed to update stock",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleFilterProductNameChange = (e) => {
    setFilterProductName(e.target.value);
  };

  const handleFilterCategoryNameChange = (e) => {
    setFilterCategoryName(e.target.value);
  };
  const handleOrderChange = (e) => {
    setOrderByName(e.target.value);
  };

  const handleOrderPriceChange = (e) => {
    setOrderByPrice(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    fetch(
      `https://jcwd011003.purwadhikabootcamp.com/api/stock?id_product=${filterProductName}&id_category=${filterCategoryName}&orderByName=${orderByName}&orderByPrice=${orderByPrice}&page=${currentPage}&pageSize=19`
    )
      .then((response) => response.json())
      .then((data) => {
        const yogyakartaStock = data.data.filter(
          (stock) => stock.Branch.id === 1
        );
        setStockData(yogyakartaStock);
      })
      .then((data) => {
        const calculatedTotalPages = Math.ceil(data.total / data.pageSize);
        setTotalPages(calculatedTotalPages);
      })
      .catch((error) => {
        console.error("Error fetching stock data:", error);
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
    fetch("https://jcwd011003.purwadhikabootcamp.com/api/stock-promo")
      .then((response) => response.json())
      .then((data) => {
        setPromoOptions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching promo options:", error);
      });
  }, []);
  const uniqueCategories = [
    ...new Set(stockData.map((stock) => stock.Product.Category.id)),
  ];
  return (
    <Box p={4}>
      <Flex gap={5} align={"center"} mb={2}>
        <Heading as="h2" size="lg" mb={2}>
          Stock Products in Yogyakarta
        </Heading>
        <Box>
          <CreateStockYK />
        </Box>
      </Flex>
      <Box display="flex" gap={6}>
        <Select
          value={filterProductName}
          onChange={handleFilterProductNameChange}
        >
          <option value="">Select product name</option>
          {stockData.map((stock) => (
            <option value={stock.Product.id}>{stock.Product.name}</option>
          ))}
          <option value="all">Show all product</option>
        </Select>
        <Select
          value={filterCategoryName}
          onChange={handleFilterCategoryNameChange}
        >
          <option value="">Filter by category</option>
          {uniqueCategories.map((categoryId) => {
            const category = stockData.find(
              (stock) => stock.Product.Category.id === categoryId
            );
            return (
              <option key={categoryId} value={categoryId}>
                {category.Product.Category.category}
              </option>
            );
          })}
          <option value="all">Show all categories</option>
        </Select>
        <Select value={orderByName} onChange={handleOrderChange}>
          <option value="">Sort by name</option>
          <option value="ASC">Product Name (ASC)</option>
          <option value="DESC">Product Name (DESC)</option>
        </Select>
        <Select value={orderByPrice} onChange={handleOrderPriceChange}>
          <option value="">Sort by price</option>
          <option value="ASC">Price (ASC)</option>
          <option value="DESC">Price (DESC)</option>
        </Select>
      </Box>

      <Box>
        {stockData.length === 0 ? (
          <Box>No stock records found for Yogyakarta.</Box>
        ) : (
          <Table
            size={{ base: "smaller", md: "sm", xl: "md" }}
            variant="striped"
            colorScheme="teal"
            wordBreak={"break-word"}
          >
            <TableCaption>Stock data for Yogyakarta</TableCaption>
            <Thead style={{ fontSize: "x-small" }}>
              <Tr>
                <Th>Product</Th>
                <Th>Quantity </Th>
                <Th>Discount Percent</Th>
                <Th>Price After Discount</Th>
                <Th>Price Before Discount</Th>
                <Th>Promo Name</Th>
                <Th>Status</Th>
                <Th>Edit</Th>
                <Th>Add Stock</Th>
                <Th>Reduce Stock</Th>
              </Tr>
            </Thead>
            <Tbody>
              {stockData.map((stock) => (
                <Tr key={stock.id} fontWeight={"light"}>
                  <Td textAlign="center">{stock.Product.name}</Td>
                  <Td textAlign="center">{stock.qty}</Td>
                  <Td textAlign="center">{stock.discountPercent}%</Td>
                  <Td textAlign="center">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(
                      stock.Product.price -
                        (stock.discountPercent * stock.Product.price) / 100
                    )}
                  </Td>
                  <Td textAlign="center">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(stock.Product.price)}
                  </Td>
                  <Td textAlign="center">{stock.Stock_Promo.promoName}</Td>
                  <Td
                    textAlign="center"
                    fontWeight={"bold"}
                    color={stock.isActive ? "green" : "red"}
                  >
                    {stock.isActive ? "Active" : "Inactive"}
                  </Td>
                  <Td textAlign="center">
                    <Button
                      onClick={() => handleEditClick(stock)}
                      colorScheme="blue"
                      size="xs"
                    >
                      Edit
                    </Button>
                  </Td>
                  <Td textAlign="center">
                    <Button
                      colorScheme="green"
                      onClick={() => handleAddStockClick(stock)}
                      size="xs"
                    >
                      Add
                    </Button>
                  </Td>
                  <Td textAlign="center">
                    <Button
                      colorScheme="red"
                      onClick={() => handleReduceStockClick(stock)}
                      size="xs"
                    >
                      Reduce
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <Box mt={2} display="flex" justifyContent="center">
        <Button m={1} colorScheme="teal" onClick={handlePrevClick} disabled={currentPage === 1}>
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
        <Button m={1} colorScheme="teal" onClick={handleNextClick} disabled={currentPage === pages.length}>
          Next
        </Button>
      </Box>
      {selectedStock && (
        <EditStockModal
          isOpen={isOpen}
          onClose={onClose}
          selectedStock={selectedStock}
          formData={formData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
          promoOptions={promoOptions}
        />
      )}
    </Box>
  );
};

export default StockProductYK;
