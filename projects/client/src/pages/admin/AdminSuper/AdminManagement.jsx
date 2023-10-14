import {
  useDisclosure,
  Button,
  Link,
  Spacer,
  Flex,
  Switch,
  Heading,
  Text,
  Stack,
  Avatar,
  Divider,
  Icon,
  Box,
} from "@chakra-ui/react";
import { ImQuotesLeft } from "react-icons/im";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import CreateCashier from "./CreateAdmin";
import EditCashier from "./EditAdmin";
import { useState, useEffect } from "react";
import axios from "axios";
import LOGO from "../../../../src/assets/EcoGroceriesApp.png";

const AdminList = () => {
  const {
    isOpen: isCreateCashierOpen,
    onOpen: onCreateCashierOpen,
    onClose: onCreateCashierClose,
  } = useDisclosure();
  const {
    isOpen: isEditCashierOpen,
    onOpen: onEditCashierOpen,
    onClose: onEditCashierClose,
  } = useDisclosure();
  const [cashiers, setCashiers] = useState([]);
  const [selectedCashier, setSelectedCashier] = useState(null);

  const handleEditCashier = (cashier) => {
    setSelectedCashier(cashier);
    onEditCashierOpen();
  };

  const handleUpdateCashiers = async () => {
    try {
      // Make a PATCH request to update the selected cashier data
      await axios.patch(
        `http://localhost:8000/api/admin/update/${selectedCashier.id}`,
        {
          currentIdbranch: selectedCashier.id_branch,
          currentUsername: selectedCashier.user_name,
          currentEmail: selectedCashier.email,
          newIdbranch: selectedCashier.newIdbranch,
          newUsername: selectedCashier.newUsername,
          newEmail: selectedCashier.newEmail,
        }
      );

      // After successfully updating cashier data, close the modal
      onEditCashierClose();

      // Fetch the updated list of cashiers from the server and update the state
      const response = await axios.get("http://localhost:8000/api/admin/admin");
      setCashiers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCashiers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/admin/admin");
      setCashiers(response.data);
      onCreateCashierClose();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deactiveCashier = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/admin/deactivate?id=${id}`
      );
      alert(res.data.message);
      fetchCashiers();
    } catch (err) {
      alert(err);
    }
  };

  const activeCashier = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:8000/api/admin/activate?id=${id}`
      );
      alert(res.data.message);
      fetchCashiers();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchCashiers();
  }, []);

  const handleEditCashierSuccess = () => {
    fetchCashiers();
    onEditCashierClose();
  };

  const handleCreateAdminSuccess = async () => {
    fetchCashiers(); 
    onCreateCashierClose();
  };
  


  return (
    <Box maxW="10xl" px={{ base: 5, md: 20 }} py={"6"} maxH="730px" overflowY="auto">
      <Flex justify={"space-between"}>
        <Heading>List Admin Branch</Heading>
        <Link>
          <Button
            bgColor={"teal"}
            onClick={onCreateCashierOpen}
            color={"white"}
            _hover={{ color: "black" }}
          >
            Create Admin
            <BiAddToQueue size={"30px"} />
          </Button>
          <CreateCashier
            isOpen={isCreateCashierOpen}
            onClose={onCreateCashierClose}
            onCreateSuccess={handleCreateAdminSuccess}
          />
        </Link>
      </Flex>
      <Divider my={6} borderColor={"teal"} />
      {cashiers.map((obj, index) => (
        <Box key={index}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            spacing={10}
            pt={1}
            justify="center"
          >
            <Avatar
              size="2xl"
              shadow={"dark-lg"}
              alignSelf={"center"}
              showBorder={true}
              borderColor="white.400"
              name="avatar"
              src={LOGO}
              d={{ base: "none", sm: "block" }}
            ></Avatar>
            <Stack direction="column" spacing={4} textAlign="left" maxW="4xl">
              <Icon as={ImQuotesLeft} w={8} h={8} color="white" />
              <Text fontSize="md" fontWeight="medium">
                <i>
                  EcoGroceries is your trusted destination for eco-friendly and
                  sustainable products. We are committed to providing
                  high-quality products that help you lead a greener and more
                  environmentally conscious lifestyle.
                </i>
              </Text>
              <Stack
                alignItems={{ base: "center", sm: "flex-start" }}
                spacing={0}
              >
                <Text fontWeight="bold" fontSize="lg" fontFamily={"cursive"}>
                  {obj.user_name}
                </Text>
                <Text fontWeight="medium" fontSize="sm">
                  {obj.email}
                </Text>
                <Text fontWeight="medium" fontSize="sm" color="teal">
                  <i>
                    {obj.id_branch === 1
                      ? "Yogyakarta EcoGroceries"
                      : obj.id_branch === 2
                      ? "Jabodetabek EcoGroceries"
                      : ""}
                  </i>
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Flex mt={"2"}>
            <Spacer />
            <Switch
              colorScheme={obj.isActive ? "green" : "gray"}
              isChecked={obj.isActive}
              ml={"2"}
              alignSelf={"center"}
              onChange={() => {
                if (obj.isActive) {
                  deactiveCashier(obj.id);
                } else {
                  activeCashier(obj.id);
                }
              }}
            />
            <Button variant={"link"} onClick={() => handleEditCashier(obj)}>
              <BiEdit color="black" size={"23"} />
            </Button>
          </Flex>
          {cashiers.length - 1 !== index && (
            <Divider my={5} borderColor={"teal"} />
          )}
        </Box>
      ))}

      {/* Render the EditCashier modal here */}
      {selectedCashier && (
        <EditCashier
          isOpen={isEditCashierOpen}
          onClose={onEditCashierClose}
          cashier={selectedCashier}
          onUpdate={handleUpdateCashiers}
          onEditSuccess={handleEditCashierSuccess}
        />
      )}
    </Box>
  );
};

export default AdminList;
