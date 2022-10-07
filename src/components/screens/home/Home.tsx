import { ArrowRightIcon } from '@chakra-ui/icons'
import {
	Box,
	Heading,
	Text,
	IconButton,
	useBoolean,
	useDisclosure
} from '@chakra-ui/react'
import { FC } from 'react'
import Balance from './Balance'
import TransferModal from './transfer-money/TransferModal'

export const user = {
	name: 'John Smith',
	balance: '$6666',
	card: 1234567890123456
}

const Home: FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Box bg='black' p='6' h={'100vh'}>
			<Box>
				<Text fontSize='xl' color='whiteAlpha.500'>
					Good Morning!
				</Text>
				<Heading fontSize='2xl'>{user.name}</Heading>
			</Box>
			<Balance />
			<IconButton
				m='auto'
				display='block'
				top={-4}
				mt={8}
				variant='outline'
				colorScheme='white'
				aria-label='Transfer'
				fontSize='15px'
				icon={<ArrowRightIcon />}
				onClick={onOpen}
			/>

			<TransferModal isOpen={isOpen} onClose={onClose} />
		</Box>
	)
}

export default Home
