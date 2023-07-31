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
      // minHeight={{ base: "560px" }}
    >
      <Text>Comming Soon !</Text>
    </Center>
  );
};

export default AirdropCommingSoon;
