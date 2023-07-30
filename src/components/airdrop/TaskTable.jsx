import {
  Button,
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

const TaskTable = () => {
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
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th borderRightWidth={1}>
              <Text
                width="fit-content"
                color="white"
                borderBottomWidth={1}
                borderColor="cyan.400"
              >
                Task
              </Text>
            </Th>
            <Th borderRightWidth={1}>
              <Text width="fit-content" color="white">
                Detail
              </Text>
            </Th>
            <Th borderRightWidth={1}>
              <Text width="fit-content" color="white">
                Token earn
              </Text>
            </Th>
            <Th borderRightWidth={1}> </Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {dataTaskTables.map((dataTaskTable, index) => (
            <TaskTab key={index} dataTask={dataTaskTable} />
          ))}
          {/* <TaskTab handleMintNft={handleMintNft} />
          <TaskTab />
          <TaskTab /> */}
          <Tr borderBottomWidth={1}>
            <Td borderRightWidth={1}>
              <Text width="fit-content" color="white" fontSize="xl">
                Invite your friend
              </Text>
            </Td>
            <Td pl={0} borderRightWidth={1}>
              <Text px={2} color="white" fontSize="lg">
                You will earn a number of tokens equal to 20% of F1 and 4% of F2
              </Text>
            </Td>

            <Td p={0} borderRightWidth={1}>
              <Text
                color="gray.500"
                fontSize="xl"
                py={2}
                textAlign="center"
                width="full"
              >
                {obj.data.inviteFriendTask.tokenEarn} PIRA
              </Text>
            </Td>

            <Td borderRightWidth={1}>
              <Center>
                <Button background="#00F0FF">
                  <Text fontSize="md">Invite</Text>
                </Button>
              </Center>
            </Td>

            <Td>
              <Text py={1} fontSize="xl" color={"gray.500"}>
                Claim
              </Text>
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
    <Tr borderBottomWidth={1}>
      <Td rowSpan={1} borderRightWidth={1}>
        <Text width="fit-content" color="white" fontSize="2xl">
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
        {dataTask.targets.map((item, i) => (
          <Text
            key={i}
            px={2}
            color={item.isDoing ? "blue.900" : "gray.500"}
            background={item.isDoing ? "#00F0FF" : "inherit"}
            fontSize="xl"
            py={2}
            width="full"
          >
            {dataTask.type === "MINT_NFT"
              ? `${
                  item.target === 1
                    ? "1 Day"
                    : item.target === 7
                    ? "7 Days (3/7)"
                    : item.target === 30
                    ? "30 Days (3/30)"
                    : item.target === 60
                    ? "60 Days (3/60)"
                    : ""
                }`
              : dataTask.type === "SWAP"
              ? `${
                  item.target === 1000
                    ? "SWAP TOTAL VOLUME $1,000"
                    : item.target === 10000
                    ? "SWAP TOTAL VOLUME $10,000"
                    : item.target === 50000
                    ? "SWAP TOTAL VOLUME $50,000"
                    : item.target === 200000
                    ? "SWAP TOTAL VOLUME $200,000"
                    : ""
                }`
              : dataTask.type === "ADD_LIQUIDITY"
              ? `${
                  item.target === 1000
                    ? "ADD LIQUIDITY $1,000"
                    : item.target === 5000
                    ? "ADD LIQUIDITY $5,000"
                    : item.target === 10000
                    ? "ADD LIQUIDITY $10,000"
                    : ""
                }`
              : ""}
          </Text>
        ))}
      </Td>

      <Td p={0} borderRightWidth={1}>
        {dataTask.targets.map((item, i) => (
          <Text
            key={i}
            color={item.isDoing ? "blue.900" : "gray.500"}
            background={item.isDoing ? "#00F0FF" : "inherit"}
            fontSize="xl"
            py={2}
            textAlign="center"
            width="full"
          >
            {item.reward} PIRA
          </Text>
        ))}
      </Td>

      <Td borderRightWidth={1}>
        <Center>
          {dataTask.type === "MINT_NFT" ? (
            <Button background="#00F0FF">
              <Text fontSize="md">Mint</Text>
            </Button>
          ) : dataTask.type === "SWAP" ? (
            <Button background="#00F0FF">
              <Text fontSize="md">Swap</Text>
            </Button>
          ) : dataTask.type === "ADD_LIQUIDITY" ? (
            <Button background="#00F0FF">
              <Text fontSize="md">Add Liquidity</Text>
            </Button>
          ) : (
            ""
          )}
        </Center>
      </Td>

      <Td>
        {dataTask.targets.map((item, i) => (
          <Text
            py={2}
            key={i}
            fontSize="xl"
            color={"gray.500"}
            textAlign="center"
          >
            {item.isClaimable ? "Claimed" : "Claim"}
          </Text>
        ))}
      </Td>
    </Tr>
  );
};
