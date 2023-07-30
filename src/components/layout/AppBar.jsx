import React, { useCallback, useContext, useEffect } from 'react';
import {
    Box,
    Flex,

    Stack,
    Link,
    useColorModeValue,
    Image,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import Network from './Network';
const NAV_ITEMS = [
    {
        label: 'Swap',
        href: '/swap',

    },
    {
        label: 'Pools',
        href: '/pools',
    },
    {
        label: 'Launchpad',
        href: '#',

    },
    {
        label: 'Bridge',
        href: '#',

    },
];

export default function AppBar() {

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
        </Box>
    );
}