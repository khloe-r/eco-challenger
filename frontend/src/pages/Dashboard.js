import { Header, Input, Button } from "../components";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";

const Dashboard = ({ user, setUser }) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [u, setU] = useState({});

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const getUser = useCallback(async () => {
    await EcoChallengeDataService.getUser()
      .then((response) => {
        if (response.status === 200) {
          setUser({ loggedIn: "true", username: response.data.user.name });
          navigate("/dashboard");
        } else {
          setUser({ loggedIn: "false", username: "" });
          navigate("/login");
        }
      })
      .catch((e) => {
        console.log(e);
        navigate("/login");
      });
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <Header>Welcome {user.username}!</Header>
      <Input label="name" onChange={onChangeName} />
      <Button variant="invert">Submit</Button>
    </>
  );
};

export default Dashboard;
