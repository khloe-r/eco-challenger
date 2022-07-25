import { Image, Flex } from "@chakra-ui/react";
import { Header, Text, Button } from "../components";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import EcoChallengeDataService from "../services/EcoChallengeService";

const Intro = ({ info, setPfp, pfp }) => {
  const emojis = ["face_with_tears_of_joy", "red_heart", "sparkles", "face_with_tongue", "sun"];

  const handleSubmit = async () => {
    await EcoChallengeDataService.editUser({
      user_id: info["_id"],
      pfp: `https://emojiapi.dev/api/v1/${emojis[pfp]}.svg`,
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Header>Welcome {info.name}</Header>
      <Text size={"small"}>Select your emoji profile picture!</Text>
      <Tabs variant="soft-rounded" colorScheme="brand" px={"10"} mt={"3"} onChange={(index) => setPfp(index)}>
        <Flex justify={"center"}>
          <TabList>
            {emojis.map((emoji) => (
              <Tab>
                <Image alt="emoji" h={10} src={`https://emojiapi.dev/api/v1/${emoji}.svg`} />
              </Tab>
            ))}
          </TabList>
        </Flex>
        <TabPanels>
          {emojis.map((emoji, index) => (
            <TabPanel>
              <Flex align={"center"} justify={"center"}>
                You selected <Image maxH={10} px={2} alt="emoji" src={`https://emojiapi.dev/api/v1/${emoji}.svg`} /> as your profile picture!
              </Flex>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
      <Button variant="invert" onclick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default Intro;
