import React, { useEffect, useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useFilters,
  useGlobalFilter,
} from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Input,
  Select,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TransactionYK() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedUser, setSelectedUser] = useState("All Users");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/transaction/branch",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // //console.log("tr", response);
      setTransactions(response.data.transactions);
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  function generateUserOptions(data) {
    const userSet = new Set();
    data.forEach((item) => {
      if (item.User && item.User.name) {
        userSet.add(item.User.name);
      }
    });
    return [...userSet];
  }

  function generateStatusOptions(data) {
    const statusSet = new Set();
    data.forEach((item) => {
      if (item.Transaction_Status && item.Transaction_Status.status) {
        statusSet.add(item.Transaction_Status.status);
      }
    });
    return [...statusSet];
  }

  const data = useMemo(() => transactions, [transactions]);
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "User Name",
        accessor: "User.name",
      },
      {
        Header: "Status",
        accessor: "Transaction_Status.status",
      },
      {
        Header: "Transaction Created",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        Header: "Transaction Updated",
        accessor: "updatedAt",
        Cell: ({ value }) => new Date(value).toLocaleString(),
      },
    ],
    []
  );
  const defaultColumn = {
    Filter: DefaultColumnFilter,
  };
  function DefaultColumnFilter({ column }) {
    const { filterValue, setFilter } = column;

    // return (
    //   <Input
    //     value={filterValue || ''}
    //     onChange={(e) => setFilter(e.target.value || undefined)}
    //     placeholder={`Filter ${column.Header}`}
    //   />
    // );
  }
  const userOptions = generateUserOptions(transactions);
  const statusOptions = generateStatusOptions(transactions);
  const handleFilterChange = (filterIndex, selectedValue) => {
    setActiveFilter(filterIndex); // Set the currently active filter
    setGlobalFilter(
      selectedValue === `All ${filterIndex === 3 ? "Users" : "Statuses"}`
        ? ""
        : selectedValue,
      filterIndex
    );

    // Update the selected values based on the filter
    switch (filterIndex) {
      case 3:
        setSelectedUser(selectedValue);
        break;
      case 4:
        setSelectedStatus(selectedValue);
        break;
      default:
        break;
    }
  };

  const clearFilters = () => {
    setActiveFilter(null); // Clear the active filter
    setGlobalFilter("", -1); // Clear all filters

    // Reset the selected values
    setSelectedUser("All Users");
    setSelectedStatus("All Statuses");
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: 5 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Select
        width={"400px"}
        value={selectedUser}
        onChange={(e) => handleFilterChange(3, e.target.value)}
      >
        <option value="All Users">All Users</option>
        {userOptions.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </Select>

      <Select
        width={"400px"}
        value={selectedStatus}
        onChange={(e) => handleFilterChange(4, e.target.value)}
      >
        <option value="All Statuses">All Statuses</option>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <Box>{column.canFilter && column.render("Filter")}</Box>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={() => navigate(`/admin/${row.original.id}`)}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          onClick={() => previousPage()}
          isDisabled={!canPreviousPage}
          aria-label="Previous page"
          icon={<ChevronLeftIcon />}
        />
        <div style={{ margin: "0 10px" }}>Page {pageIndex + 1}</div>
        <IconButton
          onClick={() => nextPage()}
          isDisabled={!canNextPage}
          aria-label="Next page"
          icon={<ChevronRightIcon />}
        />
      </div>
    </>
  );
}

export default TransactionYK;
