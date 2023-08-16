"use client";
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
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";

const data = [
  {
    position: "-",
    name: "-",
    boost: "-",
    referralToken: "-",
    earningToken: "-",
    totalPiraEarn: "-",
  },
  {
    position: "-",
    name: "-",
    boost: "-",
    referralToken: "-",
    earningToken: "-",
    totalPiraEarn: "-",
  },
  {
    position: "-",
    name: "-",
    boost: "-",
    referralToken: "-",
    earningToken: "-",
    totalPiraEarn: "-",
  },
  {
    position: "-",
    name: "-",
    boost: "-",
    referralToken: "-",
    earningToken: "-",
    totalPiraEarn: "-",
  },
  {
    position: "-",
    name: "-",
    boost: "-",
    referralToken: "-",
    earningToken: "-",
    totalPiraEarn: "-",
  },
  {
    position: "-",
    name: "-",
    boost: "-",
    referralToken: "-",
    earningToken: "-",
    totalPiraEarn: "-",
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
import { useSelector } from "react-redux";
import { shortenAddress } from "src/utils/stringUtil";

export default function LeaderBoard() {
  const { leaderBoard } = useSelector((state) => state.airdrop);

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
      <Text fontSize={{ base: "2xl", md: "5xl" }} color={"#5EEDFF"}>
        24H LEADERBOARD
      </Text>
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
                    fontSize={{ base: "xs", md: "xl" }}
                  >
                    {thead}
                  </Text>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {leaderBoard.map((row, index) => {
              return (
                <Tr key={index} borderBottomWidth={1}>
                  <Td
                    textAlign="center"
                    fontSize={{ base: "xs", md: "xl" }}
                    borderRightWidth={1}
                  >
                    {index + 1}
                  </Td>
                  <Tooltip label={row.address} fontSize="md" placement="top">
                    <Td
                      textAlign="center"
                      fontSize={{ base: "xs", md: "xl" }}
                      borderRightWidth={1}
                    >
                      {shortenAddress(row.address, 8)}
                    </Td>
                  </Tooltip>
                  <Td
                    borderRightWidth={1}
                    textAlign="center"
                    fontSize={{ base: "xs", md: "xl" }}
                    color={getColor(row.boost)}
                  >{`${row.boost}`}</Td>
                  <Td
                    textAlign="center"
                    fontSize={{ base: "xs", md: "xl" }}
                    borderRightWidth={1}
                  >
                    {row.referralTokens}
                  </Td>
                  <Td
                    textAlign="center"
                    fontSize={{ base: "xs", md: "xl" }}
                    borderRightWidth={1}
                  >
                    {row.earningTokens}
                  </Td>
                  <Td
                    textAlign="center"
                    fontSize={{ base: "xs", md: "xl" }}
                    borderRightWidth={1}
                  >
                    {row.totalTokens}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}
