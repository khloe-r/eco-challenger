import { Stack } from "@chakra-ui/react";
import { Header, Button, Input } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";

const JoinTeam = ({ user }) => {
  let navigate = useNavigate();

  const [code, setCode] = useState("");

  const onChangeCode = (e) => {
    const code = e.target.value;
    setCode(code);
  };

  const handleSubmit = async () => {
    await EcoChallengeDataService.addMember({
      team_id: code,
      user_id: user.id,
    })
      .then((response) => {
        navigate("/dashboard");
      })
      .catch((e) => {
        console.log(e);
        navigate("/login");
      });
  };

  return (
    <>
      <Header>Enter your team code</Header>
      <Stack direction="column" spacing={4} align="center" justifyContent={"center"}>
        <Input label="team code" onChange={onChangeCode} />
        <Button variant="invert" onclick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default JoinTeam;
