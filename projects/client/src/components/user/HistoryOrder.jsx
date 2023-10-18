import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Heading,
  Image,
  Stack,
  useColorModeValue,
  Box,
  Flex,
  Text,
  Select,
  Grid,
  useMediaQuery,
  useToast , // Import the useMediaQuery hook
} from "@chakra-ui/react";

export default function PersonalData() {
  const token = localStorage.getItem('token')
  // const headers = {
  //   Authorization: `Bearer ${token}`
  // }
  const toast = useToast(); 
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isMobileView] = useMediaQuery("(max-width: 768px)");
  const [apiData, setApiData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [statusUpdates, setStatusUpdates] = useState({});

  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };
useEffect(() => {
  console.log('up')
},[statusUpdates])
  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };
  const tes = async (transactionId) => {
    // const headers = {
    //   Authorization: `Bearer ${token}`
    // }
    try {
      const res = await axios.patch(`http://localhost:8000/api/user/cancel/${transactionId}`,null, {
        headers: {Authorization: `Bearer ${token}`}
      });
      const newStatusUpdates = { ...statusUpdates };
  
      // Update the status and id for the specified transaction.id
      newStatusUpdates[transactionId] = {
        status: 'Cancelled', // Change 'New Status' to the desired status
        id: 6, // Change 7 to the desired id
      }
      // console.log('nu', newStatusUpdates);
  
      // Update the state with the new statusUpdates
      setStatusUpdates(newStatusUpdates);
  
      // Show a success toast
      toast({
        title: 'Success',
        description: 'Order Cancelled',
        status: 'success',
        duration: 3000, // You can adjust the duration as needed
        isClosable: true,
      });
    } catch (error) {
      // Show a failure toast
      toast({
        title: 'Error',
        description: 'Order cancellation failed',
        status: 'error',
        duration: 3000, // You can adjust the duration as needed
        isClosable: true,
      });
    }
  };
  

  const formatCurrencyIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  useEffect(() => {
    // Make the API call here
    axios.get('http://localhost:8000/api/user/transaction', {
    headers: {Authorization: `Bearer ${token}`}, // Pass headers in the request configuration
  })
      .then((response) => {
        setApiData(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const filteredData = apiData.filter((transaction) => {
    if (selectedOption === "1") {
      return (
        (transaction.Transaction_Status.id === 1) ||
        (statusUpdates[transaction.id] && statusUpdates[transaction.id].id === 1)
      );
    } else if (selectedOption === "2") {
      return (
        (transaction.Transaction_Status.id === 2) ||
        (statusUpdates[transaction.id] && statusUpdates[transaction.id].id === 2)
      );
    } else if (selectedOption === "3") {
      return (
        (transaction.Transaction_Status.id === 3) ||
        (statusUpdates[transaction.id] && statusUpdates[transaction.id].id === 3)
      );
    } else if (selectedOption === "4") {
      return (
        (transaction.Transaction_Status.id === 4) ||
        (statusUpdates[transaction.id] && statusUpdates[transaction.id].id === 4)
      );
    } else if (selectedOption === "5") {
      return (
        (transaction.Transaction_Status.id === 5) ||
        (statusUpdates[transaction.id] && statusUpdates[transaction.id].id === 5)
      );
    } else if (selectedOption === "6") {
      return (
        (transaction.Transaction_Status.id === 6) ||
        (statusUpdates[transaction.id] && statusUpdates[transaction.id].id === 6)
      );
    }
    return true; // If no option is selected, return all data
  });
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Box justify={"center"} bg={useColorModeValue("white", "gray.800")} overflowY="auto" maxH={"450px"}>
      <Select
        size={'sm'}
        placeholder="By Order Status"
        mb={'2'}
        onChange={(event) => setSelectedOption(event.target.value)} // Update selected option
        value={selectedOption} // Set the value of the select to the selected option
      >
        <option value="">All</option> {/* Add an option to show all data */}
        <option value="1">Waiting for payment</option>
        <option value="2">Waiting for Payment Confirmation</option>
        <option value="3">Processed</option>
        <option value="4">Sent</option>
        <option value="5">Order Confirmed</option>
        <option value="6">Canceled</option>
      </Select>

      {filteredData.map((transaction, index) => (
    <Stack
      key={index}
      bg={bgColor}
      rounded={"xl"}
      boxShadow={"lg"}
      p={6}
      mb={'5'}
      overflowY={'auto'}
    >
      {isMobileView ? (
        // Render this layout on mobile view
        <Grid gap={'2'} templateColumns={"repeat(2, 1fr)"} justifyContent={'space-between'}>
          <Button size={"xs"}>{transaction.createdAt}</Button>
          <Button size={"xs"}>{transaction.id}</Button>
          {((transaction.Transaction_Status.status === 'cancelled') || (transaction.Transaction_Status.id === 1)) ? (
          <Button size={"xs"} variant="outline" colorScheme="red" onClick={() => tes(transaction.id)}>
            Cancel Order
          </Button>
        ) : null}

          <Button size={"xs"} textColor={"blue.400"}>
             {transaction.Transaction_Status.status}
          </Button>
          <Button size={"xs"} textColor={"green"}>
            Re-Order
          </Button>
        </Grid>
      ) : (
        // Render this layout on desktop view
        <Flex justifyContent={"space-between"} overflowY={'auto'}>
          <Text fontSize={"sm"}>{transaction.createdAt}</Text>
          <Text fontSize={"sm"}>{transaction.id}</Text>
          {((transaction.Transaction_Status.status === 'cancelled') || (transaction.Transaction_Status.id === 1)) ? (
          <Button size={"xs"} variant="outline" colorScheme="red" onClick={() => tes(transaction.id)}>
            Cancel Order
          </Button>
        ) : null}

          <Button size={"xs"} textColor={"blue.400"}>
          {statusUpdates[transaction.id] ? statusUpdates[transaction.id].status : transaction.Transaction_Status.status}
          </Button>
          <Button size={"xs"} textColor={"green"}>
            Re-Order
          </Button>
        </Flex>
      )}
        <Flex overflowY={'auto'}>
        <Box overflowY={'auto'}>
          <Image
            src={`http://localhost:8000/api/${transaction?.Transaction_Stocks[0].productImg}`}
            boxSize="50px"
            objectFit="cover"
            alt="fruit"
          />
        </Box>
        <Box ml={"2"}>
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {transaction.Transaction_Stocks[0].productName}
            </Text>
          </Flex>
          <Flex>
            <Text fontSize={"sm"}>{transaction.Transaction_Stocks[0].qty}</Text>
            <Text fontSize={"sm"}>&nbsp;x&nbsp;</Text>
            <Text fontSize={"sm"}>
              {formatCurrencyIDR(transaction.Transaction_Stocks[0].price)}
            </Text>
            <Text fontSize={"sm"} ml={{ base: "59", sm: "238" }}>
              Total Order
            </Text>
          </Flex>
          <Text
            fontSize={"sm"}
            fontWeight={"bold"}
            display={"flex"}
            justifyContent={"end"}
          >
            {formatCurrencyIDR(
              transaction.Transaction_Stocks[0].qty * transaction.Transaction_Stocks[0].price
            )}
          </Text>
        </Box>
      </Flex>
      <Button size={'xs'} textColor={"green"} variant={'outline'} onClick={() => handleOpenModal(transaction)}>
        Order Detail
      </Button>
    </Stack>
  ))}
   <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Transaction Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {selectedTransaction && selectedTransaction.Transaction_Stocks.map((stock, stockIndex) => (
        <Box key={stockIndex} borderWidth="1px" borderRadius="lg" p="4" marginBottom="4">
          <Heading as="h2" size="lg" marginBottom="2">
            {stock.productName}
          </Heading>
          {/* <Text>Product Name: {stock.productName}</Text> */}
          <Text>Quantity: {stock.qty}</Text>
          <Text>Price: {formatCurrencyIDR(stock.price)}</Text>
          {/* Add more details as needed */}
        </Box>
      ))}
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
        Close
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>

</Box>
  );
}
