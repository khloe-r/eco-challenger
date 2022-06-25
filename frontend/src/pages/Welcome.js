import { Stack } from "@chakra-ui/react";
import { Header, Button } from "../components";

const Welcome = () => {
  return (
    <>
      <Header>
        Welcome to
        <br />
        Eco-Challenger
      </Header>
      <Stack direction="row" spacing={4} align="center" justifyContent={"center"}>
        <Button>Sign Up</Button>
        <Button>Log In</Button>
      </Stack>
    </>
  );
};

export default Welcome;
