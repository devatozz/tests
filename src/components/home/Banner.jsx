import React from "react";
import {Box, Button, Container, Flex, Image, Link, Text} from '@chakra-ui/react';
import {EditIcon} from "@chakra-ui/icons";

export default function Banner() {
    const featureItems = [
        {src: '/trade_icon.png', title: 'Trade with trust', description: 'Providing users with a secure, efficient, and user-friendly platform to trade cryptocurrencies and tokens.'},
        {src: '/add_icon.png', title: 'Add liquidity, earn rewards', description: 'Participate in a fair and transparent financial system that rewards them for contributing to the overall trading experience and stability of the platform.'},
        {src: '/farm_icon.png', title: 'Yield Farming made easy', description: 'Yield Farming on Pira DEX is a powerful tool for growing your wealth and participating in the exciting world of decentralized finance.'},
        {src: '/defi_icon.png', title: 'Own the future of DeFi', description: 'Hold PIRA tokens and become a key player in the governance and development of Pira Finance.'},
        {src: '/earn_icon.png', title: 'Earning PIRA TOKENS', description: 'You get $PIRA when you join, when you use an invite, and when someone you invite uses an invite.'},
        {src: '/ausd_icon.png', title: 'aUSD', description: 'The αUSD mechanism in Pira Finance provides users with an innovative way to utilize their USDC or USDT holdings and earn additional rewards.'}
    ];

    const partnersSrc = [
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
    ];

    const mediaPartnersSrc = [
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
        {src: 'https://placehold.co/250x100'},
    ];

    const socials = [
        {src: '/x_icon.png'},
        {src: '/discord_icon.png'},
        {src: '/group_icon.png'},
        {src: '/z_icon.png'}
    ];
    return (
        <Box bgGradient="linear(180deg, #3146C6 0%, #18215D 100%)" m={0} w={"100%"} p={"0px"}>
            <Flex alignItems={"center"} position={"relative"}>
                <Flex flexDirection={"column"} w={{base: "100%", sm: "100%", md: "50%", lg: "50%"}} zIndex={5}>
                    <Container color={"#fff"}
                               fontWeight={500}
                               p={{base: "20px 20px", sm: "5px 10px", md: "10px 50px", lg: "10px 50px"}}
                               fontSize={{md: '24px', lg: '24px'}}>
                        Seamless and secure trading experience with &thinsp;
                        <span style={{color: "#5EEDFF"}}>Pira Finance</span>
                    </Container>
                    <Container color={"#fff"}
                               textAlign={"justify"}
                               p={{base: "10px 20px 20px 20px", sm: "5px 10px", md: "10px 50px", lg: "10px 50px"}}
                               fontSize={{md: '24px', lg: '24px'}}>
                        Welcome to Pira Finance, a community-owned multichain DEX that is revolutionizing decentralized
                        finance.
                        Built on BASE-Layer 2 Blockchains, Pira Finance offers a seamless and secure trading experience
                    </Container>
                </Flex>
                <Box position={{base: "absolute", md: "relative", lg: "relative"}}
                     opacity={{base: 0.5, md: 1}}
                     w={{base: "60%", md: "50%", lg: "50%"}}
                     left={0} right={0} ml={"auto"} mr={"auto"} zIndex={1}>
                    <Image src={"/triangle.png"}/>
                </Box>
            </Flex>

            <Flex bgImage={"url('/small_image.png')"}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  p={{base: "30px 20px", md: "50px 150px"}}
                  flexDirection={"column"}
                  gap={10}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minH={"411px"}>
                <Text color={"#00F0FF"}
                      fontSize={{base: "24px", md: "48px"}}
                      textAlign={"center"}>
                    Make the vision a reality
                </Text>
                <Text color={"#fff"} fontSize={{base: "18px", md: "24px"}} textAlign={"center"}>
                    Imagine a world where financial freedom is not a privilege but a fundamental right. Join the
                    financial revolution with Pira Finance - empowering individuals worldwide to take control of their
                    financial future!
                </Text>
                <Button display={"flex"}
                        gap={2}
                        minW={{base: "150px", md: "200px"}}
                        fontSize={{base: "18px", md: "24px"}} p={{base: "10px", md: "25px"}}>
                    Learn <EditIcon/>
                </Button>
            </Flex>

            <Flex flexDirection={"column"} mb={20}>
                <Text color={"#00F0FF"}
                      fontSize={{base: "24px", md: "48px"}}
                      textAlign={"center"} m={{base: "20px 0", md: "50px 0"}}>
                    FEATURES
                </Text>
                <Flex alignItems={"center"} justifyContent={"space-evenly"} color={"#fff"} flexWrap={"wrap"}
                      gap={{md: 20}}>
                    {featureItems.map(item => {
                        return (
                            <Flex alignItems={"center"} p={{base: "10px 20px", md: "15px 10px"}} maxW={{md: "40%"}}>
                                <Image src={item.src} maxW={{base: "25%", md: "100%"}}/>
                                <Flex flexDirection={"column"} justifyContent={"space-between"}>
                                    <Container color={"#5EEDFF"} fontSize={{base: "16px", md: "24px"}}>{item.title}</Container>
                                    <Container color={"#fff"}
                                               fontSize={{base: "12px", md: "18px"}}
                                               textAlign={{base: "justify", md: "left"}}>
                                        {item.description}
                                    </Container>
                                </Flex>
                            </Flex>
                        )
                    })}
                </Flex>
            </Flex>

            <Flex bgImage={"url('/earn_bg_image.png')"}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  flexDirection={"column"}
                  gap={10}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minH={"411px"}>
                <Text color={"#00F0FF"}
                      fontSize={{base: "24px", md: "48px"}}
                      textAlign={"center"}
                      mt={"50px"}>
                    EARN $PIRA TOKENS
                </Text>
                <Text color={"#fff"} fontSize={{base: "18px", md: "24px"}} textAlign={"center"}>
                    Be an early adopter. The more you earn, the sooner you'll get in
                </Text>

                <Flex gap={{base: 5, md: 10}} flexShrink={1} flexDirection={{base: "column", md: "row"}} mb={"50px"}>
                    <Flex flexDirection={"column"} gap={5} alignItems={"center"} justifyContent={"center"}>
                        <Flex w={{base: "15%", md: "100%"}} justifyContent={"center"}><Image src={"/head.png"}/></Flex>
                        <Box>
                            <Container color={"#B0F6FF"} fontSize={{base: "16px", md: "24px"}}>Your YTD
                                Volume</Container>
                        </Box>
                    </Flex>
                    <Flex fontSize={{base: "24px", md: "40px"}} color={"#fff"} alignItems={"center"}
                          justifyContent={"center"}>+</Flex>
                    <Flex flexDirection={"column"} gap={5} alignItems={"center"} justifyContent={"center"}>
                        <Flex gap={5} justifyContent={"center"}>
                            <Box w={{base: "30%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "30%", md: "100%"}}><Image src={"/head.png"}/></Box>
                        </Flex>
                        <Flex gap={5} justifyContent={"center"}>
                            <Box w={{base: "20%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "20%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "20%", md: "100%"}}><Image src={"/head.png"}/></Box>
                        </Flex>
                        <Box>
                            <Container color={"#B0F6FF"} fontSize={{base: "16px", md: "24px"}} textAlign={"center"}>Your
                                Invites</Container>
                            <Container color={"#B0F6FF"} fontSize={{base: "12px", md: "18px"}} textAlign={"center"}>No
                                limit to invitees</Container>
                        </Box>
                    </Flex>
                    <Flex fontSize={{base: "24px", md: "40px"}} color={"#fff"} alignItems={"center"}
                          justifyContent={"center"}>+</Flex>
                    <Flex flexDirection={"column"} gap={5} alignItems={"center"} justifyContent={"center"}>
                        <Flex gap={5} justifyContent={"center"}>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                        </Flex>
                        <Flex gap={5} justifyContent={"center"}>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                        </Flex>
                        <Flex gap={5} justifyContent={"center"}>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                            <Box w={{base: "15%", md: "100%"}}><Image src={"/head.png"}/></Box>
                        </Flex>
                        <Box>
                            <Container color={"#B0F6FF"} fontSize={{base: "16px", md: "24px"}} textAlign={"center"}>Your
                                Invite’s Invites</Container>
                            <Container color={"#B0F6FF"} fontSize={{base: "12px", md: "18px"}} textAlign={"center"}>No
                                limit to invitees</Container>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>

            <Flex flexDirection={"column"} mb={20}>
                <Box m={"20px"}>
                    <Text color={"#00F0FF"}
                          fontSize={{base: "24px", md: "48px"}}
                          textAlign={"center"} m={{base: "20px 0", md: "50px 0"}}>
                        BOOST YOUR PIRA COMMISSION
                    </Text>

                    <Text color={"#fff"} fontSize={{base: "18px", md: "24px"}} textAlign={"center"} p={{md: "0 150px"}}>
                        After two of your invites are redeemed, your tokens will be boosted by 50%. After all five
                        invites
                        are redeemed, your boost will increase to 100%.
                    </Text>
                </Box>
                <Flex justifyContent={"center"} mb={"50px"}>
                    <Image src={"/chart.png"}/>
                </Flex>
            </Flex>

            <Flex bgImage={"url('/community_bg.png')"}
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  bgSize="cover"
                  p={{base: "30px 20px", md: "50px 150px"}}
                  flexDirection={"column"}
                  gap={10}
                  alignItems={"center"}
                  justifyContent={"center"}
                  minH={"410px"}>
                <Text color={"#00F0FF"}
                      fontSize={{base: "24px", md: "48px"}}
                      textAlign={"center"}>
                    Community Ownership
                </Text>
                <Text color={"#fff"} fontSize={{base: "18px", md: "24px"}} textAlign={"center"}>
                    Pira Finance strongly believes in the power of community involvement and participation in shaping
                    the future of the platform. At Pira Finance, your voice truly matters!
                </Text>
                <Button display={"flex"}
                        gap={2}
                        minW={{base: "150px", md: "200px"}}
                        fontSize={{base: "18px", md: "24px"}} p={{base: "10px", md: "25px"}}>
                    Get Involved <EditIcon/>
                </Button>
            </Flex>

            <Flex flexDirection={"column"}>
                <Box m={"20px"}>
                    <Text color={"#00F0FF"}
                          fontSize={{base: "24px", md: "48px"}}
                          textAlign={"center"} m={{base: "20px 0", md: "50px 0"}}>
                        PARTNERS
                    </Text>
                </Box>
                <Flex justifyContent={"space-evenly"} flexWrap={"wrap"} alignItems={"center"} gap={"50px 180px"}>
                    {partnersSrc.map(partner => {
                        return <Flex alignItems={"center"}><Image src={partner.src}/></Flex>
                    })}
                </Flex>
            </Flex>

            <Flex flexDirection={"column"} mb={20}>
                <Box>
                    <Text color={"#00F0FF"}
                          fontSize={{base: "24px", md: "48px"}}
                          textAlign={"center"} m={{base: "20px 0", md: "50px 0"}}>
                        MEDIA PARTNERS
                    </Text>
                </Box>
                <Flex justifyContent={"space-evenly"} flexWrap={"wrap"} alignItems={"center"} gap={"50px 180px"}>
                    {mediaPartnersSrc.map(mediaPartner => {
                        return <Flex alignItems={"center"}><Image src={mediaPartner.src}/></Flex>
                    })}
                </Flex>
            </Flex>

            <Flex alignItems={"center"} justifyContent={"center"} flexDirection={"column"} gap={{base: 5, md: 10}} pt={"50px"}>
                <Flex alignItems={"center"}>
                    <Flex justifyContent={"center"}><Image w={{base: "75%", md: "100%"}} src={"/logo_pira.png"}/></Flex>
                    <Container color={"#fff"} fontSize={{md: "40px"}} fontWeight={700}>Pira Finance</Container>
                </Flex>
                <Box p={"0 20px"}>
                    <Text color={"#fff"} fontSize={{base: "14px", md: "28px"}} textAlign={"center"}>UNLOCK FINANCIAL
                        FREEDOM WITH PIRA FINANCE</Text>
                    <Text color={"#fff"} fontSize={{base: "12px", md: "22px"}} textAlign={"center"}>Empowering
                        individuals worldwide to take control of their financial future</Text>
                </Box>
                <Flex alignItems={"center"} justifyContent={"center"} gap={{base: 1, md: 5}} pb={"50px"}>
                    {socials.map(social => {
                        return (
                            <Box>
                                <Link display={"flex"} justifyContent={"center"}>
                                    <Image w={{base: "50%", md: "100%"}} src={social.src}/>
                                </Link>
                            </Box>)
                    })}
                </Flex>
            </Flex>
        </Box>
    );
}
