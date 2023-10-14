"use client";
import React from "react";
import {
  Button,
  Image,
  Stack,
  useColorModeValue,
  Box,
  Flex,
  Text,
  Select,
} from "@chakra-ui/react";

export default function PersonalData() {
  const formatCurrencyIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };
  return (
    <Box justify={"center"} bg={useColorModeValue("white", "gray.800")}>
       <Select size={'sm'} placeholder="By Order Status" mb={'2'}>
            <option value="0">Delivered</option>
            <option value="1">Success</option>
          </Select>
      <Stack
        bg={useColorModeValue("white", "grey.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={'5'}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"}>23/09/2023</Text>
          <Text fontSize={"sm"}>G30SPKI</Text>
          <Button size={"xs"} textColor={"blue.400"}>
             Order Status
          </Button>
          <Button size={"xs"} textColor={"green"}>
            Re-Order
          </Button>
        </Flex>

        <Flex>
          <Box>
            <Image
              src="/images/apple.png"
              boxSize="50px"
              objectFit="cover"
              alt="fruit"
            />
          </Box>

          <Box ml={"2"}>
            <Flex>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Apple
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"sm"}>2</Text>
              <Text fontSize={"sm"}>
                &nbsp;x&nbsp;
              </Text>
              <Text fontSize={"sm"}>{formatCurrencyIDR(2000)}</Text>
              <Text fontSize={"sm"} ml={238}>
                Total Order
              </Text>
            </Flex>
            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              display={"flex"}
              justifyContent={"end"}
            >
              {formatCurrencyIDR(40000)}
            </Text>
          </Box>
        </Flex>
        <Button size={'xs'} textColor={"green"} variant={'outline'}>
          Order Detail
        </Button>
      </Stack>

      <Stack
        bg={useColorModeValue("white", "grey.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={'5'}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"}>23/09/2023</Text>
          <Text fontSize={"sm"}>G30SPKI</Text>
          <Button size={"xs"} textColor={"blue.400"}>
             Order Status
          </Button>
          <Button size={"xs"} textColor={"green"}>
            Re-Order
          </Button>
        </Flex>

        <Flex>
          <Box>
            <Image
              src="/images/apple.png"
              boxSize="50px"
              objectFit="cover"
              alt="fruit"
            />
          </Box>

          <Box ml={"2"}>
            <Flex>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Apple
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"sm"}>2</Text>
              <Text fontSize={"sm"}>
                &nbsp;x&nbsp;
              </Text>
              <Text fontSize={"sm"}>{formatCurrencyIDR(2000)}</Text>
              <Text fontSize={"sm"} ml={238}>
                Total Order
              </Text>
            </Flex>
            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              display={"flex"}
              justifyContent={"end"}
            >
              {formatCurrencyIDR(40000)}
            </Text>
          </Box>
        </Flex>
      </Stack>
      <Stack
        bg={useColorModeValue("white", "grey.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        mb={'5'}
      >
        <Flex justifyContent={"space-between"}>
          <Text fontSize={"sm"}>23/09/2023</Text>
          <Text fontSize={"sm"}>G30SPKI</Text>
          <Button size={"xs"} textColor={"blue.400"}>
             Order Status
          </Button>
          <Button size={"xs"} textColor={"green"}>
            Re-Order
          </Button>
        </Flex>

        <Flex>
          <Box>
            <Image
              src="/images/orange.png"
              boxSize="50px"
              objectFit="cover"
              alt="fruit"
            />
          </Box>

          <Box ml={"2"}>
            <Flex>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                Orange
              </Text>
            </Flex>
            <Flex>
              <Text fontSize={"sm"}>2</Text>
              <Text fontSize={"sm"}>
                &nbsp;x&nbsp;
              </Text>
              <Text fontSize={"sm"}>{formatCurrencyIDR(2000)}</Text>
              <Text fontSize={"sm"} ml={238}>
                Total Order
              </Text>
            </Flex>
            <Text
              fontSize={"sm"}
              fontWeight={"bold"}
              display={"flex"}
              justifyContent={"end"}
            >
              {formatCurrencyIDR(40000)}
            </Text>
          </Box>
        </Flex>
      </Stack>
    </Box>
  );
}
