import {
  Box,
  Button,
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CooldownButton from './CooldownButton';
import { useEffect } from 'react';

const TaskTable = ({ copyRefLink, handleMintNFT, handleClaim }) => {
  const { taskList, inviteFriendTaskTokenEarn } = useSelector(
    (state) => state.airdrop
  );

  useEffect(() => {}, [taskList, inviteFriendTaskTokenEarn]);

  return (
    <TableContainer
      width='full'
      rounded='lg'
      borderWidth={2}
      borderColor='cyan.400'
      backgroundColor='blue.900'
    >
      <Table variant='unstyled' size={'xs'}>
        <Thead>
          <Tr borderBottomWidth={1}>
            <Th borderRightWidth={1}>
              <Text
                width='full'
                color='white'
                fontSize={'md'}
                py={2}
                textAlign='center'
              >
                Task
              </Text>
            </Th>
            <Th borderRightWidth={1}>
              <Text
                width='full'
                color='white'
                fontSize={'md'}
                py={2}
                textAlign='center'
              >
                Detail
              </Text>
            </Th>
            <Th borderRightWidth={1}>
              <Text
                width='full'
                color='white'
                fontSize={'md'}
                py={2}
                textAlign='center'
              >
                Token earn
              </Text>
            </Th>
            <Th borderRightWidth={1}> </Th>
            <Th></Th>
          </Tr>
        </Thead>

        <Tbody>
          {taskList.map((dataTaskTable, index) => (
            <TaskTab
              key={index}
              dataTask={dataTaskTable}
              handleMintNFT={handleMintNFT}
              handleClaim={handleClaim}
            />
          ))}
          <Tr borderBottomWidth={1}>
            <Td borderRightWidth={1}>
              <Text
                width='full'
                color='white'
                py={2}
                textAlign='center'
                fontSize={{ base: 'md', md: 'xl' }}
              >
                Invite your friend
              </Text>
            </Td>
            <Td pl={0} borderRightWidth={1}>
              <Text
                textAlign='center'
                px={2}
                color='white'
                fontSize={{ base: 'xs', md: 'lg' }}
              >
                You will earn a number of tokens equal to 20% of F1 and 4% of F2
              </Text>
            </Td>

            <Td p={0} borderRightWidth={1}>
              <Text
                color='gray.500'
                fontSize={{ base: 'sm', md: 'xl' }}
                py={2}
                textAlign='center'
                width='full'
              >
                {inviteFriendTaskTokenEarn} PIRA
              </Text>
            </Td>

            <Td borderRightWidth={1}>
              <Center>
                <Button
                  my={{ base: 1, md: 0 }}
                  onClick={copyRefLink}
                  background='#00F0FF'
                >
                  <Text fontSize={{ base: 'xs', md: 'xl' }}>Invite</Text>
                </Button>
              </Center>
            </Td>

            <Td></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;

const TaskTab = ({ dataTask, handleMintNFT, handleClaim }) => {
  const address = useSelector((state) => state.chain.account);
  const cooldown = useSelector((state) => state.airdrop.countDownMintNFT);
  const router = useRouter();

  useEffect(() => {}, [cooldown, address]);

  return (
    <Tr borderBottomWidth={1}>
      <Td rowSpan={1} borderRightWidth={1}>
        <Text
          width='full'
          color='white'
          py={2}
          textAlign='center'
          fontSize={{ base: 'md', md: '2xl' }}
        >
          {dataTask.type === 'MINT_NFT'
            ? 'FREE MINT NFT'
            : dataTask.type === 'SWAP'
            ? 'SWAP'
            : dataTask.type === 'ADD_LIQUIDITY'
            ? 'ADD LIQUIDITY'
            : ''}
        </Text>
      </Td>
      <Td p={0} borderRightWidth={1}>
        {dataTask.targets.map((item, i) => {
          const isDoing =
            (i > 0 &&
              dataTask?.progress > dataTask?.targets[i - 1].target &&
              dataTask?.progress < item?.target) ||
            (i === 0 && dataTask?.progress < item?.target);

          return (
            <Text
              key={i}
              px={2}
              color={isDoing ? 'blue.900' : 'gray.500'}
              background={isDoing ? '#00F0FF' : 'inherit'}
              fontSize={{ base: 'xs', md: 'xl' }}
              py={2}
              width='full'
            >
              {dataTask.type === 'MINT_NFT'
                ? `${item.target} ${item.target === 1 ? 'Day' : 'Days'} ${
                    item.target > 1 && `(${dataTask.progress}/${item.target})`
                  }`
                : dataTask.type === 'SWAP'
                ? `SWAP TOTAL VOLUME $${item.target}`
                : dataTask.type === 'ADD_LIQUIDITY'
                ? `ADD LIQUIDITY $${item.target}`
                : ''}
            </Text>
          );
        })}
      </Td>

      <Td p={0} borderRightWidth={1}>
        {dataTask.targets.map((item, i) => {
          const isDoing =
            (i > 0 &&
              dataTask?.progress > dataTask?.targets[i - 1].target &&
              dataTask?.progress < item?.target) ||
            (i === 0 && dataTask?.progress < item?.target);
          return (
            <Text
              key={i}
              color={isDoing ? 'blue.900' : 'gray.500'}
              background={isDoing ? '#00F0FF' : 'inherit'}
              fontSize={{ base: 'xs', md: 'xl' }}
              py={2}
              textAlign='center'
              width='full'
            >
              {item.reward} PIRA
            </Text>
          );
        })}
      </Td>

      <Td borderRightWidth={1}>
        <Center>
          {dataTask.type === 'MINT_NFT' ? (
            <CooldownButton cooldownTime={cooldown} onClick={handleMintNFT}>
              <Text fontSize={{ base: 'xs', md: 'xl' }}>Mint</Text>
            </CooldownButton>
          ) : dataTask.type === 'SWAP' ? (
            <Button background='#00F0FF' onClick={() => router.push('/swap')}>
              <Text fontSize={{ base: 'xs', md: 'xl' }}>Swap</Text>
            </Button>
          ) : dataTask.type === 'ADD_LIQUIDITY' ? (
            <Button
              background='#00F0FF'
              onClick={() => router.push('/liquidity')}
            >
              <Text fontSize={{ base: 'xs', md: 'xl' }}>Add Liquidity</Text>
            </Button>
          ) : (
            ''
          )}
        </Center>
      </Td>

      <Td>
        <Box display='flex' flexDirection='column' gap={2}>
          {dataTask.targets.map((item, i) => {
            if (item.isClaimable && item.isClaimed) {
              return (
                <Text
                  key={i}
                  width={'full'}
                  fontSize={{ base: 'xs', md: 'xl' }}
                  color={'gray.500'}
                  textAlign='center'
                >
                  Claimed
                </Text>
              );
            } else if (item.isClaimable && !item.isClaimed) {
              return (
                <Button
                  key={i}
                  width={'full'}
                  fontSize={{ base: 'xs', md: 'xl' }}
                  color={'#18215D'}
                  textAlign='center'
                  cursor='pointer'
                  onClick={() => handleClaim({ address, taskId: item?.taskId })}
                  background='#00F0FF'
                >
                  Claim
                </Button>
              );
            } else {
              return (
                <Text
                  key={i}
                  width={'full'}
                  fontSize={{ base: 'xs', md: 'xl' }}
                  color={'gray.500'}
                  textAlign='center'
                >
                  Claim
                </Text>
              );
            }
          })}
        </Box>
      </Td>
    </Tr>
  );
};
