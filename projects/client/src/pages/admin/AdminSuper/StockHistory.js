import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Select,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { useTable, useSortBy, usePagination } from "react-table";
import axios from "axios";

function StockHistorySuper() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const [filterInput, setFilterInput] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "http://localhost:8000/api/transaction/history",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log('his',result)
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Change in Stock",
        accessor: "changeQty",
      },
      {
        Header: "Branch",
        accessor: "Stock.Branch.name",
      },
      {
        Header: "Changed by",
        accessor: "changedBy",
      },
      {
        Header: "Changer",
        accessor: "actor",
        Cell: ({ value }) => (value === null ? 0 : value),
      },
      {
        Header: "Date",
        accessor: "createdAt",
      },
    ],
    []
  );
  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilterInput(value);
  };
  const filteredData = useMemo(() => {
    if (filterInput === "All Branches") {
      return data;
    }
    return data.filter((item) => {
      return item.Stock.Branch.name.includes(filterInput);
    });
  }, [data, filterInput]);

  // Create a list of all possible branches
  const branches = useMemo(() => {
    const branches = new Set(data.map((item) => item.Stock.Branch.name));
    return Array.from(branches);
  }, [data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <Box>
      <Select placeholder="Select branch" onChange={handleFilterChange}>
        <option value="All Branches">All Branches</option>
        {branches.map((branch) => (
          <option value={branch}>{branch}</option>
        ))}
      </Select>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
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
    </Box>
  );
}

export default StockHistorySuper;
