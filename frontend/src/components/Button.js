import { Button as CButton } from "@chakra-ui/react";

export const Button = ({ children }) => {
  return (
    <CButton fontFamily={"Imprima"} border={"2px"} color="brand.100" backgroundColor={"brand.300"} borderColor="brand.200">
      {children}
    </CButton>
  );
};
