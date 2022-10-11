import { Box, Flex, Text, Heading,} from "@chakra-ui/react";
import { FC } from "react";
import { useProfile } from '../../hooks/useProfile';

const Balance: FC = () => {
    const { user } = useProfile()
    return ( <Box pos='relative' width={'50%'} m='auto' mt={4}>
<Flex
    justify='center'
    alignItems='center			'
    direction='column'
    z-index={2}
    pos='relative'
>
    <Heading fontSize='5xl'>₽ {user?.balance}</Heading>
    <Text fontSize='xl' color='whiteAlpha.400'>
        Balance
    </Text>
</Flex>
<Flex
    alignItems='center'
    justifyContent='center'
    direction='column'
    pos='absolute'
    zIndex={1}
    top={-6}
    left={0}
    w='full'
    h='full'
>
    <Box
        h={180}
        w={180}
        pos='absolute'
        top={0}
    >
        <Box
            boxShadow='200px 0px 150px rgba(130 255 113 / 43%)'
            h={200}
            w={100}
            pos='absolute'
            left={-160}
            top={4}
        />
    </Box>
</Flex>
</Box>
)}

export default Balance