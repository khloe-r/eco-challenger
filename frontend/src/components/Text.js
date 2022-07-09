import { Text as CText } from "@chakra-ui/react";

export const Text = ({ children, size, px }) => {
  return (
    <CText fontSize={size === "small" ? "md" : "4xl"} color="brand.100" fontFamily={"Imprima"} px={px}>
      {children}
    </CText>
  );
};
