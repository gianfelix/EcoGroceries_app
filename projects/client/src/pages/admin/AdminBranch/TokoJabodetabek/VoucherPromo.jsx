import { Box } from "@chakra-ui/react";
import React from "react";
import StockPromo from "../../../../components/admin/StockPromo";
import Vouchers from "../../../../components/admin/Vouchers";

const VoucherPromo = () => {
  return (
    <>
      <Box>
       <StockPromo />
       <Vouchers />
      </Box>
    </>
  );
};

export default VoucherPromo;
