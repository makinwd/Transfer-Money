import {
	Button,
	FormControl,
	FormErrorMessage,
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
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query'
import { FC, useState } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { formatCardNumber } from '../../../../function/format-card-number'
import { useProfile } from '../../../hooks/useProfile'
import { ITransferMoney, UserService } from '../../../../services/user.service'
import { SuccessAlert } from './SuccessAlert'
import { ITransferData } from './transfer.interface' 

interface ITransferModal {
	isOpen: boolean
	onClose: () => void
}

const TransferModal: FC<ITransferModal> = ({ isOpen, onClose }) => {
	const { user } = useProfile()
	const [isSuccess, setIsSuccess] = useState(false)

	const {
		handleSubmit,
		register,
		control,
		reset,
		formState: { errors }
	} = useForm<ITransferData>({ mode: 'onChange', defaultValues: { amount: 0 } })

	const queryClient = useQueryClient()

	const { mutate, isLoading,  } = useMutation(
		['transfer money'],
		(data: ITransferMoney) => UserService.transferMoney(data),
		{
			async onSuccess() {
				setIsSuccess(false);
				reset()
				await queryClient.invalidateQueries(['profile'])

				setTimeout(() => {setIsSuccess(false);},3000)
			}
		}
	)

	const onSubmit: SubmitHandler<ITransferData> = data => {
		if (user === undefined)
		return
		if (!user.card) return
		mutate({
			card: data.card,
			amount: Number(data.amount),
			fromCard: user.card
		})
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='full'
			motionPreset='slideInRight'
			>
			<ModalOverlay />
			<ModalContent bg='#171717'>
				<ModalHeader>Отправка ваших денег</ModalHeader>
			{/* {<SuccessAlert isSuccess={isSuccess}/>} */}
				<ModalCloseButton />
				<ModalBody>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack spacing={3}>
							<Input
								placeholder='From card'
								size='md'
								defaultValue={formatCardNumber(user?.card || 0)}
								disabled
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
											onChange={e => onChange(Number(e.target.value.replaceAll(' ', '') || 0))}										
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
										message: 'Введите корректный номер карты'
									}
								}}
								/>
							<InputGroup>
								<>
									<InputLeftElement
										pointerEvents='none'
										color='gray.300'
										fontSize='1.2em'
										
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
							<Button
								variant='outline'
								colorScheme='green'
								mr={6}
								isLoading={isLoading}
								loadingText='Отправка денег...'
								type='submit'
								>
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
