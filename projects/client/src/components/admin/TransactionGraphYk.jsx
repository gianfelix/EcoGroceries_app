import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const TransactionGraphYk = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/transaction/branch",
          {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        const transactions = response.data.transactions; // Use response.data.transactions

        const aggregatedData = aggregateSalesByDate(transactions);

        console.log("Aggregated Data:", aggregatedData);

        // Update the chart data
        setGraphData(aggregatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const aggregateSalesByDate = (transactions) => {
    const aggregatedData = {};

    transactions.forEach((entry) => {
      const date = new Date(entry.createdAt).toLocaleDateString("id-ID");
      if (aggregatedData[date]) {
        aggregatedData[date].totalSales += entry.totPrice;
      } else {
        aggregatedData[date] = {
          date: date,
          totalSales: entry.totPrice,
        };
      }
    });

    return Object.values(aggregatedData).reverse(); // Reverse the data
  };

  return (
    <>
      <Heading mb={2} textAlign={"center"} fontSize={"2xl"}>
        Total Sales Per Day Graph
      </Heading>
      <Box display={"flex"} justifyContent={"center"}>
        <LineChart width={1200} height={400} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="totalSales"
            stroke="teal"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </Box>
    </>
  );
};

export default TransactionGraphYk;
