import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import MapOSMAddress from "./MapOSMAddress";


const AddNewAddress = ({ isOpen, onClose }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [data, setData] = useState({
    userName: "",
    userProvince: "",
    userCity: "",
    userAddress: "",
    longitude: "",
    latitude: "",
  });
  const handleLocationSelect = (latitude, longitude) => {
    setData({ ...data, latitude, longitude });
  };

  useEffect(() => {
    const fetchLocation = async () => {
      // Mendapatkan current position menggunakan geolocation API
      try {
        const getCurrentPosition = async () => {
          return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
        }
        const position = await getCurrentPosition();
        setData({
          ...data,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch (error) {
        console.error("Error getting current location:", error);
      }
    };

    fetchProvincesAndCities();
    fetchLocation();  // Panggil untuk mendapatkan current position
  }, [selectedProvinceId]); 

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return;
  }

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const fetchProvincesAndCities = async () => {
    try {
      // Fetch provinces and set them in state
      const provincesResponse = await axios.get("http://localhost:8000/api/rajaongkir/province");
      const provincesData = provincesResponse.data.rajaongkir.results;
      setProvinces(provincesData);

      if (selectedProvinceId) {
        // Fetch cities for the selected province and set them in state
        const citiesResponse = await axios.get(`http://localhost:8000/api/rajaongkir/citybyprovince?province=${selectedProvinceId}`);
        const citiesData = citiesResponse.data.rajaongkir.results;
        setCities(citiesData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/address",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onClose();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  

  return (
    <Box>
      <Modal blockScrollOnMount={false} isCentered isOpen={isOpen} onClose={onClose} size={{ base: "xs", sm: "sm" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader size={{ base: "xs", sm: "sm" }}>Add New Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl colSpan={[6, 3, null, 2]}>
              <FormLabel htmlFor="userName" size={{ base: "xs", sm: "sm" }}>Label Address</FormLabel>
              <Input
                type="text"
                name="userName"
                id="userName"
                autoComplete="userName"
                size={{ base: "xs", sm: "sm" }}
                onChange={handleChange}
                value={data.userName}
              />
            </FormControl>

            <FormControl colSpan={[6, 3]}>
              <FormLabel htmlFor="userProvince">Province</FormLabel>
              <Select
                id="userProvince"
                name="userProvince"
                autoComplete="userProvince"
                placeholder="Select option"
                size={{ base: "xs", sm: "sm" }}
                onChange={(e) => {
                  handleChange(e);
                  setSelectedProvinceId(e.target.value);
                }}
                value={data.userProvince}
              >
                {provinces.map((province) => (
                  <option key={province.province_id} value={province.province_id}>
                    {province.province}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl colSpan={[6, 6, null, 2]}>
              <FormLabel htmlFor="userCity">City</FormLabel>
              <Select
                id="userCity"
                name="userCity"
                autoComplete="userCity"
                placeholder="Select option"
                size={{ base: "xs", sm: "sm" }}
                onChange={handleChange}
                value={data.userCity}
              >
                {cities.map((city) => (
                  <option key={city.city_id} value={city.city_id}>
                    {city.city_name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl colSpan={[6, 3, null, 2]}>
              <FormLabel htmlFor="userAddress" size={{ base: "xs", sm: "sm" }}>Street Address</FormLabel>
              <Input
                type="text"
                name="userAddress"
                id="userAddress"
                autoComplete="subdistrict"
                size={{ base: "xs", sm: "sm" }}
                onChange={handleChange}
                value={data.userAddress}
              />
            </FormControl>

            <Box mt={3} mb={1}>
              <Text fontSize={"sm"} color={"red"} fontWeight={"semibold"}>
              Set and move the marker based on your location!
              </Text>
              <MapOSMAddress
                latitude={data.latitude || -7.43090049} 
                longitude={data.longitude || 109.245643615} 

                onLocationSelect={(lat, lng) => {
                  setData({
                    ...data,
                    latitude: lat,
                    longitude: lng,
                  });
                }}
              />
            </Box>

            <FormControl colSpan={6}>
              <FormLabel htmlFor="longitude" size={{ base: "xs", sm: "sm" }}>Longitude</FormLabel>
              <Input
                type="text"
                name="longitude"
                id="longitude"
                autoComplete="longitude"
                size={{ base: "xs", sm: "sm" }}
                onChange={handleChange}
                value={data.longitude}
              />
            </FormControl>

            <FormControl colSpan={[6, 3, null, 2]} size={{ base: "xs", sm: "sm" }}>
              <FormLabel htmlFor="latitude">Latitude</FormLabel>
              <Input
                type="text"
                name="latitude"
                id="latitude"
                autoComplete="latitude"
                size={{ base: "xs", sm: "sm" }}
                onChange={handleChange}
                value={data.latitude}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose} size={{ base: "xs", sm: "sm" }}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSubmit} size={{ base: "xs", sm: "sm" }}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AddNewAddress;