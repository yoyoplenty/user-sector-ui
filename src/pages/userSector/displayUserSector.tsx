import { Button } from "@chakra-ui/button";
import { Card } from "@chakra-ui/card";
import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { appStore } from "../../store";
import { getData } from "../../utils/helpers/request";
import { useQuery } from "@tanstack/react-query";
import { GenericResponse } from "../../utils/types/response";
import { Link } from "react-router-dom";

const DisplayUserSector = () => {
  const store = appStore();

  const user = store.authUser;

  async function getUserSector(): Promise<GenericResponse> {
    return await getData(`/user-sectors`, store.authUser.token);
  }

  const getUserSectors = useQuery({ queryKey: ["get-user-sectors"], queryFn: getUserSector });
  const userSectors = getUserSectors?.data?.data;

  return (
    <Box>
      <Flex m={[4, 8]} direction="column" alignItems="flex-start" gap="4">
        <Text as="b" fontSize="xl">
          {user && `${user.firstName} ${user.lastName}`}
        </Text>
      </Flex>

      <Flex justifyContent="center" mt="92px">
        <Card width={{ base: "90%", md: "80%", lg: "60%", xl: "50%" }} p={{ base: "20px", md: "40px" }}>
          <Stack spacing="24px">
            <Flex justifyContent="space-between" alignItems="center">
              <Heading fontSize="2xl">All User's Sectors</Heading>

              <Button fontSize="xs" width={{ md: "215px" }}>
                <Link to={"/add-user-sector"}>Add New</Link>
              </Button>
            </Flex>

            {userSectors &&
              userSectors?.map((item: any) => (
                <Box border="1px solid rgba(123, 123, 123, 0.50)" p="16px" borderRadius="8px" key={item._id}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text>{item.sector.name}</Text>
                  </Flex>
                </Box>
              ))}
          </Stack>
        </Card>
      </Flex>
    </Box>
  );
};

export default DisplayUserSector;
