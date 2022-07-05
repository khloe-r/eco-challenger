import { Button as CButton } from "@chakra-ui/react";

export const Button = ({ children, onclick, variant = "regular" }) => {
  const isRegular = variant === "regular";

  return (
    <CButton fontFamily={"Imprima"} border={"2px"} color={isRegular ? "brand.100" : "brand.300"} backgroundColor={isRegular ? "brand.300" : "brand.100"} borderColor={isRegular ? "brand.200" : "brand.100"} onClick={onclick}>
      {children}
    </CButton>
  );
};
