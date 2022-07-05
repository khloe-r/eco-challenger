import { Header, Button, Input } from "../components";
import { Stack } from "@chakra-ui/react";

const SignUp = () => {
  return (
    <>
      <Header>Sign Up</Header>
      <Stack direction="column" spacing={4} align="center" justifyContent={"center"}>
        <Input label="username" />
        <Input label="password" />
        <Button variant="invert">Submit</Button>
      </Stack>
    </>
  );
};

export default SignUp;
