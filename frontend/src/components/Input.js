import { Input as CInput } from "@chakra-ui/react";

export const Input = ({ label, onChange }) => {
  return <CInput placeholder={label} width={"25%"} backgroundColor={"brand.300"} color={"brand.100"} borderColor={"brand.100"} borderWidth={2} _hover={{ borderColor: "brand.100" }} onChange={onChange} />;
};
