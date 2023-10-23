import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import TransactionTable from '../../../components/admin/TransactionTable';
// import { Box, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Select } from '@chakra-ui/react';
// import { useTable, useSortBy, usePagination, useFilters } from 'react-table';

// const TransactionTable = ({ data }) => {
//   const columns = useMemo(
//     () => [
//       { Header: 'ID', accessor: 'id' },
//       { Header: 'User Address', accessor: 'userAddress' },
//       { Header: 'Branch', accessor: 'Branch.name' },
//       { Header: 'Total Price', accessor: 'totPrice' },
//       { Header: 'Total Quantity', accessor: 'totQty' },
//       { Header: 'Status', accessor: 'Transaction_Status.status' },
//       { Header: 'Created At', accessor: 'createdAt' },
//     ],
//     []
//   );

//   const [selectedBranch, setSelectedBranch] = useState('');

//   const filteredData = useMemo(() => {
//     if (selectedBranch === '') {
//       return data;
//     } else {
//       return data.filter((transaction) => transaction.Branch.name === selectedBranch);
//     }
//   }, [data, selectedBranch]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     state: { pageIndex, pageSize },
//     setPageSize,
//     setFilter,
//     setSortBy,
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     useFilters,
//     useSortBy,
//     usePagination
//   );

//   return (
//     <Box>
//       <Table {...getTableProps()} variant="striped" size="sm">
//         <Thead>
//           {headerGroups.map((headerGroup) => (
//             <Tr {...headerGroup.getHeaderGroupProps()}>
//               {headerGroup.headers.map((column) => (
//                 <Th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}</Th>
//               ))}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody {...getTableBodyProps()}>
//           {page.map((row) => {
//             prepareRow(row);
//             return (
//               <Tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => (
//                   <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
//                 ))}
//               </Tr>
//             );
//           })}
//         </Tbody>
//       </Table>
//       <Box mt={4} display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <Button
//             size="sm"
//             onClick={() => setPageSize(10)}
//             variant={pageSize === 10 ? 'solid' : 'outline'}
//           >
//             10
//           </Button>
//           <Button
//             size="sm"
//             onClick={() => setPageSize(20)}
//             variant={pageSize === 20 ? 'solid' : 'outline'}
//           >
//             20
//           </Button>
//           <Button
//             size="sm"
//             onClick={() => setPageSize(50)}
//             variant={pageSize === 50 ? 'solid' : 'outline'}
//           >
//             50
//           </Button>
//         </Box>
//         <Box>
//           <Input
//             size="sm"
//             placeholder="Search..."
//             onChange={(e) => setFilter('userAddress', e.target.value)}
//           />
//           <Select
//             size="sm"
//             placeholder="Sort By"
//             onChange={(e) => setSortBy([{ id: 'createdAt', desc: e.target.value === 'desc' }])}
//           >
//             <option value="asc">Ascending</option>
//             <option value="desc">Descending</option>
//           </Select>
//           <Select
//             size="sm"
//             placeholder="Filter by Branch"
//             value={selectedBranch}
//             onChange={(e) => setSelectedBranch(e.target.value)}
//           >
//             <option value="">All Branches</option>
//             <option value="Branch 1">Branch 1</option>
//             <option value="Branch 2">Branch 2</option>
//             {/* Add more options for each branch */}
//           </Select>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

const TransactionsOrder = () => {
  const [transactions, setTransactions] = useState([]);

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
        setTransactions(response.data.transaction);
      } catch (error) {
        console.error('Error:', error);
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