import { Header, Card, Text } from "../components";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";
import Intro from "./Intro";
import { SimpleGrid, Image, Flex } from "@chakra-ui/react";

const Dashboard = ({ user, setUser }) => {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [joinDate, setJoinDate] = useState("");
  const [pfp, setPfp] = useState(0);

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const getUser = useCallback(async () => {
    await EcoChallengeDataService.getUser()
      .then(async (response) => {
        if (response.status === 200) {
          setUser({ loggedIn: "true", username: response.data.user.name });
          setUserInfo(response.data.user);
          await EcoChallengeDataService.getUserJoin({ user_id: response.data.user._id })
            .then((res) => {
              console.log(res);
              setJoinDate(res.data.timestamp);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setUser({ loggedIn: "false", username: "" });
          navigate("/log-in");
        }
      })
      .catch((e) => {
        console.log(e);
        setUser({ loggedIn: "false", username: "" });
        navigate("/log-in");
      });
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  if (!user || !userInfo) {
    return <Header>Loading...</Header>;
  }

  if (userInfo.profile_photo === "") {
    return <Intro info={userInfo} setPfp={setPfp} pfp={pfp} />;
  }

  console.log(userInfo);

  return (
    <>
      <Header>{user.username}'s Dashboard!</Header>
      <SimpleGrid columns={2} spacing={10} px={20}>
        <Card>
          <Flex justify={"center"}>
            <Flex borderWidth={"thick"} borderColor="brand.100" borderRadius="full" width={100} justify="center">
              <Image borderRadius="full" boxSize="150px" h={50} m={5} src={userInfo.profile_photo} alt={`Your profile picture`} />
            </Flex>
          </Flex>
          <Text size="large">{user.username}</Text>
          <Text size={"small"}>Joined since {joinDate.slice(0, 10)}</Text>
        </Card>
        <Card>
          <Text size="large">Today's Goals</Text>
        </Card>
      </SimpleGrid>
    </>
  );
};

export default Dashboard;
