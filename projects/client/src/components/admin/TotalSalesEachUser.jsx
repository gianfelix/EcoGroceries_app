import React, { useState, useEffect } from "react";
import { Box, Heading } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";

const TotalSalesEachUser = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/transaction"
        );
        const transactions = response.data.transactions;

        const aggregatedData = aggregateSalesByUser(transactions);

        console.log("Aggregated Data:", aggregatedData);

        setGraphData(aggregatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const aggregateSalesByUser = (transactions) => {
    const aggregatedData = {};

    transactions.forEach((entry) => {
      const userId = entry.User.id;
      const userName = entry.User.name;

      if (aggregatedData[userId]) {
        aggregatedData[userId].totalSales += entry.totPrice;
      } else {
        aggregatedData[userId] = {
          userId,
          userName,
          totalSales: entry.totPrice,
        };
      }
    });

    return Object.values(aggregatedData);
  };

  return (
      <>
      <Heading mb={2} textAlign={"center"} fontSize={"2xl"}>
        Total Sales Per User Graph
      </Heading>
      <Box display={"flex"} justifyContent={"center"}>
        <BarChart width={1200} height={300} data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userName" />
          <YAxis label={{ value: 'Total Sales (Rp)', angle: -90, position: 'insideLeft' }} />
          <Tooltip formatter={(value) => `Rp ${value}`} />
          <Legend />
          <Bar dataKey="totalSales" fill="teal" />
        </BarChart>
      </Box>
    </>
  );
};

export default TotalSalesEachUser;
