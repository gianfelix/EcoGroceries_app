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
      .get("https://jcwd011003.purwadhikabootcamp.com/api/vouchers")
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
        height="auto"  // Set the height to take up the full viewport height
        width="100%"  // Set the width to take up the full viewport width
      >
        <Flex gap={['','2']}>
            <Box alignSelf={'center'} ml={['1','3']} mt={['0','0']} w={'190px'} h={'150px'} pt={{base:'1', md: '3'}}>
                <Heading size={['xs','md']} pt={{base: '7', md: '0'}} color={'white'} align={'center'}>
                    Discount
                </Heading>
                <Heading
                  size={{base: 'md', md: 'lg'}}
                  color={'white'}
                  align={'center'}
                >
                  {voucher.discountPercent >= 1
                    ? `${voucher.discountPercent}%  `
                    : `${formatCurrencyIDR(voucher.discountPrice)} `}
                </Heading>

                <Heading size={['xs','sm']} color={'white'} align={'center'} >
                    {voucher.codeVoucher}
                </Heading>
            </Box>
            <Box w={'280px'} h={'150px'} mt={['1','3']} pt={2}>
                <Heading fontStyle={'italic'} size={['xs','md']} color={'white'} align={'center'} pt={{base: '5', md: '0'}}>
                    {voucher?.Category?.category ? voucher?.Category?.category : "All Product"} Category
                </Heading>
                <Heading size={['sm','lg']} color={'white'} align={'center'} mt={['1','1']}>
                {voucher.name} 
                </Heading>
                <Text fontSize={['xs','md']} color={'white'} align={'center'}>
                    Min-purchase {formatCurrencyIDR(voucher.minTotPrice)}
                </Text>
                <Flex mt={['2', '2']} justify={'space-around'} mr={['2','5']}>
                    <Text
                    fontWeight={'bold'}
                        fontSize={['xs','md']}
                        color={'white'}
                        align={'center'}
                    >
                        Max Disc {formatCurrencyIDR(voucher.maxDiscPrice)}
                    </Text>
                    <Text
                    fontWeight={'bold'}
                        fontSize={['xs','md']}
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
                    </Text>
                </Flex>
            </Box>
        </Flex>
      </Box>
    </Link> 
      ))}
    </Box>
  );
}
