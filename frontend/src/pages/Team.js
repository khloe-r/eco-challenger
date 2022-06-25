import { Header, Card, Text } from "../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";
import { SimpleGrid } from "@chakra-ui/react";

const Team = () => {
  let { team_id } = useParams();
  const [team, setTeam] = useState();

  const getTeam = () => {
    EcoChallengeDataService.getTeam(team_id)
      .then((response) => {
        setTeam(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTeam();
  }, []);

  if (!team) {
    return <Header>Loading</Header>;
  }
  return (
    <>
      <Header>{team.team_name}</Header>
      <SimpleGrid columns={2} spacing={10} px={20}>
        <Card>
          <Text size="large">Standings</Text>
          {team.members.length === 0 && <Text size="small">No members have joined!</Text>}
        </Card>
        <Card>
          <Text size="large">Team Goals</Text>
        </Card>
      </SimpleGrid>
    </>
  );
};

export default Team;
