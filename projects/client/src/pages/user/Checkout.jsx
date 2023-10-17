import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useToast,
  // useMediaQuery, 
} from '@chakra-ui/react';

function Checkout() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response1, setResponse1] = useState({});
  const [response2, setResponse2] = useState([]);
  const [branch, setBranch] = useState(0);
  // const [shipCost, setShipCost] = useState(0);
  const [shipping, setShipping] = useState({ready: false});
  const [body, setBody] = useState({shippingCostDiscount: 0});
  const [showMore, setShowMore] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedShippingOption, setSelectedShippingOption] = useState('');
  const [selectedService, setSelectedService] = useState(0);
  const [service, setService] = useState([]);
  // const [isLargerThanMobile] = useMediaQuery("(min-width: 600px)"); 
  const token = localStorage.getItem('token');
  const authorizationHeader = token ? `Bearer ${token}` : '';

  function updateShip(updates) {
    setShipping(prevState => ({
      ...prevState,
      ...updates
    }));
  } 

  function updateBody(updates) {
    setBody(prevState => ({
      ...prevState,
      ...updates
    }));
  } 
  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchAPI2 = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/items', {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        setResponse2(response.data);
        console.log("res2", response);
        const numb = response.data[0].Stock.id_branch;
        console.log('br', numb)
        setBranch(numb);
        updateBody({id_branch: numb})
        console.log("useeffect", branch)
      } catch (error) {
        console.error('Error fetching data from API 2:', error);
      }
    };
    fetchAPI2();
  }, [])

  useEffect(() => {
    const fetchAPI1 = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/cart', {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        setResponse1(response.data);
        updateShip({weight: response.data.totWeight})
        // updateBody({totWeight:response.data.totWeight, totPrice: response.data.totPrice, totQty: response.data.totQty, totDiscount: response.data.totDiscount}) 
        console.log("res1", response);
      } catch (error) {
        console.error('Error fetching data from API 1:', error);
      }
    };
    fetchAPI1();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (branch !== null) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/address/${branch}`, {
            headers: {
              Authorization: authorizationHeader,
            },
          });
          console.log('add', response)     
          setAddresses(response.data.address);
          updateShip({origin:response.data.branchCity})
          if (response.data.length > 0) {
            setSelectedAddress(response.data[0].address);
          }
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
    };
    fetchAddresses();
  }, [branch]);

  const handleAddressChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    updateShip({destination: parseInt(event.target.value)})
    setSelectedAddress(event.target.value)
    updateBody({userAddress:selectedOption.getAttribute("data-user-address")})
    // console.log("selected address",event.target.value)
    updateBody()
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleShippingOptionChange = (event) => {
    updateShip({courier: event.target.value});
    setSelectedShippingOption(event.target.value);
    if (shipping.destination && shipping.origin && shipping.weight) {
      updateShip({ready: true});
    }
  };

  const handleServiceChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedService(event.target.value)
    updateBody({shippingMethod:selectedOption.getAttribute("name"), shippingCost:event.target.value })
    console.log('service', selectedService)
    console.log('event', event.target.value)

  }
  useEffect(() =>{
    // console.log('service', service)
    // console.log('address', addresses)
    // console.log(selectedService)
    console.log("body",body)
  },[service, selectedService, addresses, body])
  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const shippingData = await axios.post('http://localhost:8000/api/rajaongkir/cost', shipping)
        console.log('bangasat',shippingData.data.rajaongkir)
         setService(shippingData.data.rajaongkir.results[0].costs)
         updateBody({shipper: shippingData.data.rajaongkir.results[0].name})
      } catch (error) {
        console.error('Error fetching shipping data:', error);
      }
    };
    if (shipping.ready) {
      fetchShippingData();
      updateShip({ready: false});
    }
  }, [shipping.ready]);
  useEffect(() => {
    console.log(shipping)
  },[shipping, service])

  const handleCheckoutConfirmation = async () => {
    // Send the 'body' state to the server here
    // You can use axios or any other method for the API call

    try {
      // Example API call
      const response = await axios.post('http://localhost:8000/api/user/checkout', body, {
        headers: {
          Authorization: authorizationHeader,
        },
      });

      // Check the response status code to ensure success
      // Replace '200' with the appropriate success status code
      if (response.status === 201) {
      setIsModalOpen(false);
      navigate('/payment');
      } 

    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle any errors or display an error message if needed
      toast({
        title: "API Error",
        description: "An error occurred during checkout. Please try again later.",
        status: "error",
        duration: 5000, // Toast duration in milliseconds
        isClosable: true, // Allow the user to close the toast
      });
    }
  };  
  
  return (  
    <Box flex="1" p="4" d="flex" flexDirection="column" justifyContent="space-between">
      {(!response1 || !response2 || Object.keys(response1).length === 0 || response2.length === 0) ? (
      <Box flex="1" p="4">
        <Heading as="h2" size="md" mb="2">
          Your cart is empty, start shopping here
        </Heading>
        <Button colorScheme="teal" onClick={() => navigate('/shop')}>
          Start Shopping
        </Button>
      </Box>
      ) : (
        <>
    <Box flex="1" p="4">
  <Heading as="h2" size="md" mb="2">
    Second JSON Response:
  </Heading>
  {response2.slice(0, showMore ? response2.length : 1).map((item, index) => (
    <Box key={index} mb="4">
      <Text>Item {item.Stock.Product.name}</Text>
      <Text>Price: {item.price}</Text>
      {/* Add more fields as needed */}
    </Box>
  ))}

  {response2.length > 1 && (
    <Button onClick={toggleShowMore} size="sm" colorScheme="teal">
      {showMore ? 'Show Less' : 'Show More'}
    </Button>
  )}
</Box>
    <Box flex="1" p="4">
  <Heading as="h2" size="md" mb="2">First JSON Response:</Heading>
  <Text> Total Price: {response1.totPrice}</Text>
  <Text> Total Items: {response1.totQty}</Text>
  <Text> Total Weight: {response1.totWeight}</Text>
  <Text> Total Shipping Cost: {selectedService}</Text>
  <Text> Total Product Discount: {response1.totDiscount}</Text>
  <br />
  <Flex direction="column" justifyContent="space-between" height="100%">
    <Box>
      {addresses.length > 0 && (
        <Box border="1px" borderColor="black" borderRadius="md" p="2">
          <Heading as="h2" size="md" mb="2">Select Shipment Address:</Heading>
          <Select
            value={selectedAddress}
            onChange={handleAddressChange}
            mt="4"
          >
            <option value="" disabled>
              Select shipment address
            </option>
            {addresses.map((address) => (
              <option key={address.id} value={address.userCity} data-user-address={address.userAddress}>
                {`${address.userName} - ${address.userAddress}`}
              </option>
            ))}
          </Select>
        </Box>
      )}
       {selectedAddress && (
  <>
    <Box border="1px" borderColor="black" borderRadius="md" p="2">
      <Heading as="h2" size="md" mb="2">Shipping Options:</Heading>
      <Select
        value={selectedShippingOption}
        onChange={handleShippingOptionChange}
        mt="4"
        width="200px"
      >
        <option value="">Select a courier</option>
        <option value="jne">JNE</option>
        <option value="pos">POS</option>
        <option value="tiki">TIKI</option>
      </Select>
    </Box>
    <Box border="1px" borderColor="black" borderRadius="md" p="2">
      <Heading as="h2" size="md" mb="2">Service Options:</Heading>
      <Select
        value={selectedService}
        onChange={handleServiceChange}
        mt="4"
        width="200px"
      >
        <option value="">
          {service.length === 0 ? 'Choose a courier first' : 'Select a service'}
        </option>
        {service.map((serv) => (
          <option key={serv.service} value={serv.cost[0].value} name={serv.description}>
            {serv.service}
          </option>
        ))}
      </Select>
    </Box>
  </>
)}
    </Box>
    <Box display="flex" justifyContent="flex-end" mt="4">
      <Button colorScheme="teal" onClick={handleCheckout}>
        Checkout
      </Button>
    </Box>
  </Flex>
</Box>
<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Are you sure you want to checkout?</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      {/* Additional information or confirmation message can be added here */}
    </ModalBody>
    <ModalFooter>
      <Button colorScheme="teal" mr={3} onClick={handleCheckoutConfirmation}>
        Yes
      </Button>
      <Button colorScheme="gray" onClick={() => setIsModalOpen(false)}>
        No
      </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
</>
      )}
  </Box>
  
  );
}

export default Checkout;
