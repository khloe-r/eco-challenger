import { Heading } from "@chakra-ui/react";

export const Header = ({ children }) => {
  return (
    <Heading as="h1" size="3xl" noOfLines={2} mb={5} pt={20} color="brand.100" fontFamily={"Itim"}>
      {children}
    </Heading>
  );
};
