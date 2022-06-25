import { Box } from "@chakra-ui/react";

export const Card = ({ children }) => {
  return (
    <Box bg="brand.300" border="4px" borderColor="brand.200" py={10}>
      {children}
    </Box>
  );
};
