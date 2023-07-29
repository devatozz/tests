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
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  useEffect(() => {
    setValue("https://pira.finance/Signup?ref=12345-1234567");
  }, []);

  const contract = mintNftContractWithSigner(
    "0xe7f686be4f39c101d1e425fd416f40d1f9a8c026"
  );

  console.log(contract);

  const handleMintNft = async () => {
    console.log("Hehehe");
    contract.mint({ value: ethers.utils.parseEther("0.001") }).then((tx) => {
      tx.wait().then(
        (txResult) => (
          console.log("txResult", txResult),
          console.log("transaction hash", txResult.transactionHash),
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
          <TaskTab handleMintNft={handleMintNft} />
          <TaskTab />
          <TaskTab />
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
                000 PIRA
              </Text>
            </Td>

            <Td borderRightWidth={1}>
              <Center>
                <Button background="cyan.300">
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

const TaskTab = ({ title, list, handleMintNft }) => {
  return (
    <Tr borderBottomWidth={1}>
      <Td rowSpan={1} borderRightWidth={1}>
        <Text width="fit-content" color="white" fontSize="2xl">
          FREE MINT NFT
        </Text>
      </Td>
      <Td p={0} borderRightWidth={1}>
        {mintTask.map((item, i) => (
          <Text
            key={i}
            px={2}
            color={item.isDoing ? "blue.900" : "gray.500"}
            background={item.isDoing ? "cyan.300" : "inherit"}
            fontSize="xl"
            py={2}
            width="full"
          >
            {item.detail}
          </Text>
        ))}
      </Td>

      <Td p={0} borderRightWidth={1}>
        {mintTask.map((item, i) => (
          <Text
            key={i}
            color={item.isDoing ? "blue.900" : "gray.500"}
            background={item.isDoing ? "cyan.300" : "inherit"}
            fontSize="xl"
            py={2}
            textAlign="center"
            width="full"
          >
            {item.tokenEarn} PIRA
          </Text>
        ))}
      </Td>

      <Td borderRightWidth={1}>
        <Center>
          <Button background="cyan.300" onClick={handleMintNft}>
            <Text fontSize="md">Mint</Text>
          </Button>
        </Center>
      </Td>

      <Td>
        {mintTask.map((item, i) => (
          <Text py={1} key={i} fontSize="xl" color={"gray.500"}>
            {item.isClaimed ? "Claimed" : "Claim"}
          </Text>
        ))}
      </Td>
    </Tr>
  );
};

export const mintTask = [
  {
    detail: "1 Day",
    tokenEarn: 50,
    isClaimed: true,
    isDoing: false,
  },
  {
    detail: "7 Day",
    tokenEarn: 400,
    isClaimed: false,
    isDoing: true,
  },
  {
    detail: "30 Day",
    tokenEarn: 2000,
    isClaimed: false,
    isDoing: false,
  },
  {
    detail: "60 Day",
    tokenEarn: 5000,
    isClaimed: false,
    isDoing: false,
  },
];
