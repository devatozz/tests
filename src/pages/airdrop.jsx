import AirdropPage from "src/components/airdrop";

import React from "react";
import { Center, Text } from "@chakra-ui/react";

const airdrop = () => {
  return <AirdropPage />;
};

const AirdropCommingSoon = () => {
  return (
    <Center
      w="full"
      h={{ base: "calc(100vh - 170px)", md: "calc(100vh - 180px)" }}
      bg="linear-gradient(180deg, rgba(48,69,195,1) 0%, rgba(24,33,93,1) 90%)"
      // minHeight={{ base: "560px" }}
    >
      <Text color={"#5EEDFF"} fontSize={"4xl"}>
        Coming Soon !
      </Text>
    </Center>
  );
};

export default airdrop;
