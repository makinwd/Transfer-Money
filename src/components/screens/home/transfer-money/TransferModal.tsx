import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack
} from '@chakra-ui/react'
import { FC } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { formatCardNumber } from '../../../../function/format-card-number'
import { user } from '../Home'

interface ITransferModal {
	isOpen: boolean
	onClose: () => void
}

const TransferModal: FC<ITransferModal> = ({ isOpen, onClose }) => {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isSubmitting }
	} = useForm<ITransferModal>({ mode: 'onChange', defaultValues: { amount: 0 } })

	const onSubmit: SubmitHandler<ITransferModal> = data => {}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='full'
			motionPreset='slideInRight'
		>
			<ModalOverlay />
			<ModalContent bg='#171717'>
				<ModalHeader>Transfer your money</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<Input
								placeholder='From card'
								size='md'
								defaultValue={formatCardNumber(user.cardNumber)}
							/>
							<Controller
								control={control}
								name='card'
								render={({ field: { onChange, name, value } }) => (
									<FormControl>
										<Input
											id={name}
											size='md'
											placeholder='To card'
											value={formatCardNumber(value)}
											onChange={e => onChange(e.target.value)}
										/>
										<FormErrorMessage>
											{errors.card && errors.card?.message}
										</FormErrorMessage>
									</FormControl>
								)}
								rules={{
									required: 'This is required',
									minLength: {
										value: 16,
										message: 'minimum length should be 16'
									}
								}}
							/>
							<InputGroup>
								<>
									<InputLeftElement
										pointerEvents='none'
										color='gray.300'
										fontSize='1.2em'
										children='$'
									/>
									<Input
										placeholder='Enter amount'
										size='md'
										{...register('amount', {
											required: 'This is required'
										})}
									/>
								</>
							</InputGroup>
							<Button colorScheme='green' mr={3}>
								Send Money
							</Button>
						</Stack>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button variant='outline' onClick={onClose}>
						Close
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default TransferModal
