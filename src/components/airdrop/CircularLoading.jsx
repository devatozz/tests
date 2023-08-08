'use client';
import { Box, Spinner } from "@chakra-ui/react";

export const CicularLoading = () => {
  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      background={"gray.600"}
      opacity={0.4}
      h="100vh"
      w="100vw"
      zIndex={9999}
      display="flex"
      justifyContent="center"
    >
      <Spinner
        alignSelf="center"
        opacity={1}
        thickness="4px"
        speed="0.85s"
        emptyColor="white"
        color="blue.900"
        size="xl"
      />
    </Box>
  );
};
