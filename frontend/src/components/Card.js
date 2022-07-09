import { Box } from "@chakra-ui/react";

export const Card = ({ children, mt }) => {
  return (
    <Box bg="brand.300" border="4px" borderColor="brand.200" py={10} mt={mt}>
      {children}
    </Box>
  );
};
