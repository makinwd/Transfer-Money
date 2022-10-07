import { ArrowRightIcon } from '@chakra-ui/icons'
import { Box, Heading, Text, IconButton, useBoolean } from '@chakra-ui/react'
import { FC } from 'react'
import Balance from './Balance'

export const user = {
	name: 'John Smith',
	balance: '$6666'
}

const Home: FC = () => {
	const [modal, setModal] = useBoolean(false)
	
	return (
		<Box bg='black'>
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
				top={-6}
				mt={8}
				variant='outline'
				colorScheme='white'
				aria-label='Transfer'
				fontSize='15px'
				icon={<ArrowRightIcon />}
				onClick={setModal.on}
			/>
		</Box>
	)
}

export default Home
