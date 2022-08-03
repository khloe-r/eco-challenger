import { Stack } from "@chakra-ui/react";
import { Header, Button } from "../components";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  let navigate = useNavigate();

  return (
    <>
      <Header>
        Welcome to
        <br />
        Eco-Challenger
      </Header>
      <Stack direction="row" spacing={4} align="center" justifyContent={"center"}>
        <Button onclick={() => navigate("/sign-up")}>Sign Up</Button>
        <Button onclick={() => navigate("/log-in")}>Log In</Button>
      </Stack>
    </>
  );
};

export default Welcome;
