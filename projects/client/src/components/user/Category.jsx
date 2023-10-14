import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Text,
  Select,
  Box,
  Spacer,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { FiDollarSign } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";


const Category = ({price, handleSortPrice, handleSortName, name, handleCategoryFilter}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);


  useEffect(() => {
    fetchCategories();
  },[]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/category"
      );
      setCategories(response.data.data);
    } catch (error) {
    }
  };
  const activeCategories = categories.filter((category) => category.isActive);

  return (
    <Box mb={"10"}>
      <Box mx={"5"} mb={"3"} mt={["3","5"]} style={{ display: "flex", justifyContent: "flex-end" }}>
        <Menu isOpen={isOpen}>
          <Select value={name} onChange={handleSortName} placeholder="Sort by product" size={["xs","md"]} w={["","md"]} rounded={["md", "md"]}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </Select>
          <Spacer />
          <Select value={price} onChange={handleSortPrice} placeholder="Sort by price" size={["xs","md"]} w={["","md"]} rounded={["md", "md"]}>
            <option value="asc" >Ascending</option>
            <option value="desc" >Descending</option>
          </Select>
        </Menu>
      </Box>
    
      <Grid
        gap={["2","5"]}
        fontFamily={"monospace"}
        px={"5"}
        pt={["","2"]}
        templateColumns={["1fr 1fr", "repeat(5, 1fr)"]}
        maxW={"1200px"}
        overflowX={"scroll"}
      >
        {activeCategories.map((category) => (
          <Button
          key={category.id}
          variant={"outline"}
          size={["xs","sm"]}
          fontWeight={'hairlain'}
          textColor={selectedCategory === category.id ? "black" : "white"}
          bgColor={selectedCategory === category.id ? "white" : "transparent"}
          w="100%"
          _hover={{
            bgColor: "white",
            color: "black",
          }}
          _active={{
            bgColor: "lightblue",
            color: "black",
          }}
          textTransform={"uppercase"}
          value={category}
          onClick={() => {
            if (selectedCategory === category.id) {
              // Deselect the category if it's already selected
              handleCategoryFilter(null);
              setSelectedCategory(null);
            } else {
              handleCategoryFilter(category.id);
              setSelectedCategory(category.id);
            }
          }}
        >
          {category.category}
        </Button>
        ))}
      </Grid>
    </Box>
  );
};

export default Category;
