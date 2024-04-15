import React from "react";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Container,
  SimpleGrid,
  Image,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { ScrollToTopButton } from "../home/Banner";
const index = () => {
  return (
    <Box m={0} w={"100%"} p={0} minHeight="calc(100vh - 72px)" bg={"#000"}>
      <ScrollToTopButton />
    </Box>
  );
};

export default index;
