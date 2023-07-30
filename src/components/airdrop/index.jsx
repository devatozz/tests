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
  useToast,
} from "@chakra-ui/react";
import Progress from "./Progress";
import TaskTable from "./TaskTable";
import { CopyIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import LeaderBoard from "./LeaderBoard";
import { useSelector } from "react-redux";

const AirdropPage = () => {
  const { account}  = useSelector(state => state.chain);
  const {onCopy, setValue: setCopyValue } = useClipboard("");
  const toast = useToast()

  useEffect(()=>{
    setCopyValue(`https://pira.finance/Signup?ref=${account}`)
  },[])

  const copyRefLink = () => {
    onCopy()
    toast({
      title: 'Link is Copied',
      status: 'success',
      duration: 1000
    })
  } 


  return (
    <Container
      bgGradient="linear(180deg, #3146C6 0%, #18215D 100%)"
      maxW={1400}
      mx='auto'
      paddingX={{base: 2, md: 90}}
      pb={4}
    
    >
      <Text fontSize={{base: '2xl', md: '5xl'}} textAlign="center" color={"#5EEDFF"}>
        PIRA SEASON 1
      </Text>

      <Progress />

      <Text fontSize={{base: '1xl', md:'3xl'}} textAlign="center" color="white" my={6}>
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
        paddingX={{base: 6, md:0}}
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
              <Text fontSize={{base: '1xl', md:'3xl'}}>Earning Token</Text>
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
            <Text fontSize={{base: '2xl', md:'4xl'}} my={4}>
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
              <Text fontSize={{base: '1xl', md:'3xl'}}>Referral Token</Text>
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
            <Text fontSize={{base: '2xl', md:'4xl'}} my={4}>
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
              <Text fontSize={{base: '1xl', md:'3xl'}}>BOOST</Text>
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
            <Text fontSize={{base: '2xl', md:'4xl'}} my={4}>
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
            fontSize={{base: '1xl', md: '2xl'}}
            px={24}
            py={2}
            bg="white"
          >
            Pira Season 1 detail
          </Text>
        </Flex>

        <Flex width={'full'} flexWrap='nowrap'  >
        <Text  fontSize={{base: '1xl', md: '2xl'}} whiteSpace={'nowrap'} overflow={'hidden'}  textOverflow='ellipsis' maxWidth={600} textAlign="start" color="white">
          Referal link:{" "}
          {`https://pira.finance/Signup?ref=${account}`}
          
        </Text><CopyIcon onClick={copyRefLink} fontSize='2xl' color='white' cursor='pointer' mx="2px" />
        </Flex>
    

        <Flex width="full">
          <Text
             fontSize={{base: '1xl', md: '3xl'}}
            borderBottomWidth={2}
            borderColor={"cyan.400"}
            color="white"
          >
            How to get FIRA?
          </Text>
        </Flex>
        <TaskTable copyRefLink={copyRefLink} />
        <LeaderBoard />
      </VStack>
    </Container>
  );
};

export default AirdropPage;
