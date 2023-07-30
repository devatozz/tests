import { Box, Center, Flex, Text, border } from "@chakra-ui/react";
import React from "react";

const Progress = (props) => {
  const { percent = 60 } = props;
  return (
    <Flex justify="center" width='full'>
      <Center width={{ base: "full", md: "75%" }} >
        <Flex
          alignItems="center"
          position="relative"
          width="full"
          borderWidth={2}
          borderColor={"#00F0FF"}
          bg={"white"}
          rounded="lg"
        >
          <Box
            style={{ width: `${percent}%` }}
            position="absolute"
            height="full"
            bg="#5EEDFF"
            zIndex={0}
          ></Box>

          <Flex height="full" width="full" zIndex={1} alignItems='center'>
            <Text
              fontSize={{base: '1xl', md: '3xl'}}
              width="20%"
              color="blue.700"
              textAlign={"center"}
            >
              {`${percent}%`}
            </Text>
            <Text
             fontSize={{base: '1xl', md: '3xl'}}
              width={{base: '70%', md: '60%'}}
              textAlign="center"
              color="blue.700"
            >
             {(Math.floor(1360000000 / percent)).toString()}/1,360,000,000  PIRA earned
         
            </Text>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Progress;
