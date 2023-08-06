import { useRadio, Box, useRadioGroup, HStack, Center } from "@chakra-ui/react"
function RadioCard(props) {
    const { getInputProps, getRadioProps } = useRadio(props)
    const input = getInputProps()
    const checkbox = getRadioProps({ value: props.key})
    return (
        <Center as='label' w='full'>
            <input {...input} />
            <Center
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='full'
                w='full'
                boxShadow='md'
                color={checkbox.isChecked ? 'white' : 'blue.700'} 
                _checked={{ color: "white", bgColor: "blue.500" }}
                _focus={{
                    bgColor: "blue.500",
                    color: "white"
                }}
                px={5}
                py={1}
            >
                {props.children} %
            </Center>
        </Center>
    )
}

export default function SlippageOptions({slippage, setSlippage}) {
    const options = [0.5, 1, 2, 5]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'framework',
        defaultValue: 2,
        value: slippage,
        onChange: setSlippage,
    })

    const group = getRootProps()

    return (
        <HStack {...group} justifyContent={'space-between'} mt={2}>
            {options.map((value) => {
                const radio = getRadioProps({ value })
                return (
                    <RadioCard key={value} {...radio}>
                        {value}
                    </RadioCard>
                )
            })}
        </HStack>
    )
}