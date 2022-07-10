import { Header, Button, Input } from "../components";
import { Stack } from "@chakra-ui/react";
import EcoChallengeDataService from "../services/EcoChallengeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ user, setUser }) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangePassword = (e) => {
    const name = e.target.value;
    setPassword(name);
  };

  const handleSubmit = async () => {
    var data = { username: name, password: password };
    await EcoChallengeDataService.handleSignUp(data)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          console.log("good");
          setUser({ loggedIn: true, username: response.data.username, id: response.data._id });
          navigate("/dashboard");
        } else {
          console.log("bad");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (user.loggedIn) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <>
      <Header>Sign Up</Header>
      <Stack direction="column" spacing={4} align="center" justifyContent={"center"}>
        <Input label="username" onChange={onChangeName} />
        <Input label="password" onChange={onChangePassword} />
        <Button variant="invert" onclick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default SignUp;
