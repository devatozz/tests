import React from "react";
import { Container, Icon, createIcon } from "@chakra-ui/react";
import {
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  VStack,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const data = [
  {
    position: "UNRANKED",
    name: "You",
    boost: 0,
    referralToken: 0,
    earningToken: 0,
    totalPiraEarn: 0,
  },
  {
    position: "1",
    name: "0x0000",
    boost: 2,
    referralToken: 99.09,
    earningToken: 99.09,
    totalPiraEarn: 99.09,
  },
  {
    position: "2",
    name: "0x1111",
    boost: 1.5,
    referralToken: 75.32,
    earningToken: 88.57,
    totalPiraEarn: 82.12,
  },
  {
    position: "3",
    name: "0x2222",
    boost: 1.2,
    referralToken: 66.5,
    earningToken: 78.35,
    totalPiraEarn: 73.15,
  },
  {
    position: "4",
    name: "0x3333",
    boost: "1",
    referralToken: 50.21,
    earningToken: 55.89,
    totalPiraEarn: 58.07,
  },
  {
    position: "5",
    name: "0x4444",
    boost: "0.8",
    referralToken: 38.91,
    earningToken: 42.54,
    totalPiraEarn: 43.56,
  },
];

const Theads = [
  "Position",
  "Name",
  "Boost",
  "Referral Token",
  "Earning Token",
  "Total PIRA Earn",
];

export default function LeaderBoard() {
  const getColor = (boost) => {
    if (boost >= 2) {
      return "#00E0EE";
    } else if (boost >= 1.5 && boost < 2) {
      return "#F90";
    } else {
      return "";
    }
  };

  return (
    <VStack spacing="30px" width="full">
      <Text fontSize="5xl">24H LEADERBOARD</Text>
      <TableContainer
        width="full"
        rounded="lg"
        borderWidth={2}
        borderColor="cyan.400"
        backgroundColor="blue.900"
      >
        <Table variant="unstyled" color="white">
          <Thead>
            <Tr borderBottomWidth={1}>
              {Theads.map((thead, index) => (
                <Th key={index} borderRightWidth={1}>
                  <Text
                    width="fit-content"
                    color="white"
                    borderColor="cyan.400"
                    textAlign="center"
                    fontSize={"24px"}
                  >
                    {thead}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr key={index} borderBottomWidth={1}>
                <Td textAlign="center" fontSize="24px" borderRightWidth={1}>
                  {row.position}
                </Td>
                <Td textAlign="center " fontSize="24px" borderRightWidth={1}>
                  {row.name}
                </Td>
                <Td
                  borderRightWidth={1}
                  textAlign="center"
                  fontSize="24px"
                  color={getColor(row.boost)}
                >{`${row.boost}x`}</Td>
                <Td textAlign="center" fontSize="24px" borderRightWidth={1}>
                  {row.referralToken}
                </Td>
                <Td textAlign="center" fontSize="24px" borderRightWidth={1}>
                  {row.earningToken}
                </Td>
                <Td textAlign="center" fontSize="24px" borderRightWidth={1}>
                  {row.totalPiraEarn}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
