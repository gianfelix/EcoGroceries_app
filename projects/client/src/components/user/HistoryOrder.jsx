import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Heading,
  Button,
  Image,
  Stack,
  useColorModeValue,
  Box,
  Flex,
  Text,
  Select,
  Grid,
  useMediaQuery,
  useToast // Import the useMediaQuery hook
} from "@chakra-ui/react";
import axios from 'axios'
const token = localStorage.getItem('token')

export default function PersonalData() {
  const [apiData, setApiData] = useState([]);
  const [stats, setStats]= useState();
  const [selectedFilter, setSelectedFilter] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("selected nyoh:", selectedTransaction);
  const handleOpenModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const toast = useToast();
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jcwd011003.purwadhikabootcamp.com/api/user/transaction', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("cek fetch transaction",response);
        setApiData(response.data);
        setStats(
          response.data.map(item => ({
            id: item.id,
            id_status: item.Transaction_Status.id,
            status: item.Transaction_Status.status,
            showButton: true,
          }))
        )
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
useEffect(() =>{
  fetchData();
},[])
const handleAction = async (id, action) => {
  const statusToUpdate = stats.find(status => status.id === id);

  if (!statusToUpdate) {
    console.error('Status not found for ID:', id);
    return;
  }

  if (action === 'Cancel') {
    console.log('cancel', id);
    try {
      const resCancel = await axios.patch(`https://jcwd011003.purwadhikabootcamp.com/api/user/confirm/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('rescancel', resCancel);
      if (resCancel.data.id_status && resCancel.data.status) {
        setStats(prevStatuses =>
          prevStatuses.map(status => {
            if (status.id === id) {
              return {
                ...status,
                id_status: resCancel.data.id_status,
                status: resCancel.data.status,
                showButton: false,
              };
            }
            return status;
          })
        );
        toast({
          title: 'Cancel Successful',
          description: 'The cancellation was successful.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Cancel Failed:', error);
      toast({
        title: 'Cancel Failed',
        description: 'An error occurred while canceling.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  } else if (action === 'Pay now') {
    navigate('/payment')
  }  else if (action === 'Confirm') { 
    try {
      const resCancel = await axios.patch(`https://jcwd011003.purwadhikabootcamp.com/api/user/confirm/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('rescancel', resCancel);
      if (resCancel.data.id_status && resCancel.data.status) {
        setStats(prevStatuses =>
          prevStatuses.map(status => {
            if (status.id === id) {
              return {
                ...status,
                id_status: resCancel.data.id_status,
                status: resCancel.data.status,
                showButton: false,
              };
            }
            return status;
          })
        );
        toast({
          title: 'Confirm Successful',
          description: 'The confirmation was successful.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Confirm Failed:', error);
      toast({
        title: 'Confirm Failed',
        description: 'An error occurred while confirming.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
};

const handleFilterChange = (event) => {
  // console.log('event', typeof event.target.value, event.target.value  )
  setSelectedFilter(event.target.value);
};

const filteredData = apiData.filter((item, index) => {
  // If no filter is selected, include all items
  if (!selectedFilter) {
    return true;
  } else {
    // Check if there is a status with the selected id_status
    const hasStatus = stats.some(status => status.id_status.toString() === selectedFilter);
    return hasStatus && stats[index].id_status.toString() === selectedFilter;
  }
});
useEffect(() => {
console.log('filter',filteredData)
},[filteredData])
  const formatCurrencyIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  function checkStat (stat, index) {
    console.log('statss', stat)
    console.log('index', index)
  }
  // Use the useMediaQuery hook to detect the screen size
  const [isMobileView] = useMediaQuery("(max-width: 768px)");
  const bgColor = useColorModeValue("white", "gray.800"); 
  
  return (
    <Box justify={"center"} bg={useColorModeValue("white", "gray.800")} maxH={"450px"}>
    <Select size={'sm'} placeholder="By Order Status" mb={'2'} value={selectedFilter} onChange={handleFilterChange}>
  <option value="1">Waiting for payment</option>
  <option value="2">Waiting for Payment Confirmation</option>
  <option value="3">Processed</option>
  <option value="4">Sent</option>
  <option value="5">Order Confirmed</option>
  <option value="6">Canceled</option>
</Select>
    {filteredData.map((item, index) => (
      <Stack
        key={item.id}
        bg={bgColor}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={'5'}
      >
        {isMobileView ? (
          <Grid gap={'2'} templateColumns={"repeat(2, 1fr)"} justifyContent={'space-between'}>
          <Button size={"xs"}>{item.id}</Button>
          <Button size="xs">{new Date(item.createdAt).toLocaleDateString("id-ID")}</Button>
          <Button size={"xs"} textColor={"blue.400"} onClick={() => checkStat(item)}>
  {stats.find(status => status.id === item.id)?.status}
</Button>
{stats.find(status => status.id === item.id)?.id_status === 4 && stats.find(status => status.id === item.id)?.showButton && (
  <Button size={"xs"} textColor={"purple"} onClick={() => handleAction(item.id, 'Confirm')}>
    Confirm
  </Button>
)}
{stats.find(status => status.id === item.id)?.id_status === 1 && stats.find(status => status.id === item.id)?.showButton && (
  <>
    <Button size={"xs"} textColor={"red"} onClick={() => handleAction(item.id, 'Cancel')}>
      Cancel
    </Button>
    <Button size={"xs"} textColor={"green"} onClick={() => handleAction(item.id, 'Pay now')}>
      Pay now
    </Button>
  </>
)}
        </Grid>
        ) : (
          <Flex justifyContent={"flex-start"} gap={2}>
          <Button size={"xs"}>{item.id}</Button>
          <Button size="xs">{new Date(item.createdAt).toLocaleDateString("id-ID")}</Button>
          <Button size={"xs"} textColor={"blue.400"} onClick={() => checkStat(item)}>
  {stats.find(status => status.id === item.id)?.status}
</Button>
{stats.find(status => status.id === item.id)?.id_status === 4 && stats.find(status => status.id === item.id)?.showButton && (
  <Button size={"xs"} textColor={"purple"} onClick={() => handleAction(item.id, 'Confirm')}>
    Confirm
  </Button>
)}
{stats.find(status => status.id === item.id)?.id_status === 1 && stats.find(status => status.id === item.id)?.showButton && (
  <>
    <Button size={"xs"} textColor={"red"} onClick={() => handleAction(item.id, 'Cancel')}>
      Cancel
    </Button>
    <Button size={"xs"} textColor={"green"} onClick={() => handleAction(item.id, 'Pay now')}>
      Pay now
    </Button>
  </>
)}
          </Flex>
        )}
        <Flex>
          <Box>
            <Image
              src={`https://jcwd011003.purwadhikabootcamp.com/api/${item.Transaction_Stocks[0].productImg}`}
              boxSize="50px"
              objectFit="cover"
              alt="fruit"
            />
          </Box>
          <Box ml={"2"}>
            <Flex>
            
              <Text key={index} fontSize={"sm"} fontWeight={"bold"}>
                {item.Transaction_Stocks[0].productName}
              </Text>
            
            </Flex>
            <Flex>
              <Text fontSize={"sm"}>{item.Transaction_Stocks[0].qty}</Text>
              <Text fontSize={"sm"}>
                &nbsp;x&nbsp;
              </Text>
              <Text fontSize={"sm"}>{formatCurrencyIDR(item.Transaction_Stocks[0].price/item.Transaction_Stocks[0].qty)}</Text>
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
              {formatCurrencyIDR(item.totPrice)}
            </Text>
          </Box>
        </Flex>
        <Button size={'xs'} textColor={"green"} variant={'outline'} onClick={() => handleOpenModal(item)}>
          Order Detail
        </Button>
      </Stack>
    ))}
    <Modal isOpen={isModalOpen} onClose={handleCloseModal} size={{ base: "xs", md: "lg" }}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Transaction Details</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {selectedTransaction && selectedTransaction.Transaction_Stocks.map((stock, stockIndex) => (
        <Box display={"flex"} direction="column" borderWidth="1px" borderRadius="lg" p="4" marginBottom="2">
        <Image src={`https://jcwd011003.purwadhikabootcamp.com/api/${stock.productImg}`} boxSize="100px" objectFit="cover" alt="fruit" />
        <Box key={stockIndex} ml={4} mt={2}>
          <Heading as="h2" size="md" marginBottom="1">
            {stock.productName}
          </Heading>
          {/* <Text>Product Name: {stock.productName}</Text> */}
          <Text>Quantity: {stock.qty}</Text>
          <Text>Price: {formatCurrencyIDR(stock.price)}</Text>
          {/* Add more details as needed */}
        </Box>
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