import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Flex
} from '@chakra-ui/react'
import { FC } from 'react'

export const SuccessAlert: FC<{ isSuccess: boolean }> = ({ isSuccess }) => {
	return (
		<Alert
			status='success'
			variant='subtle'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			height='full'
			pos='absolute'
			left={0}
			top={0}
			zIndex={3}
			bg={'#303F35'}
		>
			<Flex className='alert-custom'>
				<AlertIcon boxSize='40px' mr={0} />
				<AlertTitle mt={4} mb={1} fontSize='3xl'>
					Деньги успешно отправлены!
				</AlertTitle>
				<AlertDescription maxWidth='sm'>
					Спасибо что воспользовались нашим приложением!
				</AlertDescription>
			</Flex>
		</Alert>
	)
}
