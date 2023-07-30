import {
  Box,
  Container,
  Flex,
  Link,
  SimpleGrid,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  useClipboard,
  Popover,
  PopoverTrigger,
  PopoverContent,
  HStack,
} from "@chakra-ui/react";
import Progress from "./Progress";
import TaskTable from "./TaskTable";
import { CopyIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import LeaderBoard from "./LeaderBoard";

const AirdropPage = () => {
  return (
    <Container
      bgGradient="linear(180deg, #3146C6 0%, #18215D 100%)"
      maxW={""}
      paddingX={"90px"}
    >
      <Text fontSize="5xl" textAlign="center" color={"#5EEDFF"}>
        PIRA SEASON 1
      </Text>

      <Progress />

      <Text fontSize="3xl" textAlign="center" color="white" my={6}>
        {/* <Text
          as={"span"}
          mx={1}
          width="max-content"
          fontSize="3xl"
          color="#5EEDFF"
        >
          $200K
        </Text> */}
        All transaction fees will be used for buyback when the token is listed
        on CEX
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        width={{ base: "full", lg: "95%" }}
        marginX="auto"
        spacing={10}
      >
        <Box
          rounded="lg"
          borderWidth={2}
          borderColor={"cyan.400"}
          color="white"
          bg="blue.900"
          role="group"
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            h="100%"
          >
            <HStack>
              <Text fontSize="3xl">Earning Token</Text>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <InfoOutlineIcon color={"#00F0FF"} />
                </PopoverTrigger>
                <PopoverContent width={"194px"} height={"60px"} border="none">
                  <Box
                    rounded="lg"
                    borderWidth={1}
                    borderColor={"cyan.400"}
                    color="white"
                    bg="blue.600"
                    role="group"
                  >
                    <Text color={"white"} padding={"5px"} textAlign={"center"}>
                      Number of points you earn through completing task
                    </Text>
                  </Box>
                </PopoverContent>
              </Popover>
            </HStack>
            <Text fontSize="4xl" my={4}>
              0,0
            </Text>
          </Flex>
        </Box>
        <Box
          rounded="lg"
          borderWidth={2}
          borderColor={"cyan.400"}
          color="white"
          bg="blue.900"
          role="group"
          justifyContent={"center"}
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            h="100%"
          >
            <HStack>
              <Text fontSize="3xl">Referral Token</Text>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <InfoOutlineIcon color={"#00F0FF"} />
                </PopoverTrigger>
                <PopoverContent width={"194px"} height={"60px"} border="none">
                  <Box
                    rounded="lg"
                    borderWidth={1}
                    borderColor={"cyan.400"}
                    color="white"
                    bg="blue.600"
                    role="group"
                  >
                    <Text color={"white"} padding={"5px"} textAlign={"center"}>
                      Number of points you earn inviting friends
                    </Text>
                  </Box>
                </PopoverContent>
              </Popover>
            </HStack>
            <Text fontSize="4xl" my={4}>
              0,0
            </Text>
          </Flex>
        </Box>
        <Box
          rounded="lg"
          borderWidth={2}
          borderColor={"cyan.400"}
          color="white"
          bg="blue.900"
          role="group"
        >
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            h="100%"
          >
            <HStack>
              <Text fontSize="3xl">BOOST</Text>
              <Popover trigger="hover">
                <PopoverTrigger>
                  <InfoOutlineIcon color={"#00F0FF"} />
                </PopoverTrigger>
                <PopoverContent width={"200px"} height={"54px"} border="none">
                  <Box
                    rounded="lg"
                    borderWidth={1}
                    borderColor={"cyan.400"}
                    color="white"
                    bg="blue.600"
                    role="group"
                  >
                    <Text color={"white"} padding={"5px"} textAlign={"center"}>
                      Inviting 2 people will boost you 1.5x, inviting 5 people
                      will boost you 2x
                    </Text>
                  </Box>
                </PopoverContent>
              </Popover>
            </HStack>
            <Text fontSize="4xl" my={4}>
              1,5x
            </Text>
          </Flex>
        </Box>
      </SimpleGrid>

      <VStack spacing="24px" mt={14}>
        <Flex justify="center">
          <Text
            rounded="lg"
            borderWidth={2}
            borderColor="cyan.400"
            fontSize="2xl"
            px={24}
            bg="white"
          >
            Pira Season 1 detail
          </Text>
        </Flex>

        <Text fontSize="2xl" width="full" textAlign="start" color="white">
          Referal link:{" "}
          <Link isExternal>https://pira.finance/Signup?ref=12345-1234567</Link>
          <CopyIcon mx="2px" />
        </Text>

        <Flex width="full">
          <Text
            fontSize="3xl"
            borderBottomWidth={2}
            borderColor={"cyan.400"}
            color="white"
          >
            How to get FIRA?
          </Text>
        </Flex>
        <TaskTable />
        <LeaderBoard />
      </VStack>
    </Container>
  );
};

export default AirdropPage;
