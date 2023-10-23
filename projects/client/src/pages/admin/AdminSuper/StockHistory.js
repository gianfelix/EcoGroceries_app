
import React, { useEffect, useMemo, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, IconButton, Box ,} from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from 'axios';

function StockHistorySuper() {
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://jcwd011003.purwadhikabootcamp.com/api/transaction/history', {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      console.log('his',result)
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: 'Transaction ID',
        accessor: 'id',
      },
      {
        Header: 'Change in Stock',
        accessor: 'changeQty',
      },
      {
        Header: 'Changed by',
        accessor: 'changedBy',
      },
      {
        Header: 'Changer',
        accessor: 'actor',
        Cell: ({ value }) => value === null ? 0 : value,
      },
    ],
    []
  );

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
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <Box>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
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
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <IconButton
      onClick={() => previousPage()}
      isDisabled={!canPreviousPage}
      aria-label="Previous page"
      icon={<ChevronLeftIcon />}
    />
    <div style={{ margin: '0 10px' }}>Page {pageIndex + 1}</div>
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