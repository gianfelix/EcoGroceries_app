import React from 'react';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';

const PaginationContainer = ({currentPage, setCurrentPage, selectedProduct, totalPages}) => {
  return (
    <Container
      d="flex"
      maxWidth="7xl"
      w="full"
      alignItems="center"
    >
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        howNext={selectedProduct && selectedProduct.length > 0}
      />
    </Container>
  );
};

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  const getpages = () => {
    let pages = []
    for (let i = 1 ; i <= totalPages ; i++ ) {
      pages.push(i)
    }
    return pages
  }
  const isMobile = window.innerWidth <= 768;
  return (
    <Flex
      as="nav"
      aria-label="Pagination"
      w="full"
      justify="center"
      alignItems="center"
      mt={{ base: 3, md: 0 }}
    >
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
        style={{ fontSize: isMobile ? '14px' : '', padding: isMobile ? '5px 10px' : '' }}
      >
        Previous
      </PaginationButton>
      {getpages().map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          isActive={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
          style={{ fontSize: isMobile ? '14px' : '', padding: isMobile ? '5px 10px' : '' }}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        isDisabled={currentPage===totalPages}
        style={{ fontSize: isMobile ? '14px' : '', padding: isMobile ? '5px 10px' : '' }}
      >
        Next
      </PaginationButton>
    </Flex>
  );
};

const PaginationButton = ({ children, isDisabled, isActive, ...props }) => {
  const activeStyle = {
    bg: useColorModeValue('gray.300', 'gray.700')
  };

  return (
    <Flex
      p={3}
      px={4}
      fontSize="md"
      fontWeight="500"
      lineHeight={0.8}
      opacity={isDisabled && 0.7}
      _hover={!isDisabled && activeStyle}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      border="1px solid"
      mr="-1px"
      borderColor={useColorModeValue('gray.300', 'gray.700')}
      {...(isActive && activeStyle)}
      {...props}
    >
      {children}
    </Flex>
  );
};

export default PaginationContainer;
