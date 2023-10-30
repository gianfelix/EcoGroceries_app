import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
} from "@chakra-ui/react";

function Checkout() {
  const navigate = useNavigate();
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [response1, setResponse1] = useState({});
  const [response2, setResponse2] = useState([]);
  const [branch, setBranch] = useState(0);
  // const [shipCost, setShipCost] = useState(0);
  const [shipping, setShipping] = useState({ ready: false });
  const [body, setBody] = useState({
    shippingCostDiscount: 0,
    voucherDiscount: 0,
    shippingCost: 0,
  });
  const [showMore, setShowMore] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedShippingOption, setSelectedShippingOption] = useState("");
  const [selectedService, setSelectedService] = useState(0);
  const [service, setService] = useState([]);
  const [showUnpaidMessage, setShowUnpaidMessage] = useState(false);
  const [belData, setBelData] = useState([]);
  const [ongData, setOngData] = useState([]);
  const [selectedBel, setSelectedBel] = useState("");
  const [selectedOng, setSelectedOng] = useState("");
  const [minBel, setMinBel] = useState(0);
  const [minOng, setMinOng] = useState(0);
  const [loading, setLoading] = useState(true);
  const handleBelChange = (event) => {
    const bel = event.target.options[event.target.selectedIndex];
    setSelectedBel(event.target.value);
    console.log("Selected Bel:", event.target.value);
    updateBody({
      idBel: Number(event.target.value),
      voucherDiscount: Number(bel.getAttribute("data-belamount")),
    });
  };

  const handleOngChange = (event) => {
    const ong = event.target.options[event.target.selectedIndex];
    setSelectedOng(event.target.value);
    console.log("Selected Ong:", event.target.value);
    updateBody({
      idOng: Number(event.target.value),
      shippingCostDiscount: Number(ong.getAttribute("data-ongamount")),
    });
  };

  const formatPriceAsIDR = (price) => {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      return "";
    }
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return formatter.format(numericPrice);
  };
  const token = localStorage.getItem("token");
  const authorizationHeader = token ? `Bearer ${token}` : "";
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/vouchers/user",
          {
            headers: {
              Authorization: authorizationHeader,
            },
          }
        );
        console.log("vouc", response);
        setBelData(
          response.data.filter((item) => /BEL/i.test(item.Voucher.name))
        );
        setOngData(
          response.data.filter((item) => /ONG/i.test(item.Voucher.name))
        );
        setMinBel(
          belData.reduce(
            (min, p) =>
              p.Voucher.minTotPrice < min ? p.Voucher.minTotPrice : min,
            belData[0].Voucher.minTotPrice
          )
        );
        setMinOng(
          ongData.reduce(
            (min, p) =>
              p.Voucher.minTotPrice < min ? p.Voucher.minTotPrice : min,
            ongData[0].Voucher.minTotPrice
          )
        );
      } catch (error) {
        console.error("Error fetching data from API 2:", error);
      }
    };
    fetchVoucher();
  }, []);

  useEffect(() => {
    console.log("ong", ongData);
    console.log("bel", belData);
  }, [ongData, belData]);

  function updateShip(updates) {
    setShipping((prevState) => ({
      ...prevState,
      ...updates,
    }));
  }

  function updateBody(updates) {
    setBody((prevState) => ({
      ...prevState,
      ...updates,
    }));
  }
  const handleCheckout = () => {
    console.log(body.shippingMethod);
    if (body.shippingMethod) {
      setIsModalOpen(true);
    } else {
      toast({
        title: "Unfinished Porcess",
        description: "Please finish the process.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const fetchAPI2 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/items",
          {
            headers: {
              Authorization: authorizationHeader,
            },
          }
        );

        if (
          response.data.message === "you have unpaid transaction" &&
          response.data.value === false
        ) {
          setShowUnpaidMessage(true);
        }
        setResponse2(response.data);
        console.log("res2", response);
        const numb = response.data[0].Stock.id_branch;
        // console.log("br", numb);
        setBranch(numb);
        updateBody({ id_branch: numb });
        // console.log("useeffect", branch);
      } catch (error) {
        console.error("Error fetching data from API 2:", error);
      }
    };
    fetchAPI2();
  }, []);

  useEffect(() => {
    const fetchAPI1 = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/cart",
          {
            headers: {
              Authorization: authorizationHeader,
            },
          }
        );

        if (
          response.data.message === "you have unpaid transaction" &&
          response.data.value === false
        ) {
          setShowUnpaidMessage(true);
        }
        setResponse1(response.data);
        updateShip({ weight: response.data.totWeight });

        console.log("res1", response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from API 1:", error);
      }
    };
    fetchAPI1();
  }, []);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (branch !== null) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/user/address/${branch}`,
            {
              headers: {
                Authorization: authorizationHeader,
              },
            }
          );
          console.log("add", response);
          setAddresses(response.data.address);
          updateShip({ origin: response.data.branchCity });
          if (response.data.length > 0) {
            setSelectedAddress(response.data[0].address);
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      }
    };
    fetchAddresses();
  }, [branch]);

  const handleAddressChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    updateShip({ destination: parseInt(event.target.value) });
    setSelectedAddress(event.target.value);
    updateBody({
      userAddress: selectedOption.getAttribute("data-user-address"),
    });
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleShippingOptionChange = (event) => {
    updateShip({ courier: event.target.value });
    setSelectedShippingOption(event.target.value);
    if (shipping.destination && shipping.origin && shipping.weight) {
      updateShip({ ready: true });
    }
  };

  const handleServiceChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    setSelectedService(event.target.value);
    updateBody({
      shippingMethod: selectedOption.getAttribute("name"),
      shippingCost: Number(event.target.value),
    });
    console.log("service", selectedService);
    console.log("event", event.target.value);
  };
  useEffect(() => {
    console.log("body", body);
  }, [service, selectedService, addresses, body]);
  useEffect(() => {
    const fetchShippingData = async () => {
      try {
        const shippingData = await axios.post(
          "http://localhost:8000/api/rajaongkir/cost",
          shipping
        );
        // console.log("bangasat", shippingData.data.rajaongkir);
        setService(shippingData.data.rajaongkir.results[0].costs);
        updateBody({ shipper: shippingData.data.rajaongkir.results[0].name });
      } catch (error) {
        console.error("Error fetching shipping data:", error);
      }
    };
    if (shipping.ready) {
      fetchShippingData();
      updateShip({ ready: false });
    }
  }, [shipping.ready]);
  useEffect(() => {
    console.log(shipping);
  }, [shipping, service]);

  const handleCheckoutConfirmation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/checkout",
        body,
        {
          headers: {
            Authorization: authorizationHeader,
          },
        }
      );

      if (response.status === 201) {
        setIsModalOpen(false);
        navigate("/payment");
      }
    } catch (error) {
      console.error("Error during checkout:", error);

      toast({
        title: "API Error",
        description:
          "An error occurred during checkout. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredOngData = ongData.filter(
    (item) => item.Voucher.minTotPrice <= response1.totPrice
  );
  const filteredBelData = belData.filter(
    (item) => item.Voucher.minTotPrice <= response1.totPrice
  );
  console.log("filterpng", filteredOngData);
  console.log("filterbel", filteredBelData);
  // console.log('totp', response1.totPrice)
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {showUnpaidMessage ? (
        <Box
          flex="1"
          p="4"
          d="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Heading as="h2" size="md" mb="2">
            Your order is unpaid. Please complete the payment.
          </Heading>
          <Button
            colorScheme="teal"
            onClick={() => {
              navigate("/payment");
            }}
          >
            Complete Payment
          </Button>
        </Box>
      ) : (
        <Box
          flex="1"
          p="4"
          d="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          {!response1 || !response2 ? (
            <Box flex="1" p="4">
              <Heading as="h2" size="md" mb="2">
                Your cart is empty, start shopping here
              </Heading>
              <Button colorScheme="teal" onClick={() => navigate("/shop")}>
                Start Shopping
              </Button>
            </Box>
          ) : (
            <>
              <Box flex="1" p="4">
                <Heading as="h2" size="md" mb="2">
                  Cart Items:
                </Heading>
                {response2
                  .slice(0, showMore ? response2.length : 1)
                  .map((item, index) => (
                    <Box key={index} mb="4">
                      <Text>Item {item.Stock.Product.name}</Text>
                      <Text>
                        Price:{" "}
                        {formatPriceAsIDR(
                          item.qty *
                            parseFloat(
                              item.Stock.Product.price *
                                ((100 - item.Stock.discountPercent) / 100)
                            )
                        )}
                      </Text>
                      {/* parseFloat((response1.Stock.Product.price * ((100 -item.Stock.discountPercent)/100))  */}
                      {/* Add more fields as needed */}
                    </Box>
                  ))}

                {response2.length > 1 && (
                  <Button onClick={toggleShowMore} size="sm" colorScheme="teal">
                    {showMore ? "Show Less" : "Show More"}
                  </Button>
                )}
              </Box>
              <Box flex="1" p="4">
                <Heading as="h2" size="md" mb="2">
                  Cart:
                </Heading>
                <Text>
                  {" "}
                  Total Price: {formatPriceAsIDR(response1.totPrice)}
                </Text>
                <Text> Total Items: {response1.totQty}</Text>
                <Text> Total Weight: {response1.totWeight}gr</Text>
                <Text>
                  {" "}
                  Total Shipping Cost:{" "}
                  {formatPriceAsIDR(
                    selectedService - Number(body.shippingCostDiscount)
                  )}
                </Text>
                <Text>
                  {" "}
                  Total Product Discount:{" "}
                  {formatPriceAsIDR(
                    response1.totDiscount + Number(body.voucherDiscount)
                  )}
                </Text>

                <br />
                {filteredBelData.length === 0 && belData.length !== 0 && (
                  <Text mb="2">
                    {" "}
                    You are {formatPriceAsIDR(minBel - response1.totPrice)}{" "}
                    short to use your goods voucher{" "}
                  </Text>
                )}
                {filteredOngData.length === 0 && ongData.length !== 0 && (
                  <Text mb="2">
                    {" "}
                    You are {formatPriceAsIDR(minOng - response1.totPrice)}{" "}
                    short to use your delivery voucher{" "}
                  </Text>
                )}
                <Flex
                  direction="column"
                  justifyContent="space-between"
                  height="100%"
                >
                  <Box>
                    {addresses.length > 0 && (
                      <Box
                        border="1px"
                        borderColor="black"
                        borderRadius="md"
                        p="2"
                        width={"400px"}
                        mb="3"
                      >
                        <Heading as="h2" size="md" mb="2">
                          Select Shipment Address:
                        </Heading>
                        <Select
                          value={selectedAddress}
                          onChange={handleAddressChange}
                          mt="4"
                          width={"300px"}
                        >
                          <option value="" disabled>
                            Select shipment address
                          </option>
                          {addresses.map((address) => (
                            <option
                              key={address.id}
                              value={address.userCity}
                              data-user-address={address.userAddress}
                            >
                              {`${address.userName} - ${address.userAddress}`}
                            </option>
                          ))}
                        </Select>
                      </Box>
                    )}
                    {selectedAddress && (
                      <>
                        <Box
                          border="1px"
                          borderColor="black"
                          borderRadius="md"
                          p="2"
                          width={"400px"}
                          mb="3"
                        >
                          <Heading as="h2" size="md" mb="2">
                            Shipping Options:
                          </Heading>
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
                        <Box
                          border="1px"
                          borderColor="black"
                          borderRadius="md"
                          p="2"
                          width={"400px"}
                          mb="3"
                        >
                          <Heading as="h2" size="md" mb="2">
                            Service Options:
                          </Heading>
                          <Select
                            value={selectedService}
                            onChange={handleServiceChange}
                            mt="4"
                            width="200px"
                          >
                            <option value="">
                              {service.length === 0
                                ? "Choose a courier first"
                                : "Select a service"}
                            </option>
                            {service.map((serv) => (
                              <option
                                key={serv.service}
                                value={serv.cost[0].value}
                                name={serv.description}
                              >
                                {serv.service}
                              </option>
                            ))}
                          </Select>
                        </Box>
                      </>
                    )}
                    <Box
                      border="1px"
                      borderColor="black"
                      borderRadius="md"
                      p="2"
                      width={"400px"}
                      mb="3"
                    >
                      <Heading as="h2" size="md" mb="2">
                        Select Goods Voucher:
                      </Heading>
                      <Select
                        value={selectedBel}
                        onChange={handleBelChange}
                        width={"100%"}
                      >
                        <option value="">
                          {filteredBelData.length === 0
                            ? "You have no voucher"
                            : "Select a goods voucher"}
                        </option>
                        {filteredBelData.map((item) => (
                          <option
                            value={item.id}
                            key={item.id}
                            data-belamount={item.Voucher.discountPrice}
                          >
                            {item.Voucher.name}
                          </option>
                        ))}
                      </Select>
                    </Box>

                    <Box
                      border="1px"
                      borderColor="black"
                      borderRadius="md"
                      p="2"
                      width={"400px"}
                      mb="3"
                    >
                      <Heading as="h2" size="md" mb="2">
                        Select Shipment Voucher:
                      </Heading>
                      <Select
                        value={selectedOng}
                        onChange={handleOngChange}
                        width={"100%"}
                      >
                        <option value="">
                          {filteredOngData.length === 0
                            ? "You have no voucher"
                            : "Select a delivery voucher"}
                        </option>
                        {filteredOngData.map((item) => (
                          <option
                            value={item.id}
                            key={item.id}
                            data-ongamount={item.Voucher.discountPrice}
                          >
                            {item.Voucher.name}
                          </option>
                        ))}
                      </Select>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="left" mt="4">
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
                  <ModalBody></ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="teal"
                      mr={3}
                      onClick={handleCheckoutConfirmation}
                    >
                      Yes
                    </Button>
                    <Button
                      colorScheme="gray"
                      onClick={() => setIsModalOpen(false)}
                    >
                      No
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default Checkout;
