import React from "react";
import { Flex, Box, Link, Image } from "@chakra-ui/react";

const Footer = () => {
  const socials = [
    { src: "/x_icon.png", link: "https://twitter.com/PiraFinance" },
    {
      src: "/discord_icon.png",
      link: "https://discord.com/invite/pirafinance",
    },
    {
      src: "/group_icon.png",
      link: "https://mirror.xyz/0x79E67825Bb42aEb5217005101487DCDFc1339090",
    },
    { src: "/z_icon.png", link: "https://zealy.io/c/pirafinance/questboard" },
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
            <Link
              href={social.link}
              target="_blank"
              display={"flex"}
              justifyContent={"center"}
            >
              <Image w={{ base: "50%", md: "100%" }} src={social.src} />
            </Link>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Footer;
