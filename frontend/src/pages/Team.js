import { Header, Card, Text, Button } from "../components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback, useRef } from "react";
import EcoChallengeDataService from "../services/EcoChallengeService";
import { useDisclosure, SimpleGrid, Box, Flex, Avatar, Checkbox, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";

const Team = ({ user, setUser }) => {
  let { team_id } = useParams();
  let navigate = useNavigate();
  const [team, setTeam] = useState();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const getTeam = useCallback(async () => {
    await EcoChallengeDataService.getUser()
      .then(async (response) => {
        if (response.status === 200) {
          setUser({ loggedIn: true, username: response.data.user.name, id: response.data.user._id });
          console.log(team_id, response.data.user._id);
          await EcoChallengeDataService.getTeam(team_id, response.data.user._id)
            .then(async (response) => {
              setTeam(response.data);
              console.log(response.data);
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
  }, [user]);

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
          <Flex align={"center"} direction={"column"}>
            {team.members?.length === 0 && <Text size="small">No members have joined!</Text>}
            {team.members?.map((member, index) => {
              return (
                <Box bg={"brand.200"} w="80%" rounded="lg" shadow="sm" py={2} my={3} position="relative">
                  <Flex justify={"space-between"} align={"center"} mx={5}>
                    <Avatar bg="brand.200" mr={10} src={member.profile_photo} />
                    <Flex align={"flex-end"} direction={"column"}>
                      <Text>
                        {index + 1}. {member.name}
                      </Text>
                      <Text fontWeight={"extrabold"} size={"small"}>
                        {member.score} pts
                      </Text>
                    </Flex>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
        </Card>
        <Card backgroundColor={"brand.100"}>
          <Text size="large" color={"brand.300"}>
            Team Goals
          </Text>
          {team.goals?.length === 0 && (
            <Text size="small" color={"brand.300"}>
              There are no goals this week!
            </Text>
          )}
          <Flex justify={"center"}>
            <Box w={"50%"}>
              <Flex justify={"center"} align={"flex-start"} direction={"column"}>
                {team.goals.map((goal) => {
                  return (
                    <Checkbox colorScheme={"brand"} size="lg" color={"brand.300"} fontFamily={"Imprima"} my={"1"} borderColor={"Background.100"}>
                      {goal}
                    </Checkbox>
                  );
                })}
              </Flex>
            </Box>
          </Flex>
        </Card>
      </SimpleGrid>
      <Box pt={20} pb={!team.owner ? 20 : 0}>
        <Header size="large">Invite Members</Header>
        <Text size="large">
          Your team code is{" "}
          <Text size="large" fontWeight={"bold"}>
            {team_id}
          </Text>
        </Text>
      </Box>

      {team.owner && (
        <Box pb={60}>
          <Header size="large">Team Settings </Header>
          <Text fontStyle={"italic"} size="small">
            (only for owner)
          </Text>
          <Text mt="10" size="large">
            Goals
          </Text>
          <Flex justify={"center"}>
            <Button mr="10" variant="invert">
              Add Goals
            </Button>
            <Button variant="invert">Edit Goals</Button>
            <Button ml="10" variant="invert">
              Delete Goals
            </Button>
          </Flex>
          <Text mt="10" size="large">
            Danger!
          </Text>
          <Button variant="danger" onclick={onOpen}>
            Delete Team
          </Button>
        </Box>
      )}

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent backgroundColor={"brand.300"} borderColor="brand.100" borderWidth={4}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold" fontFamily={"Imprima"} color={"brand.100"}>
              Delete Customer
            </AlertDialogHeader>

            <Text size={"small"} px={6}>
              Are you sure? You can't undo this action afterwards.
            </Text>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Team;
