import React, { useCallback, useContext, useEffect } from 'react';
import {
    Box,
    Flex,

    Stack,
    Link,
    useColorModeValue,
    Image,
    Button,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    Input,
    DrawerFooter,
    useMediaQuery,
    VStack,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import Network from './Network';
import { HamburgerIcon } from '@chakra-ui/icons';
const NAV_ITEMS = [
    {
        label: 'Swap',
        href: '/swap',

    },
    {
        label: 'Liquidity',
        href: '/liquidity',
    },
    {
        label: 'Airdrop',
        href: '/airdrop',

    },
    {
        label: 'Bridge',
        href: 'https://docs.base.org/tools/bridges/',

    },
];

export default function AppBar() {
    const [isDesktop] = useMediaQuery('(min-width: 680px)')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 2 }}
                px={{ base: 4, md: 20 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                justifyContent={'space-between'}
                w='full'
                align={'center'}
                bgColor={"#3045C3"}
            >
                {!isDesktop && 
                    <Button  ref={btnRef} bg='#18215d'  color='white' onClick={onOpen}>
                        <HamburgerIcon />
                    </Button>
                }
         
                <NextLink href={"/"}><Image src={"/piralogo.svg"} alt='pira.finance' h={30} /></NextLink>
                    <Flex display={{ base: 'none', md: 'flex' }}>
                        <Stack direction={'row'} spacing={4}>
                            {NAV_ITEMS.map((navItem) => (
                                <Link
                                    pr={2}
                                    py={2}
                                    fontSize={'sm'}
                                    fontWeight={700}
                                    color='white'
                                    href={navItem.href}
                                    _hover={{
                                        textDecoration: 'none',
                                        color: 'gray',
                                    }}>
                                    {navItem.label}
                                </Link>
                            ))}
                        </Stack>
                </Flex>
                <Network />
            </Flex>
            {!isDesktop && 
            <Drawer
                isOpen={isOpen} 
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
             

                <DrawerBody bg="#3045c3" >
                    <Flex h='full' w='full' align={'center'}>
                        <VStack  w='full' direction={'row'} spacing={4} align='center'>
                        {NAV_ITEMS.map((navItem) => (
                            <Link
                                pr={2}
                                py={2}
                                fontSize={'sm'}
                                fontWeight={700}
                                color='white'
                                href={navItem.href}
                                _hover={{
                                    textDecoration: 'none',
                                    color: 'gray',
                                }}>
                                {navItem.label}
                            </Link>
                        ))}
                    </VStack>
                    </Flex>
                   
                </DrawerBody>


                </DrawerContent>
            </Drawer>

        }
        </Box>
    );
}



