import { Button as CButton } from "@chakra-ui/react";

export const Button = ({ children, onclick, variant = "regular", ...props }) => {
  const variants = {
    backgroundColor: {
      regular: "brand.300",
      invert: "brand.100",
      danger: "red.600",
    },
    color: {
      regular: "brand.100",
      invert: "brand.300",
      danger: "red.200",
    },
    borderColor: {
      regular: "brand.200",
      invert: "brand.100",
      danger: "red.200",
    },
  };

  return (
    <CButton fontFamily={"Imprima"} border={"2px"} color={variants.color[variant]} backgroundColor={variants.backgroundColor[variant]} borderColor={variants.borderColor[variant]} onClick={onclick} {...props}>
      {children}
    </CButton>
  );
};
