import { Box, Center, Flex, Text, border } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const totalToken = 1360000000;

const Progress = () => {
  const { totalTokenClaimed } = useSelector((state) => state.airdrop);

  const percent = Math.floor((totalTokenClaimed / totalToken) * 100);
  return (
    <Flex justify='center' width='full'>
      <Center width={{ base: 'full', md: '75%' }}>
        <Flex
          alignItems='center'
          position='relative'
          width='full'
          borderWidth={2}
          borderColor={'#00F0FF'}
          bg={'white'}
          rounded='lg'
        >
          <Box
            style={{ width: `${percent}%` }}
            position='absolute'
            height='full'
            bg='#5EEDFF'
            zIndex={0}
          ></Box>

          <Flex height='full' width='full' zIndex={1} alignItems='center'>
            <Text
              fontSize={{ base: '1xl', md: '3xl' }}
              width='20%'
              color='blue.700'
              textAlign={'center'}
            >
              {`${percent}%`}
            </Text>
            <Text
              fontSize={{ base: '1xl', md: '3xl' }}
              width={{ base: '70%', md: '60%' }}
              textAlign='center'
              color='blue.700'
            >
              {totalTokenClaimed.toLocaleString()}/{totalToken.toLocaleString()}{' '}
              PIRA earned
            </Text>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Progress;
