import { Header, Card, Text } from "../components";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";
import Intro from "./Intro";
import { SimpleGrid, Image, Flex, Box } from "@chakra-ui/react";

const Dashboard = ({ user, setUser }) => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [rank, setRank] = useState("");
  const [pfp, setPfp] = useState(0);

  const getUser = useCallback(async () => {
    await EcoChallengeDataService.getUser()
      .then(async (response) => {
        if (response.status === 200) {
          setUser({ loggedIn: true, username: response.data.user.name, id: response.data.user._id });
          setUserInfo(response.data.user);
          const score = response.data.user.total_points;
          await EcoChallengeDataService.getRank(score)
            .then((response) => {
              console.log(response);
              setRank(response.data.rank);
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          setUser({ loggedIn: false, username: "", id: "" });
          navigate("/log-in");
        }
      })
      .catch((e) => {
        console.log(e);
        setUser({ loggedIn: false, username: "", id: "" });
        navigate("/log-in");
      });
  }, [user, userInfo]);

  useEffect(() => {
    getUser();
  }, []);

  if (!user || !userInfo) {
    return <Header>Loading...</Header>;
  }

  if (userInfo.profile_photo === "") {
    return <Intro info={userInfo} setPfp={setPfp} pfp={pfp} />;
  }

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
          <Text size={"small"}>Joined since {userInfo.timestamp?.slice(0, 10)}</Text>
          <SimpleGrid columns={2} spacing={10}>
            <Box>
              <Text size="small">Ranked</Text>
              <Text size="large">#{rank}</Text>
              <Text size="small">Worldwide</Text>
            </Box>
            <Box>
              <Text size="small">Total Points</Text>
              <Text size="large">{userInfo.total_points}</Text>
            </Box>
          </SimpleGrid>
        </Card>
        <Card>
          <Text size="large">Today's Goals</Text>
          {userInfo.teams?.length === 0 && (
            <Text size="small" px={"2"}>
              Join or create a team to see your goals!
            </Text>
          )}
        </Card>
      </SimpleGrid>
      <Box mt={20} pb={20}>
        <Header>My Standings</Header>
        {userInfo.teams?.length === 0 && (
          <Text size="small" px={"2"}>
            Join or create a team to see your standings!
          </Text>
        )}
        {userInfo.team_info?.map((team) => {
          return (
            <Text>
              {team.team_name} - Rank: {team?.scores[0]?.rank}
            </Text>
          );
        })}
      </Box>
      <Box pb={20}>
        {userInfo.owns?.length > 0 && <Header>My Teams</Header>}
        {userInfo.owns?.map((team) => {
          return <Text>{team.team_name}</Text>;
        })}
      </Box>
    </>
  );
};

export default Dashboard;
