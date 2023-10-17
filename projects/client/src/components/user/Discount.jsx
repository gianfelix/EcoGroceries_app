import React, {useState, useEffect} from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import Background from "../../../src/assets/Dsct.png";
import axios from "axios";


export default function Discount() {
  const [vouchers, setVouchers] = useState([]);

  const formatCurrencyIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateRemainingTime = (voucher) => {
    if (voucher.timeValid) {
      const expirationTime = new Date(
        Date.parse(voucher.updatedAt) + voucher.timeValid * 24 * 60 * 60 * 1000 // Convert days to milliseconds
      );
      return expirationTime - new Date();
    }
    return 0;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVouchers((prevVouchers) =>
        prevVouchers.map((voucher) => ({
          ...voucher,
          remainingTime: calculateRemainingTime(voucher),
        }))
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchVouchers = () => {
    axios
      .get("http://localhost:8000/api/vouchers")
      .then((response) => {
        setVouchers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vouchers:", error);
      });
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <Box justify={"center"} bg={useColorModeValue("white", "gray.800")}>
    {vouchers.map((voucher) => (   
    <Link  href="/shop" _hover={{ textDecoration: 'none' }}>
      <Box
        bgImage={`url(${Background})`}
        backgroundSize='contain'  // Set the background image to cover the container
        backgroundPosition="center center"  // Center the background image
        backgroundRepeat="no-repeat"  // Prevent the background image from repeating
        height="20vh"  // Set the height to take up the full viewport height
        width="100%"  // Set the width to take up the full viewport width
      >
        <Flex gap={['','2']}>
            <Box alignSelf={'center'} ml={['1','3']} mt={['5','2']} w={'190px'} h={'150px'}>
                <Heading size={['xs','md']} color={'white'} align={'center'}>
                    Discount
                </Heading>
                <Heading size={['md','2xl']} color={'white'} align={'center'}>
                {voucher.discountPercent}%
                </Heading>
                <Heading size={['xs','sm']} color={'white'} align={'center'}>
                    {voucher.codeVoucher}
                </Heading>
            </Box>
            <Box w={'280px'} h={'150px'} mt={['5','2']}>
                <Heading fontStyle={'italic'} size={['xs','md']} color={'white'} align={'center'}>
                    {voucher.Category.category ? voucher.Category.category : "All Product"} Category
                </Heading>
                <Heading size={['md','lg']} color={'white'} align={'center'} mt={['2','3']}>
                {voucher.name} 
                </Heading>
                <Text fontSize={['xs','md']} color={'white'} align={'center'}>
                    Min-purchase {formatCurrencyIDR(voucher.minTotPrice)}
                </Text>
                <Flex mt={['2', '6']} justify={'space-between'} mr={['2','5']}>
                    <Heading
                        css={{
                            fontSize: '3px', // Ukuran font untuk desktop
                            "@media (max-width: 1536px)": {
                            fontSize: '10px' // Ukuran font untuk perangkat mobile (lebar maksimum 768px)
                            }
                        }}
                        color={'white'}
                        align={'center'}
                    >
                        Max Disc {formatCurrencyIDR(voucher.maxDiscPrice)}
                    </Heading>
                    <Heading
                        css={{
                            fontSize: '3px', // Ukuran font untuk desktop
                            "@media (max-width: 1536px)": {
                            fontSize: '10px' // Ukuran font untuk perangkat mobile (lebar maksimum 768px)
                            }
                        }}
                        color={'white'}
                        align={'center'}
                    >
                        {/* Time Exp : &nbsp;  */}
                        {voucher.timeValid ? (
                        voucher.remainingTime > 0 ? (
                            <span>
                            {Math.floor(voucher.remainingTime / (1000 * 60 * 60))}
                            h{" "}
                            {Math.floor(
                                (voucher.remainingTime % (1000 * 60 * 60)) /
                                (1000 * 60)
                            )}
                            m{" "}
                            {Math.floor(
                                (voucher.remainingTime % (1000 * 60)) / 1000
                            )}
                            s
                            </span>
                        ) : (
                            "Expired"
                        )
                        ) : (
                        "-"
                        )}
                    </Heading>
                </Flex>
            </Box>
        </Flex>
      </Box>
    </Link> 
      ))}
    </Box>
  );
}
