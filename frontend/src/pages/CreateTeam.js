import { Stack } from "@chakra-ui/react";
import { Header, Button, Input } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";

const CreateTeam = ({ user }) => {
  let navigate = useNavigate();

  const [name, setName] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const handleSubmit = async () => {
    await EcoChallengeDataService.addTeam({
      owner: user.id,
      name: name,
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
      <Header>Enter your team name</Header>
      <Stack direction="column" spacing={4} align="center" justifyContent={"center"}>
        <Input label="team name" onChange={onChangeName} />
        <Button variant="invert" onclick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default CreateTeam;
