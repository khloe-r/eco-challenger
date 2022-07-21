import { Header, Button, Input } from "../components";
import { Alert, AlertIcon, AlertTitle, AlertDescription, FormHelperText, Stack, FormControl } from "@chakra-ui/react";
import EcoChallengeDataService from "../services/EcoChallengeService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ user, setUser }) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
  const onChangePassword = (e) => {
    const name = e.target.value;
    setPassword(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var data = { username: name, password: password };
    await EcoChallengeDataService.handleSignUp(data)
      .then(async (response) => {
        console.log(response.data);
        if (response.data) {
          console.log("good");
          await setUser({ loggedIn: true, username: response.data.username, id: response.data.insertedId });
          console.log(user);
          navigate("/dashboard");
        } else {
          console.log("bad");
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.error);
      });
    // navigate("/dashboard");
  };

  useEffect(() => {
    if (user.loggedIn && user.username) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <>
      <Header>Sign Up</Header>
      <Stack direction="column" spacing={4} align="center" justifyContent={"center"}>
        {error !== "" && (
          <Alert status="error" w="xs">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Input label="username" onChange={onChangeName} />
        <FormControl>
          <Input label="password" onChange={onChangePassword} />
          <FormHelperText>
            Must contain letters and numbers,
            <br /> 8-16 characters in length
          </FormHelperText>
        </FormControl>
        <Button variant="invert" onclick={handleSubmit}>
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default SignUp;
