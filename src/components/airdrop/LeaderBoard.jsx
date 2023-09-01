'use client';
import React, { useEffect } from 'react';
import { Container, Icon, createIcon } from '@chakra-ui/react';
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
  Center
} from '@chakra-ui/react';

const data = [
  {
    address: '-',
    totalTokens: '-',
    earningTokens: '-',
    referralTokens: '-',
    boost: '-',
  },
];

const Theads = [
  'Position',
  'Name',
  'Boost',
  'Referral Token',
  'Earning Token',
  'Total PIRA Earn',
];
import { useSelector } from 'react-redux';
import { shortenAddress } from 'src/utils/stringUtil';

export default function LeaderBoard() {
  const { leaderBoard } = useSelector((state) => state.airdrop);
  const leaderBoardData = leaderBoard.length ? leaderBoard : data;

  const getColor = (boost) => {
    if (boost >= 2) {
      return '#00E0EE';
    } else if (boost >= 1.5 && boost < 2) {
      return '#F90';
    } else {
      return '';
    }
  };

  return (
    <VStack spacing='30px' width='full'>
      <Text fontSize={{ base: '2xl', md: '5xl' }} color={'#5EEDFF'}>
        24H LEADERBOARD
      </Text>

      <Center fontSize={{ base: 'md', md: '2xl'}} color={'white'}>
      We are upgrading our system for better performance and security on Sep 1st. Minimal disruption is expected during 24 hours. Thank you for your patience!
      </Center>

      {/* <TableContainer
        width='full'
        rounded='lg'
        borderWidth={2}
        borderColor='cyan.400'
        backgroundColor='blue.900'
        maxHeight={'630px'}
        overflowY={'auto'}
      >
        <Table variant='unstyled' color='white'>
          <Thead>
            <Tr borderBottomWidth={1}>
              {Theads.map((thead, index) => (
                <Th
                  fontFamily={'Pixellari'}
                  key={index}
                  borderRightWidth={1}
                  textAlign='center'
                  fontSize={{ base: 'xs', md: 'xl' }}
                >
                  {thead}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {leaderBoardData.map((row, index) => {
              return (
                <Tr key={index} borderBottomWidth={1}>
                  <Td
                    textAlign='center'
                    fontSize={{ base: 'xs', md: 'xl' }}
                    borderRightWidth={1}
                  >
                    {index === 0 && row.rank === -1 ? 'UNRANKED' : row.rank}
                  </Td>
                  <Tooltip label={row.address} fontSize='md' placement='top'>
                    <Td
                      textAlign='center'
                      fontSize={{ base: 'xs', md: 'xl' }}
                      borderRightWidth={1}
                    >
                      {index === 0 ? 'You' : shortenAddress(row.address, 8)}
                    </Td>
                  </Tooltip>
                  <Td
                    borderRightWidth={1}
                    textAlign='center'
                    fontSize={{ base: 'xs', md: 'xl' }}
                    color={getColor(row.boost)}
                  >{`${row.boost}`}</Td>
                  <Td
                    textAlign='center'
                    fontSize={{ base: 'xs', md: 'xl' }}
                    borderRightWidth={1}
                  >
                    {row.referralTokens}
                  </Td>
                  <Td
                    textAlign='center'
                    fontSize={{ base: 'xs', md: 'xl' }}
                    borderRightWidth={1}
                  >
                    {row.earningTokens}
                  </Td>
                  <Td
                    textAlign='center'
                    fontSize={{ base: 'xs', md: 'xl' }}
                    borderRightWidth={1}
                  >
                    {row.totalTokens === null ? 0 : row.totalTokens}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer> */}
    </VStack>
  );
}
