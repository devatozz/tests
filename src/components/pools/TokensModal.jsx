import React, { useEffect, useCallback, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Button,
    Avatar,
    Text,
    FormControl,
    Input,
    InputGroup,
    InputLeftElement,
    FormErrorMessage
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { SearchIcon } from '@chakra-ui/icons'
import { getTokenData } from 'src/utils/helper'
import { emptyToken } from "src/utils/utils";
import { config } from 'src/state/chain/config'

export default function TokenModal({ handleChoseToken, isOpen, onClose, selectedAddr }) {
    const { list, loaded, obj } = useSelector(state => state.dex.tokens)
    const { selectedChain } = useSelector(state => state.chain)

    const [tokenList, setTokenList] = useState([])
    const [defaultTokenList, setDefaultTokenList] = useState([])

    const [tokenSearch, setTokenSearch] = useState("")
    const [tokenInfo, setTokenInfo] = useState(emptyToken)
    const [tokenMsg, setTokenMsg] = useState("")
    const handleSearchToken = useCallback((e) => {
        setTokenSearch(e.target.value)
    }, [])

    const handleGetTokenInfo = useCallback(async (value) => {
        try {
            const tokenFetch = await getTokenData(value)
            setTokenInfo({ ...tokenFetch, disable: false, icon: "" })
            setTokenMsg("")
        } catch (e) {
            setTokenInfo(emptyToken)
            setTokenMsg("Not found token")
        }
    }, [])

    useEffect(() => {
        if (loaded) {
            setDefaultTokenList(list
                .filter((fItem) => fItem.address.toLowerCase() !== selectedAddr.toLowerCase() &&
                    fItem.address.toLowerCase() !== config[selectedChain].wrapAddress.toLowerCase()
                )
            )
        }
    }, [loaded, selectedAddr])

    useEffect(() => {
        if (defaultTokenList.length && tokenSearch != "") {            
            let searchValue = tokenSearch.replace(/\s+/g, '')
            let searchLower = searchValue.toLowerCase()
            let searchTokens = defaultTokenList.filter(item => 
                item.address.toLowerCase().includes(searchLower) ||
                item.name.toLowerCase().includes(searchLower) ||
                item.symbol.toLowerCase().includes(searchLower)
            )
            if (searchTokens.length == 0 && searchValue.length == 42 && searchValue.substring(0, 2) == "0x") {
                handleGetTokenInfo(searchValue)
            } else {
                setTokenInfo(emptyToken)
                setTokenMsg("")
            }
            setTokenList(searchTokens)
        } else {
            setTokenList(defaultTokenList)
        }
    }, [defaultTokenList, tokenSearch])
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent h={'600px'}>
                <ModalHeader>Select token</ModalHeader>
                <ModalCloseButton />
                <ModalBody h='300px'>

                    <VStack w="full">
                        <FormControl isInvalid={tokenMsg != ""}>
                            <InputGroup>
                                <InputLeftElement><SearchIcon/></InputLeftElement>
                                <Input onChange={handleSearchToken} value={tokenSearch} />
                            </InputGroup>
                            <FormErrorMessage>{tokenMsg}</FormErrorMessage>
                        </FormControl>
                        {tokenInfo.address !== "" && 
                            <Button
                                w="full"
                                justifyContent="left"
                                size='lg'
                                key={`token-option-${tokenInfo.address}`}
                                py={2}
                                leftIcon={
                                    <Avatar
                                        size="xs"
                                        name={tokenInfo.symbol}
                                    />
                                }
                                h='max'
                                onClick={() => {
                                    handleChoseToken(tokenInfo);
                                    onClose();
                                }}
                            >
                                <VStack align='start' >
                                    <Text>{tokenInfo.symbol}</Text>
                                    <Text fontSize='sm' fontWeight={400}>{tokenInfo.name}</Text>
                                </VStack>
                            </Button>
                        }
                        <Text>Common tokens</Text>
                        {tokenList
                            .map((item, index) => (
                                <Button
                                    w="full"
                                    justifyContent="left"
                                    isDisabled={item?.disable}
                                    size='lg'
                                    key={`token-option-${index}`}
                                    py={2}
                                    leftIcon={
                                        <Avatar
                                            size="xs"
                                            name={item.symbol}
                                            src={obj[item.address]?.icon}
                                        />
                                    }
                                    h='max'
                                    colorScheme={index %2 ? 'facebook': 'telegram'}
                                    onClick={() => {
                                        handleChoseToken(item);
                                        onClose();
                                    }}
                                >
                                    <VStack align='start' >
                                        <Text>{obj[item.address]?.symbol}</Text>
                                        <Text fontSize='sm' fontWeight={400}>{obj[item.address]?.name}</Text>
                                    </VStack>
                                </Button>
                            ))}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}