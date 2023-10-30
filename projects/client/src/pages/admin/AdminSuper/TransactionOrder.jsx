import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import TransactionTable from "../../../components/admin/TransactionTable";

const TransactionsOrder = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/transaction",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setTransactions(response.data.transaction);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Transactions Order</h1>
      <TransactionTable data={transactions} />
    </div>
  );
};
export default TransactionsOrder;
