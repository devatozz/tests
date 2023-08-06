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
} from '@chakra-ui/react';
import Progress from './Progress';
import TaskTable from './TaskTable';
import { CopyIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import { useEffect, useMemo } from 'react';
import LeaderBoard from './LeaderBoard';
import { useDispatch, useSelector } from 'react-redux';
import { CicularLoading } from './CircularLoading';
import loadTaskList from 'src/state/airdrop/thunks/getTaskList';

const AirdropPage = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.chain.account);
  const { overview, isLoading } = useSelector((state) => state.airdrop);
  const addressMemo = useMemo(() => address, [address]);
  console.log('🚀 ~ file: index.jsx:34 ~ AirdropPage ~ address:', address);

  //for copy
  const { onCopy, setValue: setCopyValue } = useClipboard('');
  const toast = useToast();

  const copyRefLink = () => {
    onCopy();
    toast({
      title: 'Link is Copied',
      status: 'success',
      duration: 1000,
    });
  };

  //end copy
  //TODO: MAP TASKLIST
  useEffect(() => {
    setCopyValue(`https://pira.finance/Signup?ref=${address}`);

    address !== '' && dispatch(loadTaskList(address));
  }, [addressMemo]);

  return (
    <Container
      bgGradient='linear(180deg, #3146C6 0%, #18215D 100%)'
      maxW={''}
      minHeight='100vh'
      paddingX={'90px'}
    >
      {address === '' ? (
        <Text textAlign='center' fontSize={'3xl'} color={'white'} pt={'10%'}>
          PLEASE CONNECT WALLET FIRST !
        </Text>
      ) : (
        <>
          {isLoading && <CicularLoading />}
          <Text fontSize='5xl' textAlign='center' color={'#5EEDFF'}>
            PIRA SEASON 1
          </Text>

          <Progress />

          <Text fontSize='3xl' textAlign='center' color='white' my={6}>
            All transaction fees will be used for buyback when the token is
            listed on CEX
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            width={{ base: 'full', lg: '95%' }}
            marginX='auto'
            spacing={10}
          >
            <Box
              rounded='lg'
              borderWidth={2}
              borderColor={'cyan.400'}
              color='white'
              bg='blue.900'
              role='group'
            >
              <Flex
                direction='column'
                justifyContent='center'
                alignItems='center'
                h='100%'
              >
                <HStack>
                  <Text fontSize='3xl'>Earning Token</Text>
                  <Popover trigger='hover'>
                    <PopoverTrigger>
                      <InfoOutlineIcon color={'#00F0FF'} />
                    </PopoverTrigger>
                    <PopoverContent
                      width={'194px'}
                      height={'60px'}
                      border='none'
                    >
                      <Box
                        rounded='lg'
                        borderWidth={1}
                        borderColor={'cyan.400'}
                        color='white'
                        bg='blue.600'
                        role='group'
                      >
                        <Text
                          color={'white'}
                          padding={'5px'}
                          textAlign={'center'}
                        >
                          Number of points you earn through completing task
                        </Text>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </HStack>
                <Text fontSize='4xl' my={4}>
                  {overview.earningTokens}
                </Text>
              </Flex>
            </Box>
            <Box
              rounded='lg'
              borderWidth={2}
              borderColor={'cyan.400'}
              color='white'
              bg='blue.900'
              role='group'
              justifyContent={'center'}
            >
              <Flex
                direction='column'
                justifyContent='center'
                alignItems='center'
                h='100%'
              >
                <HStack>
                  <Text fontSize='3xl'>Referral Token</Text>
                  <Popover trigger='hover'>
                    <PopoverTrigger>
                      <InfoOutlineIcon color={'#00F0FF'} />
                    </PopoverTrigger>
                    <PopoverContent
                      width={'194px'}
                      height={'60px'}
                      border='none'
                    >
                      <Box
                        rounded='lg'
                        borderWidth={1}
                        borderColor={'cyan.400'}
                        color='white'
                        bg='blue.600'
                        role='group'
                      >
                        <Text
                          color={'white'}
                          padding={'5px'}
                          textAlign={'center'}
                        >
                          Number of points you earn inviting friends
                        </Text>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </HStack>
                <Text fontSize='4xl' my={4}>
                  {overview.referralTokens}
                </Text>
              </Flex>
            </Box>
            <Box
              rounded='lg'
              borderWidth={2}
              borderColor={'cyan.400'}
              color='white'
              bg='blue.900'
              role='group'
            >
              <Flex
                direction='column'
                justifyContent='center'
                alignItems='center'
                h='100%'
              >
                <HStack>
                  <Text fontSize='3xl'>BOOST</Text>
                  <Popover trigger='hover'>
                    <PopoverTrigger>
                      <InfoOutlineIcon color={'#00F0FF'} />
                    </PopoverTrigger>
                    <PopoverContent
                      width={'200px'}
                      height={'54px'}
                      border='none'
                    >
                      <Box
                        rounded='lg'
                        borderWidth={1}
                        borderColor={'cyan.400'}
                        color='white'
                        bg='blue.600'
                        role='group'
                      >
                        <Text
                          color={'white'}
                          padding={'5px'}
                          textAlign={'center'}
                        >
                          Inviting 2 people will boost you 1.5x, inviting 5
                          people will boost you 2x
                        </Text>
                      </Box>
                    </PopoverContent>
                  </Popover>
                </HStack>
                <Text fontSize='4xl' my={4}>
                  {overview.boost}x
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>

          <VStack spacing='24px' mt={14}>
            <Flex justify='center'>
              <Text
                rounded='lg'
                borderWidth={2}
                borderColor='cyan.400'
                fontSize='2xl'
                px={24}
                bg='white'
              >
                Pira Season 1 detail
              </Text>
            </Flex>

            <Text fontSize='2xl' width='full' textAlign='start' color='white'>
              Referal link:{' '}
              <Link
                href={`https://pira.finance/Signup?ref=${address}`}
                isExternal
              >
                {`https://pira.finance/Signup?ref=${address}`}
              </Link>
              <CopyIcon mx='2px' onClick={copyRefLink} />
            </Text>

            <Flex width='full'>
              <Text
                fontSize='3xl'
                borderBottomWidth={2}
                borderColor={'cyan.400'}
                color='white'
              >
                How to get FIRA?
              </Text>
            </Flex>
            <TaskTable />
            <LeaderBoard />
          </VStack>
        </>
      )}
    </Container>
  );
};

export default AirdropPage;
