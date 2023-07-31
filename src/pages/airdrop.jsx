import AirdropPage from "src/components/airdrop";

import React from "react";
import { Center, Text } from "@chakra-ui/react";

const airdrop = () => {
  return <AirdropPage />;
};

const AirdropCommingSoon = () => {

  return <Center w='full' h={{base: 'auto', md: 'calc(100vh - 180px)' }}>
    <Text>Comming Soon !</Text>
  </Center>
}

export default AirdropCommingSoon;
