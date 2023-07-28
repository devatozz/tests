import { Box, Center, Flex, Text, border } from "@chakra-ui/react";
import React from "react";

const Progress = (props) => {
  const { percent = 60 } = props;
  return (
    <Flex justify="center">
      <Center width={{ base: "full", md: "75%" }}>
        <Flex
          alignItems="center"
          position="relative"
          width="full"
          borderWidth={2}
          borderColor={"cyan.500"}
          bg={"white"}
          rounded="lg"
        >
          <Box
            style={{ width: `${percent}%` }}
            position="absolute"
            height="full"
            bg="cyan.400"
            zIndex={0}
          ></Box>

          <Flex height="full" width="full" zIndex={1}>
            <Text
              fontSize="3xl"
              width="20%"
              color="blue.700"
              textAlign={"center"}
            >
              {`${percent}%`}
            </Text>
            <Text
              fontSize="3xl"
              width="60%"
              textAlign="center"
              color="blue.700"
            >
              23,452/1,360,000,000 PIRA claimed
            </Text>
          </Flex>
        </Flex>
      </Center>
    </Flex>
  );
};

export default Progress;
