import { Stack, Box } from "@chakra-ui/react";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";
import EcoChallengeDataService from "../services/EcoChallengeService";

const Navbar = ({ user, setUser }) => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    console.log("logging out");
    await EcoChallengeDataService.handleLogout()
      .then((response) => {
        setUser({ loggedIn: false, username: "", id: "" });
        console.log(user);
        navigate("/log-in");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box pt={10} px={20}>
      {user.loggedIn && (
        <Stack direction="row" spacing={4} align={"center"} justifyContent={"space-between"}>
          <Stack direction="row" spacing={4} align={"center"} justifyContent={"flex-start"}>
            <Button onclick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button onclick={() => navigate("/join-team")}>Join a Team</Button>
            <Button onclick={() => navigate("/create-team")}>Create a Team</Button>
          </Stack>
          <Button onclick={handleLogout}>Log Out</Button>
        </Stack>
      )}

      {!user.loggedIn && (
        <Stack direction="row" spacing={4} align={"center"} justifyContent={"flex-end"}>
          <Button onclick={() => navigate("/log-in")}>Log In</Button>
          <Button onclick={() => navigate("/sign-up")}>Sign Up</Button>
        </Stack>
      )}
    </Box>
  );
};

export default Navbar;
