import React from "react";
import { Flex, Box, Link, Image } from "@chakra-ui/react";

const Footer = () => {
  const socials = [
    { src: "/x_icon.png" },
    { src: "/discord_icon.png" },
    { src: "/group_icon.png" },
    { src: "/z_icon.png" },
  ];

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      gap={{ base: 1, md: 5 }}
      pb={"35px"}
      pt={"55px"}
      backgroundColor={"#18215D"}
    >
      {socials.map((social, index) => {
        return (
          <Box key={index}>
            <Link display={"flex"} justifyContent={"center"}>
              <Image w={{ base: "50%", md: "100%" }} src={social.src} />
            </Link>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Footer;
