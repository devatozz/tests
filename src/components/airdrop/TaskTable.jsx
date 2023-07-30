import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Link,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useEffect } from "react";
import { mintNftContractWithSigner } from "src/state/util";
import { ethers } from "ethers";

const TaskTable = ({copyRefLink}) => {
  const obj = {
    data: {
      nftTask: {
        type: "MINT_NFT",
        progress: 4,
        targets: [
          {
            target: 1,
            reward: "50",
            isClaimable: true,
          },
          {
            target: 7,
            reward: "400",
            isClaimable: false,
          },
          {
            target: 30,
            reward: "2000",
            isClaimable: false,
          },
          {
            target: 60,
            reward: "5000",
            isClaimable: false,
          },
        ],
      },
      swapTask: {
        type: "SWAP",
        progress: 200,
        targets: [
          {
            target: 1000,
            reward: "50",
            isClaimable: false,
          },
          {
            target: 10000,
            reward: "900",
            isClaimable: false,
          },
          {
            target: 50000,
            reward: "5000",
            isClaimable: false,
          },
          {
            target: 200000,
            reward: "25000",
            isClaimable: false,
          },
        ],
      },
      addLiquidityTask: {
        type: "ADD_LIQUIDITY",
        progress: 5100,
        targets: [
          {
            target: 1000,
            reward: "200",
            isClaimable: false,
          },
          {
            target: 5000,
            reward: "1800",
            isClaimable: false,
          },
          {
            target: 10000,
            reward: "5000",
            isClaimable: false,
          },
        ],
      },
      inviteFriendTask: {
        tokenEarn: 1000,
      },
    },
  };

  const dataTaskTables = Object.values(obj.data).slice(0, -1);

  console.log("dataTaskTables", dataTaskTables);

  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  useEffect(() => {
    setValue("https://pira.finance/Signup?ref=12345-1234567");
  }, []);

  const contract = mintNftContractWithSigner(
    "0xe7f686be4f39c101d1e425fd416f40d1f9a8c026"
  );

  const handleMintNft = async () => {
    contract.mint({ value: ethers.utils.parseEther("0.001") }).then((tx) => {
      tx.wait().then(
        (txResult) => (
          console.log("txResult", txResult),
          console.log("transaction hash", txResult.transactionHash)
          // setTxHash(txResult.transactionHash),
          // setIsLoading(false),
          // setIsSuccess(true)
        )
      );
    });
  };

  return (
    <TableContainer
      width="full"
      rounded="lg"
      borderWidth={2}
      borderColor="cyan.400"
      backgroundColor="blue.900"
    >
      <Table variant="unstyled" size={'xs'}>
        <Thead>
          <Tr borderBottomWidth={1} >
            <Th borderRightWidth={1}>
              <Text
                width="full"
                color="white"

                fontSize={'md'}
                py={2}
                textAlign='center'
              >
                Task
              </Text>
            </Th>
            <Th borderRightWidth={1}>
              <Text  width="full"
                color="white"

                fontSize={'md'}
                py={2}
                textAlign='center'>
                Detail
              </Text>
            </Th>
            <Th borderRightWidth={1}>
              <Text width="full"
                color="white"

                fontSize={'md'}
                py={2}
                textAlign='center'>
                Token earn
              </Text>
            </Th>
            <Th borderRightWidth={1}> </Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody >
          {dataTaskTables.map((dataTaskTable, index) => (
            <TaskTab key={index} dataTask={dataTaskTable} />
          ))}
          {/* <TaskTab handleMintNft={handleMintNft} />
          <TaskTab />
          <TaskTab /> */}
          <Tr borderBottomWidth={1}>
            <Td borderRightWidth={1}>
              <Text  
                width="full"
                color="white"
                py={2}
                textAlign='center'
                fontSize={{base: 'md', md: 'xl'}}
                >
                Invite your friend
              </Text>
            </Td>
            <Td pl={0} borderRightWidth={1}>
              <Text textAlign='center' px={2} color="white"  fontSize={{base: 'xs', md: 'lg'}}>
                You will earn a number of tokens equal to 20% of F1 and 4% of F2
              </Text>
            </Td>

            <Td p={0} borderRightWidth={1}>
              <Text
                color="gray.500"
                fontSize={{base:'sm',md: 'xl'}}
                py={2}
                textAlign="center"
                width="full"
              >
                {obj.data.inviteFriendTask.tokenEarn} PIRA
              </Text>
            </Td>

            <Td borderRightWidth={1}>
              <Center>
                <Button my={{base: 1, md: 0}} onClick={copyRefLink} background="#00F0FF">
                  <Text fontSize={{base:'xs',md: 'md'}}>Invite</Text>
                </Button>
              </Center>
            </Td>

            <Td>
            <Button
            // py={2}
          
            width={'full'}
            fontSize={{base:'xs',md: 'xl'}}
            color={"gray.500"}
            textAlign="center"
            cursor='pointer'
            variant='ghost'
            
           
            onClick={ () => null}
          >
            Claim
          </Button>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;

const TaskTab = ({ dataTask }) => {
  console.log("dataTask", dataTask);

  return (
    <Tr borderBottomWidth={1}  >
      <Td rowSpan={1} borderRightWidth={1}>
        <Text                 
          width="full"
          color="white"
          py={2}
          textAlign='center'
          fontSize={{base: 'md', md: '2xl'}}
        >
          {dataTask.type === "MINT_NFT"
            ? "FREE MINT NFT"
            : dataTask.type === "SWAP"
            ? "SWAP"
            : dataTask.type === "ADD_LIQUIDITY"
            ? "ADD LIQUIDITY"
            : ""}
        </Text>
      </Td>
      <Td p={0} borderRightWidth={1}>
        {dataTask.targets.map((item, i) => {
         
          const isDoing = i > 0 && dataTask?.progress > dataTask?.targets[i-1].target && dataTask?.progress < item?.target || i === 0 && dataTask?.progress < item?.target


     
          return (
            (
              <Text
                key={i}
                px={2}
                color={isDoing ? "blue.900" : "gray.500"}
                background={isDoing ? "#00F0FF" : "inherit"}
                fontSize={{base:'xs',md: 'xl'}}
                py={2}
                width="full"
              >
                {dataTask.type === "MINT_NFT"
                  ? `${item.target} ${item.target === 1 ? 'Day': "Days"} ${item.target > 1 && `(${dataTask.progress}/${item.target})`}`
                  : dataTask.type === "SWAP"
                  ? `SWAP TOTAL VOLUME ${item.target}`
                  : dataTask.type === "ADD_LIQUIDITY"
                  ? `ADD LIQUIDITY ${item.target}`
                  : ""}
              </Text>
            )
          )
        } )}
      </Td>

      <Td p={0} borderRightWidth={1}>
        {dataTask.targets.map((item, i) =>
        {
          const isDoing = i > 0 && dataTask?.progress > dataTask?.targets[i-1].target && dataTask?.progress < item?.target || i === 0 && dataTask?.progress < item?.target
          return        (
            <Text
              key={i}
              color={isDoing ? "blue.900" : "gray.500"}
              background={isDoing ? "#00F0FF" : "inherit"}
              fontSize={{base:'xs',md: 'xl'}}
              py={2}
              textAlign="center"
              width="full"
            >
              {item.reward} PIRA
            </Text>
          )
        } 
)}
      </Td>

      <Td borderRightWidth={1}>
        <Center>
          {dataTask.type === "MINT_NFT" ? (
            <Button background="#00F0FF">
              <Text fontSize={{base:'xs',md: 'md'}}>Mint</Text>
            </Button>
          ) : dataTask.type === "SWAP" ? (
            <Button background="#00F0FF">
              <Text fontSize={{base:'xs',md: 'md'}}>Swap</Text>
            </Button>
          ) : dataTask.type === "ADD_LIQUIDITY" ? (
            <Button background="#00F0FF">
              <Text fontSize={{base:'xs',md: 'md'}}>Add Liquidity</Text>
            </Button>
          ) : (
            ""
          )}
        </Center>
      </Td>

      <Td>
         <Box display='flex' flexDirection='column' gap={2}>
            
        {dataTask.targets.map((item, i) => (
         
      
          <Button
            // py={2}
            key={i}
            width={'full'}
            fontSize={{base:'xs',md: 'xl'}}
            color={"gray.500"}
            textAlign="center"
            cursor='pointer'
            variant='ghost'
            
            isDisabled={!item?.isClaimable}
            onClick={item.isClaimable ? 'function handle claim' : () => null}
          >
            {item.isClaimable ? "Claimed" : "Claim"}
          </Button>
        ))}
            </Box>
      </Td>
    </Tr>
  );
};
