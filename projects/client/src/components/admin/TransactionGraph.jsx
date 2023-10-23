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

const TransactionGraph = () => {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jcwd011003.purwadhikabootcamp.com/api/transaction", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const transactions = response.data.transaction;

      
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

    return Object.values(aggregatedData);
  };

  return (
    <>
      <Heading mb={2} textAlign={"center"} fontSize={"2xl"}>
        Total Sales Per Day Graph
      </Heading>
      <Box display={"flex"} justifyContent={"center"}>
        <LineChart width={1200} height={400} data={graphData}> {/* Reverse the data */}
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

export default TransactionGraph;
